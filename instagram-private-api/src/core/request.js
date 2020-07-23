"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var crypto_1 = require("crypto");
var rxjs_1 = require("rxjs");
var attempt_1 = require("@lifeomic/attempt");
var request = require("request-promise");
var errors_1 = require("../errors");
var JSONbigInt = require("json-bigint");
var JSONbigString = JSONbigInt({ storeAsString: true });
var debug_1 = require("debug");
var Request = /** @class */ (function () {
    function Request(client) {
        this.client = client;
        this.end$ = new rxjs_1.Subject();
        this.error$ = new rxjs_1.Subject();
        this.attemptOptions = {
            maxAttempts: 1
        };
        this.defaults = {};
    }
    Request.requestTransform = function (body, response, resolveWithFullResponse) {
        try {
            // Sometimes we have numbers greater than Number.MAX_SAFE_INTEGER in json response
            // To handle it we just wrap numbers with length > 15 it double quotes to get strings instead
            response.body = JSONbigString.parse(body);
        }
        catch (e) {
            if (lodash_1.inRange(response.statusCode, 200, 299)) {
                throw e;
            }
        }
        return resolveWithFullResponse ? response : response.body;
    };
    Request.prototype.send = function (userOptions, onlyCheckHttpStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, error;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = lodash_1.defaultsDeep(userOptions, {
                            baseUrl: 'https://i.instagram.com/',
                            resolveWithFullResponse: true,
                            proxy: this.client.state.proxyUrl,
                            simple: false,
                            transform: Request.requestTransform,
                            jar: this.client.state.cookieJar,
                            strictSSL: false,
                            gzip: true,
                            headers: this.getDefaultHeaders(),
                            method: 'GET'
                        }, this.defaults);
                        Request.requestDebug("Requesting " + options.method + " " + (options.url || options.uri || '[could not find url]'));
                        return [4 /*yield*/, this.faultTolerantRequest(options)];
                    case 1:
                        response = _a.sent();
                        this.updateState(response);
                        process.nextTick(function () { return _this.end$.next(); });
                        if (response.body.status === 'ok' || (onlyCheckHttpStatus && response.statusCode === 200)) {
                            return [2 /*return*/, response];
                        }
                        error = this.handleResponseError(response);
                        process.nextTick(function () { return _this.error$.next(error); });
                        throw error;
                }
            });
        });
    };
    Request.prototype.updateState = function (response) {
        var _a = response.headers, wwwClaim = _a["x-ig-set-www-claim"], auth = _a["ig-set-authorization"], pwKeyId = _a["ig-set-password-encryption-key-id"], pwPubKey = _a["ig-set-password-encryption-pub-key"];
        if (typeof wwwClaim === 'string') {
            this.client.state.igWWWClaim = wwwClaim;
        }
        if (typeof auth === 'string' && !auth.endsWith(':')) {
            this.client.state.authorization = auth;
        }
        if (typeof pwKeyId === 'string') {
            this.client.state.passwordEncryptionKeyId = pwKeyId;
        }
        if (typeof pwPubKey === 'string') {
            this.client.state.passwordEncryptionPubKey = pwPubKey;
        }
    };
    Request.prototype.signature = function (data) {
        return crypto_1.createHmac('sha256', this.client.state.signatureKey)
            .update(data)
            .digest('hex');
    };
    Request.prototype.sign = function (payload) {
        var json = typeof payload === 'object' ? JSON.stringify(payload) : payload;
        var signature = this.signature(json);
        return {
            ig_sig_key_version: this.client.state.signatureVersion,
            signed_body: signature + "." + json
        };
    };
    Request.prototype.userBreadcrumb = function (size) {
        var term = lodash_1.random(2, 3) * 1000 + size + lodash_1.random(15, 20) * 1000;
        var textChangeEventCount = Math.round(size / lodash_1.random(2, 3)) || 1;
        var data = size + " " + term + " " + textChangeEventCount + " " + Date.now();
        var signature = Buffer.from(crypto_1.createHmac('sha256', this.client.state.userBreadcrumbKey)
            .update(data)
            .digest('hex')).toString('base64');
        var body = Buffer.from(data).toString('base64');
        return signature + "\n" + body + "\n";
    };
    Request.prototype.handleResponseError = function (response) {
        Request.requestDebug("Request " + response.request.method + " " + response.request.uri.path + " failed: " + (typeof response.body === 'object' ? JSON.stringify(response.body) : response.body));
        var json = response.body;
        if (json.spam) {
            return new errors_1.IgActionSpamError(response);
        }
        if (response.statusCode === 404) {
            return new errors_1.IgNotFoundError(response);
        }
        if (typeof json.message === 'string') {
            if (json.message === 'challenge_required') {
                this.client.state.checkpoint = json;
                return new errors_1.IgCheckpointError(response);
            }
            if (json.message === 'user_has_logged_out') {
                return new errors_1.IgUserHasLoggedOutError(response);
            }
            if (json.message === 'login_required') {
                return new errors_1.IgLoginRequiredError(response);
            }
            if (json.message.toLowerCase() === 'not authorized to view user') {
                return new errors_1.IgPrivateUserError(response);
            }
        }
        if (json.error_type === 'sentry_block') {
            return new errors_1.IgSentryBlockError(response);
        }
        if (json.error_type === 'inactive user') {
            return new errors_1.IgInactiveUserError(response);
        }
        return new errors_1.IgResponseError(response);
    };
    Request.prototype.faultTolerantRequest = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, attempt_1.retry(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, request(options)];
                            }); }); }, this.attemptOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new errors_1.IgNetworkError(err_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Request.prototype.getDefaultHeaders = function () {
        var _a;
        return {
            'User-Agent': this.client.state.appUserAgent,
            'X-Ads-Opt-Out': this.client.state.adsOptOut ? '1' : '0',
            // needed? 'X-DEVICE-ID': this.client.state.uuid,
            'X-CM-Bandwidth-KBPS': '-1.000',
            'X-CM-Latency': '-1.000',
            'X-IG-App-Locale': this.client.state.language,
            'X-IG-Device-Locale': this.client.state.language,
            'X-Pigeon-Session-Id': this.client.state.pigeonSessionId,
            'X-Pigeon-Rawclienttime': (Date.now() / 1000).toFixed(3),
            'X-IG-Connection-Speed': lodash_1.random(1000, 3700) + "kbps",
            'X-IG-Bandwidth-Speed-KBPS': '-1.000',
            'X-IG-Bandwidth-TotalBytes-B': '0',
            'X-IG-Bandwidth-TotalTime-MS': '0',
            'X-IG-EU-DC-ENABLED': typeof this.client.state.euDCEnabled === 'undefined' ? void 0 : this.client.state.euDCEnabled.toString(),
            'X-IG-Extended-CDN-Thumbnail-Cache-Busting-Value': this.client.state.thumbnailCacheBustingValue.toString(),
            'X-Bloks-Version-Id': this.client.state.bloksVersionId,
            'X-MID': (_a = this.client.state.extractCookie('mid')) === null || _a === void 0 ? void 0 : _a.value,
            'X-IG-WWW-Claim': this.client.state.igWWWClaim || '0',
            'X-Bloks-Is-Layout-RTL': this.client.state.isLayoutRTL.toString(),
            'X-IG-Connection-Type': this.client.state.connectionTypeHeader,
            'X-IG-Capabilities': this.client.state.capabilitiesHeader,
            'X-IG-App-ID': this.client.state.fbAnalyticsApplicationId,
            'X-IG-Device-ID': this.client.state.uuid,
            'X-IG-Android-ID': this.client.state.deviceId,
            'Accept-Language': this.client.state.language.replace('_', '-'),
            'X-FB-HTTP-Engine': 'Liger',
            Authorization: this.client.state.authorization,
            Host: 'i.instagram.com',
            'Accept-Encoding': 'gzip',
            Connection: 'close'
        };
    };
    Request.requestDebug = debug_1["default"]('ig:request');
    return Request;
}());
exports.Request = Request;
