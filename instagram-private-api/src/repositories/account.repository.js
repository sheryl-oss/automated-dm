"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var repository_1 = require("../core/repository");
var errors_1 = require("../errors");
var lodash_1 = require("lodash");
var ig_signup_block_error_1 = require("../errors/ig-signup-block.error");
var Bluebird = require("bluebird");
var debug_1 = require("debug");
var crypto = require("crypto");
var AccountRepository = /** @class */ (function (_super) {
    __extends(AccountRepository, _super);
    function AccountRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountRepository.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, encrypted, time, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.client.state.passwordEncryptionPubKey) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.qe.syncLoginExperiments()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this.encryptPassword(password), encrypted = _a.encrypted, time = _a.time;
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.client.request.send({
                                    method: 'POST',
                                    url: '/api/v1/accounts/login/',
                                    form: _this.client.request.sign({
                                        username: username,
                                        password: password,
                                        enc_password: "#PWD_INSTAGRAM:4:" + time + ":" + encrypted,
                                        guid: _this.client.state.uuid,
                                        phone_id: _this.client.state.phoneId,
                                        _csrftoken: _this.client.state.cookieCsrfToken,
                                        device_id: _this.client.state.deviceId,
                                        adid: '' /*this.client.state.adid ? not set on pre-login*/,
                                        google_tokens: '[]',
                                        login_attempt_count: 0,
                                        country_codes: JSON.stringify([{ country_code: '1', source: 'default' }]),
                                        jazoest: AccountRepository.createJazoest(_this.client.state.phoneId)
                                    })
                                });
                            })["catch"](errors_1.IgResponseError, function (error) {
                                if (error.response.body.two_factor_required) {
                                    AccountRepository.accountDebug("Login failed, two factor auth required: " + JSON.stringify(error.response.body.two_factor_info));
                                    throw new errors_1.IgLoginTwoFactorRequiredError(error.response);
                                }
                                switch (error.response.body.error_type) {
                                    case 'bad_password': {
                                        throw new errors_1.IgLoginBadPasswordError(error.response);
                                    }
                                    case 'invalid_user': {
                                        throw new errors_1.IgLoginInvalidUserError(error.response);
                                    }
                                    default: {
                                        throw error;
                                    }
                                }
                            })];
                    case 3:
                        response = _b.sent();
                        return [2 /*return*/, response.body.logged_in_user];
                }
            });
        });
    };
    AccountRepository.createJazoest = function (input) {
        var buf = Buffer.from(input, 'ascii');
        var sum = 0;
        for (var i = 0; i < buf.byteLength; i++) {
            sum += buf.readUInt8(i);
        }
        return "2" + sum;
    };
    AccountRepository.prototype.encryptPassword = function (password) {
        var randKey = crypto.randomBytes(32);
        var iv = crypto.randomBytes(12);
        var rsaEncrypted = crypto.publicEncrypt({
            key: Buffer.from(this.client.state.passwordEncryptionPubKey, 'base64').toString(),
            // @ts-ignore
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, randKey);
        var cipher = crypto.createCipheriv('aes-256-gcm', randKey, iv);
        var time = Math.floor(Date.now() / 1000).toString();
        cipher.setAAD(Buffer.from(time));
        var aesEncrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
        var sizeBuffer = Buffer.alloc(2, 0);
        sizeBuffer.writeInt16LE(rsaEncrypted.byteLength, 0);
        var authTag = cipher.getAuthTag();
        return {
            time: time,
            encrypted: Buffer.concat([
                Buffer.from([1, this.client.state.passwordEncryptionKeyId]),
                iv,
                sizeBuffer,
                rsaEncrypted, authTag, aesEncrypted
            ])
                .toString('base64')
        };
    };
    AccountRepository.prototype.twoFactorLogin = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = lodash_1.defaultsDeep(options, {
                            trustThisDevice: '1',
                            verificationMethod: '1'
                        });
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/accounts/two_factor_login/',
                                method: 'POST',
                                form: this.client.request.sign({
                                    verification_code: options.verificationCode,
                                    _csrftoken: this.client.state.cookieCsrfToken,
                                    two_factor_identifier: options.twoFactorIdentifier,
                                    username: options.username,
                                    trust_this_device: options.trustThisDevice,
                                    guid: this.client.state.uuid,
                                    device_id: this.client.state.deviceId,
                                    verification_method: options.verificationMethod
                                })
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/logout/',
                            form: {
                                guid: this.client.state.uuid,
                                phone_id: this.client.state.phoneId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                device_id: this.client.state.deviceId,
                                _uuid: this.client.state.uuid
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.create = function (_a) {
        var username = _a.username, password = _a.password, email = _a.email, first_name = _a.first_name;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Bluebird["try"](function () {
                            return _this.client.request.send({
                                method: 'POST',
                                url: '/api/v1/accounts/create/',
                                form: _this.client.request.sign({
                                    username: username,
                                    password: password,
                                    email: email,
                                    first_name: first_name,
                                    guid: _this.client.state.uuid,
                                    device_id: _this.client.state.deviceId,
                                    _csrftoken: _this.client.state.cookieCsrfToken,
                                    force_sign_up_code: '',
                                    qs_stamp: '',
                                    waterfall_id: _this.client.state.uuid,
                                    sn_nonce: '',
                                    sn_result: ''
                                })
                            });
                        })["catch"](errors_1.IgResponseError, function (error) {
                            switch (error.response.body.error_type) {
                                case 'signup_block': {
                                    AccountRepository.accountDebug('Signup failed');
                                    throw new ig_signup_block_error_1.IgSignupBlockError(error.response);
                                }
                                default: {
                                    throw error;
                                }
                            }
                        })];
                    case 1:
                        body = (_b.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.currentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/accounts/current_user/',
                            qs: {
                                edit: true
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body.user];
                }
            });
        });
    };
    AccountRepository.prototype.setBiography = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/accounts/set_biography/',
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                device_id: this.client.state.deviceId,
                                _uuid: this.client.state.uuid,
                                raw_text: text
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body.user];
                }
            });
        });
    };
    AccountRepository.prototype.changeProfilePicture = function (picture) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = Date.now().toString();
                        return [4 /*yield*/, this.client.upload.photo({
                                file: picture,
                                uploadId: uploadId
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/accounts/change_profile_picture/',
                                method: 'POST',
                                form: {
                                    _csrftoken: this.client.state.cookieCsrfToken,
                                    _uuid: this.client.state.uuid,
                                    use_fbuploader: true,
                                    upload_id: uploadId
                                }
                            })];
                    case 2:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.editProfile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/accounts/edit_profile/',
                            method: 'POST',
                            form: this.client.request.sign(__assign(__assign({}, options), { _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid }))
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body.user];
                }
            });
        });
    };
    AccountRepository.prototype.changePassword = function (oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/accounts/change_password/',
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                old_password: oldPassword,
                                new_password1: newPassword,
                                new_password2: newPassword
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.removeProfilePicture = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.command('remove_profile_picture')];
            });
        });
    };
    AccountRepository.prototype.setPrivate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.command('set_private')];
            });
        });
    };
    AccountRepository.prototype.setPublic = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.command('set_public')];
            });
        });
    };
    AccountRepository.prototype.command = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/accounts/" + command + "/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.readMsisdnHeader = function (usage) {
        if (usage === void 0) { usage = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/read_msisdn_header/',
                            headers: {
                                'X-DEVICE-ID': this.client.state.uuid
                            },
                            form: this.client.request.sign({
                                mobile_subno_usage: usage,
                                device_id: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.msisdnHeaderBootstrap = function (usage) {
        if (usage === void 0) { usage = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/msisdn_header_bootstrap/',
                            form: this.client.request.sign({
                                mobile_subno_usage: usage,
                                device_id: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.contactPointPrefill = function (usage) {
        if (usage === void 0) { usage = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/contact_point_prefill/',
                            form: this.client.request.sign({
                                mobile_subno_usage: usage,
                                device_id: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.getPrefillCandidates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/get_prefill_candidates/',
                            form: this.client.request.sign({
                                android_device_id: this.client.state.deviceId,
                                usages: '["account_recovery_omnibox"]',
                                device_id: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.processContactPointSignals = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            method: 'POST',
                            url: '/api/v1/accounts/process_contact_point_signals/',
                            form: this.client.request.sign({
                                phone_id: this.client.state.phoneId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                device_id: this.client.state.uuid,
                                _uuid: this.client.state.uuid,
                                google_tokens: '[]'
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.prototype.sendRecoveryFlowEmail = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/accounts/send_recovery_flow_email/',
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                adid: '' /*this.client.state.adid ? not available on pre-login?*/,
                                guid: this.client.state.uuid,
                                device_id: this.client.state.deviceId,
                                query: query
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    AccountRepository.accountDebug = debug_1["default"]('ig:account');
    return AccountRepository;
}(repository_1.Repository));
exports.AccountRepository = AccountRepository;
