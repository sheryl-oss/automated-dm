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
var LiveRepository = /** @class */ (function (_super) {
    __extends(LiveRepository, _super);
    function LiveRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LiveRepository.prototype.muteComment = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/mute_comment/",
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
    LiveRepository.prototype.getComment = function (_a) {
        var broadcastId = _a.broadcastId, _b = _a.commentsRequested, commentsRequested = _b === void 0 ? 4 : _b, lastCommentTs = _a.lastCommentTs;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/get_comment/",
                            method: 'GET',
                            qs: {
                                num_comments_requested: commentsRequested,
                                last_comment_ts: lastCommentTs || 0
                            }
                        })];
                    case 1:
                        body = (_c.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.heartbeatAndGetViewerCount = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/heartbeat_and_get_viewer_count/",
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                offset_to_video_start: 0,
                                _uuid: this.client.state.uuid
                            },
                            method: 'POST'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.info = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/info/",
                            method: 'GET'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.getFinalViewerList = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "api/v1/live/" + broadcastId + "/get_final_viewer_list/",
                            method: 'GET'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.unmuteComment = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/unmute_comment/",
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
    LiveRepository.prototype.create = function (_a) {
        var _b = _a.previewHeight, previewHeight = _b === void 0 ? 1184 : _b, _c = _a.previewWidth, previewWidth = _c === void 0 ? 720 : _c, _d = _a.message, message = _d === void 0 ? '' : _d;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/live/create/',
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                preview_width: previewWidth,
                                preview_height: previewHeight,
                                broadcast_message: message,
                                // const?
                                broadcast_type: 'RTMP',
                                internal_only: 0
                            })
                        })];
                    case 1:
                        body = (_e.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.getViewerList = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/get_viewer_list/",
                            method: 'GET'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.createQuestion = function (broadcastId, question) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/questions/",
                            method: 'POST',
                            form: {
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                text: question
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.activateQuestion = function (broadcastId, questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/question/" + questionId + "/activate/",
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
    LiveRepository.prototype.deactivateQuestion = function (broadcastId, questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/question/" + questionId + "/deactivate/",
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
    LiveRepository.prototype.getQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/live/get_questions/',
                            method: 'GET'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.wave = function (broadcastId, viewerId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/wave/",
                            method: 'POST',
                            form: this.client.request.sign({
                                viewer_id: viewerId,
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
    LiveRepository.prototype.like = function (broadcastId, likeCount) {
        if (likeCount === void 0) { likeCount = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/like/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                user_like_count: likeCount
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.getLikeCount = function (broadcastId, likeTs) {
        if (likeTs === void 0) { likeTs = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/get_like_count/",
                            method: 'GET',
                            qs: {
                                like_ts: likeTs
                            }
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.resumeBroadcastAfterContentMatch = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/resume_broadcast_after_content_match/",
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
    LiveRepository.prototype.getJoinRequestCounts = function (_a) {
        var broadcastId = _a.broadcastId, _b = _a.lastTotalCount, lastTotalCount = _b === void 0 ? 0 : _b, _c = _a.lastSeenTs, lastSeenTs = _c === void 0 ? 0 : _c, _d = _a.lastFetchTs, lastFetchTs = _d === void 0 ? 0 : _d;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/get_join_request_counts/",
                            method: 'GET',
                            qs: {
                                last_total_count: lastTotalCount,
                                last_seen_ts: lastSeenTs,
                                last_fetch_ts: lastFetchTs
                            }
                        })];
                    case 1:
                        body = (_e.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.start = function (broadcastId, sendNotifications) {
        if (sendNotifications === void 0) { sendNotifications = true; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/start/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                should_send_notifications: sendNotifications
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.endBroadcast = function (broadcastId, endAfterCopyrightWarning) {
        if (endAfterCopyrightWarning === void 0) { endAfterCopyrightWarning = false; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/end_broadcast/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                end_after_copyright_warning: endAfterCopyrightWarning
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.comment = function (broadcastId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/comment/",
                            method: 'POST',
                            form: this.client.request.sign({
                                user_breadcrumb: this.client.request.userBreadcrumb(message.length),
                                idempotence_token: new Chance().guid(),
                                comment_text: message,
                                live_or_vod: '1',
                                offset_to_video_start: '0',
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
    LiveRepository.prototype.pinComment = function (broadcastId, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/pin_comment/",
                            method: 'POST',
                            form: this.client.request.sign({
                                offset_to_video_start: 0,
                                comment_id: commentId,
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
    LiveRepository.prototype.unpinComment = function (broadcastId, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/unpin_comment/",
                            method: 'POST',
                            form: this.client.request.sign({
                                offset_to_video_start: 0,
                                comment_id: commentId,
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
    LiveRepository.prototype.getLiveQuestions = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/questions/",
                            method: 'POST',
                            form: this.client.request.sign({
                                sources: 'story_and_live'
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    LiveRepository.prototype.addToPostLive = function (broadcastId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/live/" + broadcastId + "/add_to_post_live/",
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
    /**
     * Shows all online users, ready to watch your stream
     */
    LiveRepository.prototype.getLivePresence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/live/get_live_presence/',
                            method: 'GET'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return LiveRepository;
}(repository_1.Repository));
exports.LiveRepository = LiveRepository;
