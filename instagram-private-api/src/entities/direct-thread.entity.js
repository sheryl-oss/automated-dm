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
var urlRegex = require("url-regex");
var entity_1 = require("../core/entity");
var errors_1 = require("../errors");
var publish_service_1 = require("../services/publish.service");
var Bluebird = require("bluebird");
var DirectThreadEntity = /** @class */ (function (_super) {
    __extends(DirectThreadEntity, _super);
    function DirectThreadEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threadId = null;
        _this.userIds = null;
        return _this;
    }
    DirectThreadEntity.prototype.deleteItem = function (itemId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.threadId) {
                    throw new errors_1.IgClientError('threadId was null.');
                }
                return [2 /*return*/, this.client.directThread.deleteItem(this.threadId, itemId)];
            });
        });
    };
    DirectThreadEntity.prototype.broadcastText = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var urls;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = text.match(urlRegex({ strict: false }));
                        if (urls instanceof Array) {
                            return [2 /*return*/, this.broadcastLink(text, urls)];
                        }
                        return [4 /*yield*/, this.broadcast({
                                item: 'text',
                                form: {
                                    text: text
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This is used when replying to a story (swiping up) and it's creator
     * @param options
     */
    DirectThreadEntity.prototype.broadcastReel = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.broadcast({
                            item: 'reel_share',
                            form: {
                                media_id: options.mediaId,
                                reel_id: options.reelId || options.mediaId.split('_')[1],
                                text: options.text,
                                entry: 'reel'
                            },
                            qs: {
                                media_type: options.mediaType || 'photo'
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * This is used when sharing a story (app: plane/share button) to a thread
     * @param options
     */
    DirectThreadEntity.prototype.broadcastUserStory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.broadcast({
                            item: 'story_share',
                            form: {
                                story_media_id: options.mediaId,
                                reel_id: options.reelId || options.mediaId.split('_')[1],
                                text: options.text
                            },
                            qs: {
                                media_type: options.mediaType || 'photo'
                            },
                            signed: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastProfile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.broadcast({
                            item: 'profile',
                            form: {
                                profile_user_id: id
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastLink = function (link_text, link_urls) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.broadcast({
                            item: 'link',
                            form: {
                                link_text: link_text,
                                link_urls: JSON.stringify(link_urls)
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastPhoto = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var upload_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.upload.photo({
                            uploadId: options.uploadId,
                            file: options.file
                        })];
                    case 1:
                        upload_id = (_a.sent()).upload_id;
                        return [4 /*yield*/, this.broadcast({
                                item: 'configure_photo',
                                form: {
                                    allow_full_aspect_ratio: options.allowFullAspectRatio || true,
                                    upload_id: upload_id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, videoInfo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = options.uploadId || Date.now().toString();
                        videoInfo = publish_service_1.PublishService.getVideoInfo(options.video);
                        return [4 /*yield*/, this.client.upload.video(__assign({ video: options.video, uploadId: uploadId, isDirect: true }, videoInfo))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.client.media.uploadFinish({
                                    upload_id: uploadId,
                                    source_type: '2',
                                    video: { length: videoInfo.duration / 1000.0 }
                                });
                            })["catch"](errors_1.IgResponseError, publish_service_1.PublishService.catchTranscodeError(videoInfo, options.transcodeDelay || 4 * 1000))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.broadcast({
                                item: 'configure_video',
                                form: {
                                    video_result: '',
                                    upload_id: uploadId,
                                    sampled: typeof options.sampled !== 'undefined' ? options.sampled : true
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcastVoice = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var duration, uploadId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        duration = publish_service_1.PublishService.getMP4Duration(options.file);
                        uploadId = options.uploadId || Date.now().toString();
                        return [4 /*yield*/, this.client.upload.video({
                                duration: duration,
                                video: options.file,
                                uploadId: uploadId,
                                isDirectVoice: true,
                                mediaType: '11'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.client.media.uploadFinish({
                                    upload_id: uploadId,
                                    source_type: '4'
                                });
                            })["catch"](errors_1.IgResponseError, publish_service_1.PublishService.catchTranscodeError({ duration: duration }, options.transcodeDelay || 4 * 1000))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.broadcast({
                                item: 'share_voice',
                                form: {
                                    // create a nice sine wave if the waveform is not provided
                                    waveform: JSON.stringify(options.waveform || Array.from(Array(20), function (_, i) { return Math.sin(i * (Math.PI / 10)) * 0.5 + 0.5; })),
                                    waveform_sampling_frequency_hz: options.waveformSamplingFrequencyHz || '10',
                                    upload_id: uploadId
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Uploads a story to the thread
     * The story is either destroyable (view 'once') or 'replayable'
     * @param input
     */
    DirectThreadEntity.prototype.broadcastStory = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var options, baseOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = input instanceof Buffer ? { file: input } : input;
                        baseOptions = __assign(__assign({}, options), { viewMode: options.viewMode || 'replayable', replyType: options.replyType });
                        if (!(this.threadId !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.publish.story(__assign(__assign({}, baseOptions), { threadIds: [this.threadId] }))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(this.userIds !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.client.publish.story(__assign(__assign({}, baseOptions), { recipientUsers: this.userIds }))];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error('DirectThread: No recipients set');
                }
            });
        });
    };
    DirectThreadEntity.prototype.updateTitle = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.updateTitle(this.threadId, title)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.mute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.mute(this.threadId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.unmute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.unmute(this.threadId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.hide(this.threadId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.leave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.leave(this.threadId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.addUser = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.addUser(this.threadId, userIds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.markItemSeen = function (threadItemId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.directThread.markItemSeen(this.threadId, threadItemId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DirectThreadEntity.prototype.broadcast = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var baseParams, params, response, first;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.threadId === null && this.userIds === null) {
                            throw new Error('DirectThread: No recipients set');
                        }
                        baseParams = {
                            item: options.item,
                            form: options.form,
                            qs: options.qs,
                            signed: options.signed
                        };
                        if (this.threadId) {
                            params = Object.assign(baseParams, { threadIds: this.threadId });
                        }
                        else {
                            params = Object.assign(baseParams, { userIds: this.userIds });
                        }
                        return [4 /*yield*/, this.client.directThread.broadcast(params)];
                    case 1:
                        response = _a.sent();
                        if (response.payload) {
                            this.threadId = response.payload.thread_id;
                            this.userIds = null;
                            return [2 /*return*/, response.payload];
                        }
                        else if (response.message_metadata) {
                            first = response.message_metadata[0];
                            this.threadId = first.thread_id;
                            this.userIds = null;
                            return [2 /*return*/, response];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return DirectThreadEntity;
}(entity_1.Entity));
exports.DirectThreadEntity = DirectThreadEntity;
