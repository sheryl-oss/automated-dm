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
var Chance = require("chance");
var DirectThreadRepository = /** @class */ (function (_super) {
    __extends(DirectThreadRepository, _super);
    function DirectThreadRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectThreadRepository.prototype.approve = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/approve/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.approveMultiple = function (threadIds) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/direct_v2/threads/approve_multiple/',
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                thread_ids: JSON.stringify(threadIds)
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.decline = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/decline/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.declineMultiple = function (threadIds) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/direct_v2/threads/decline_multiple/',
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                thread_ids: JSON.stringify(threadIds)
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.declineAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/decline_all/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.approveParticipantRequests = function (threadId, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/approve_participant_requests/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                user_ids: JSON.stringify(userIds),
                                share_join_chat_story: true,
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
    // move to direct-repo?
    DirectThreadRepository.prototype.getByParticipants = function (recipientUsers) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/direct_v2/threads/get_by_participants/',
                            method: 'GET',
                            qs: {
                                recipient_users: JSON.stringify(recipientUsers)
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.updateTitle = function (threadId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/update_title/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                title: title
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.mute = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/mute/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.unmute = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/unmute/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.addUser = function (threadId, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/add_user/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                user_ids: JSON.stringify(userIds),
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
    DirectThreadRepository.prototype.leave = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/leave/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    DirectThreadRepository.prototype.hide = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/hide/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                use_unified_inbox: true
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.markItemSeen = function (threadId, threadItemId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/items/" + threadItemId + "/seen/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                use_unified_inbox: true,
                                action: 'mark_seen',
                                thread_id: threadId,
                                item_id: threadItemId
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.broadcast = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var mutationToken, recipients, recipientsType, recipientsIds, form, body;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mutationToken = new Chance().guid();
                        recipients = options.threadIds || options.userIds;
                        recipientsType = options.threadIds ? 'thread_ids' : 'recipient_users';
                        recipientsIds = recipients instanceof Array ? recipients : [recipients];
                        form = __assign((_a = { action: 'send_item' }, _a[recipientsType] = JSON.stringify(recipientsType === 'thread_ids' ? recipientsIds : [recipientsIds]), _a.client_context = mutationToken, _a._csrftoken = this.client.state.cookieCsrfToken, _a.device_id = this.client.state.deviceId, _a.mutation_token = mutationToken, _a._uuid = this.client.state.uuid, _a), options.form);
                        return [4 /*yield*/, this.client.request.send({
                                url: "/api/v1/direct_v2/threads/broadcast/" + options.item + "/",
                                method: 'POST',
                                form: options.signed ? this.client.request.sign(form) : form,
                                qs: options.qs
                            })];
                    case 1:
                        body = (_b.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DirectThreadRepository.prototype.deleteItem = function (threadId, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/direct_v2/threads/" + threadId + "/items/" + itemId + "/delete/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
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
    return DirectThreadRepository;
}(repository_1.Repository));
exports.DirectThreadRepository = DirectThreadRepository;
