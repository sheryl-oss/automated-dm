"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _ = require("lodash");
var Bluebird = require("bluebird");
var Chance = require("chance");
var request_1 = require("request");
var tough_cookie_1 = require("tough-cookie");
var devices = require("../samples/devices.json");
var builds = require("../samples/builds.json");
var supportedCapabilities = require("../samples/supported-capabilities.json");
var Constants = require("./constants");
var errors_1 = require("../errors");
var decorators_1 = require("../decorators");
var debug_1 = require("debug");
var State = /** @class */ (function () {
    function State() {
        this.constants = Constants;
        this.supportedCapabilities = supportedCapabilities;
        this.language = 'en_US';
        this.timezoneOffset = String(new Date().getTimezoneOffset() * -60);
        this.radioType = 'wifi-none';
        this.capabilitiesHeader = '3brTvwE=';
        this.connectionTypeHeader = 'WIFI';
        this.isLayoutRTL = false;
        this.euDCEnabled = undefined;
        this.adsOptOut = false;
        this.thumbnailCacheBustingValue = 1000;
        this.cookieStore = new tough_cookie_1.MemoryCookieStore();
        this.cookieJar = request_1.jar(this.cookieStore);
        this.checkpoint = null;
        this.challenge = null;
        this.clientSessionIdLifetime = 1200000;
        this.pigeonSessionIdLifetime = 1200000;
    }
    Object.defineProperty(State.prototype, "signatureKey", {
        get: function () {
            return this.constants.SIGNATURE_KEY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "signatureVersion", {
        get: function () {
            return this.constants.SIGNATURE_VERSION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "userBreadcrumbKey", {
        get: function () {
            return this.constants.BREADCRUMB_KEY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "appVersion", {
        get: function () {
            return this.constants.APP_VERSION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "appVersionCode", {
        get: function () {
            return this.constants.APP_VERSION_CODE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "fbAnalyticsApplicationId", {
        get: function () {
            return this.constants.FACEBOOK_ANALYTICS_APPLICATION_ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "fbOtaFields", {
        get: function () {
            return this.constants.FACEBOOK_OTA_FIELDS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "fbOrcaApplicationId", {
        get: function () {
            return this.constants.FACEBOOK_ORCA_APPLICATION_ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "loginExperiments", {
        get: function () {
            return this.constants.LOGIN_EXPERIMENTS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "experiments", {
        get: function () {
            return this.constants.EXPERIMENTS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "bloksVersionId", {
        get: function () {
            return this.constants.BLOKS_VERSION_ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "clientSessionId", {
        /**
         * The current application session ID.
         *
         * This is a temporary ID which changes in the official app every time the
         * user closes and re-opens the Instagram application or switches account.
         *
         * We will update it once an hour
         */
        get: function () {
            return this.generateTemporaryGuid('clientSessionId', this.clientSessionIdLifetime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "pigeonSessionId", {
        get: function () {
            return this.generateTemporaryGuid('pigeonSessionId', this.pigeonSessionIdLifetime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "appUserAgent", {
        get: function () {
            return "Instagram " + this.appVersion + " Android (" + this.deviceString + "; " + this.language + "; " + this.appVersionCode + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "webUserAgent", {
        get: function () {
            return "Mozilla/5.0 (Linux; Android " + this.devicePayload.android_release + "; " + this.devicePayload.model + " Build/" + this.build + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 " + this.appUserAgent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "devicePayload", {
        get: function () {
            var deviceParts = this.deviceString.split(';');
            var _a = deviceParts[0].split('/'), android_version = _a[0], android_release = _a[1];
            var manufacturer = deviceParts[3].split('/')[0];
            var model = deviceParts[4];
            return {
                android_version: android_version,
                android_release: android_release,
                manufacturer: manufacturer,
                model: model
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "batteryLevel", {
        get: function () {
            var chance = new Chance(this.deviceId);
            var percentTime = chance.integer({ min: 200, max: 600 });
            return 100 - (Math.round(Date.now() / 1000 / percentTime) % 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "isCharging", {
        get: function () {
            var chance = new Chance("" + this.deviceId + Math.round(Date.now() / 10800000));
            return chance.bool();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "challengeUrl", {
        get: function () {
            if (!this.checkpoint) {
                throw new errors_1.IgNoCheckpointError();
            }
            return "/api/v1" + this.checkpoint.challenge.api_path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieCsrfToken", {
        get: function () {
            try {
                return this.extractCookieValue('csrftoken');
            }
            catch (_a) {
                State.stateDebug('csrftoken lookup failed, returning "missing".');
                return 'missing';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieUserId", {
        get: function () {
            return this.extractCookieValue('ds_user_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "cookieUsername", {
        get: function () {
            return this.extractCookieValue('ds_user');
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.isExperimentEnabled = function (experiment) {
        return this.experiments.includes(experiment);
    };
    State.prototype.extractCookie = function (key) {
        var cookies = this.cookieJar.getCookies(this.constants.HOST);
        return _.find(cookies, { key: key }) || null;
    };
    State.prototype.extractCookieValue = function (key) {
        var cookie = this.extractCookie(key);
        if (cookie === null) {
            State.stateDebug("Could not find " + key);
            throw new errors_1.IgCookieNotFoundError(key);
        }
        return cookie.value;
    };
    State.prototype.extractUserId = function () {
        try {
            return this.cookieUserId;
        }
        catch (e) {
            if (this.challenge === null || !this.challenge.user_id) {
                throw new errors_1.IgUserIdNotFoundError();
            }
            return String(this.challenge.user_id);
        }
    };
    State.prototype.deserializeCookieJar = function (cookies) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.cookieJar;
                        _b = '_jar';
                        return [4 /*yield*/, Bluebird.fromCallback(function (cb) { return tough_cookie_1.CookieJar.deserialize(cookies, _this.cookieStore, cb); })];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.serializeCookieJar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Bluebird.fromCallback(function (cb) { return _this.cookieJar['_jar'].serialize(cb); })];
            });
        });
    };
    State.prototype.serialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obj, _a, _b, _c, _i, _d, _e, key, value;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = {
                            constants: this.constants
                        };
                        _c = (_b = JSON).stringify;
                        return [4 /*yield*/, this.serializeCookieJar()];
                    case 1:
                        obj = (_a.cookies = _c.apply(_b, [_f.sent()]),
                            _a);
                        for (_i = 0, _d = Object.entries(this); _i < _d.length; _i++) {
                            _e = _d[_i], key = _e[0], value = _e[1];
                            obj[key] = value;
                        }
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    State.prototype.deserialize = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, _i, _a, _b, key, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        State.stateDebug("Deserializing state of type " + typeof state);
                        obj = typeof state === 'string' ? JSON.parse(state) : state;
                        if (typeof obj !== 'object') {
                            State.stateDebug("State deserialization failed, obj is of type " + typeof obj + " (object expected)");
                            throw new TypeError('State isn\'t an object or serialized JSON');
                        }
                        State.stateDebug("Deserializing " + Object.keys(obj).join(', '));
                        if (obj.constants) {
                            this.constants = obj.constants;
                            delete obj.constants;
                        }
                        if (!obj.cookies) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deserializeCookieJar(obj.cookies)];
                    case 1:
                        _c.sent();
                        delete obj.cookies;
                        _c.label = 2;
                    case 2:
                        for (_i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            this[key] = value;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.generateDevice = function (seed) {
        var chance = new Chance(seed);
        this.deviceString = chance.pickone(devices);
        var id = chance.string({
            pool: 'abcdef0123456789',
            length: 16
        });
        this.deviceId = "android-" + id;
        this.uuid = chance.guid();
        this.phoneId = chance.guid();
        this.adid = chance.guid();
        this.build = chance.pickone(builds);
    };
    State.prototype.generateTemporaryGuid = function (seed, lifetime) {
        return new Chance("" + seed + this.deviceId + Math.round(Date.now() / lifetime)).guid();
    };
    State.stateDebug = debug_1["default"]('ig:state');
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "constants");
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "proxyUrl");
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "cookieStore");
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "cookieJar");
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "checkpoint");
    __decorate([
        decorators_1.Enumerable(false)
    ], State.prototype, "challenge");
    return State;
}());
exports.State = State;
