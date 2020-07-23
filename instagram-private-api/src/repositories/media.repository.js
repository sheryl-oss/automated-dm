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
var lodash_1 = require("lodash");
var luxon_1 = require("luxon");
var repository_1 = require("../core/repository");
var Chance = require("chance");
var MediaRepository = /** @class */ (function (_super) {
    __extends(MediaRepository, _super);
    function MediaRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaRepository.prototype.info = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/info/",
                            method: 'GET',
                            form: this.client.request.sign({
                                igtv_feed_preview: false,
                                media_id: mediaId,
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
    MediaRepository.prototype.editMedia = function (_a) {
        var mediaId = _a.mediaId, captionText = _a.captionText;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/edit_media/",
                            method: 'POST',
                            form: this.client.request.sign({
                                igtv_feed_preview: false,
                                media_id: mediaId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                caption_text: captionText
                            })
                        })];
                    case 1:
                        body = (_b.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype["delete"] = function (_a) {
        var mediaId = _a.mediaId, _b = _a.mediaType, mediaType = _b === void 0 ? 'PHOTO' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/delete/",
                            method: 'POST',
                            qs: {
                                media_type: mediaType
                            },
                            form: this.client.request.sign({
                                igtv_feed_preview: false,
                                media_id: mediaId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid
                            })
                        })];
                    case 1:
                        body = (_c.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.likeAction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var signedFormData, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signedFormData = this.client.request.sign(__assign(__assign({ module_name: options.moduleInfo.module_name, media_id: options.mediaId, _csrftoken: this.client.state.cookieCsrfToken }, lodash_1.omit(options.moduleInfo, 'module_name')), { radio_type: this.client.state.radioType, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid }));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/api/v1/media/" + options.mediaId + "/" + options.action + "/",
                                method: 'POST',
                                form: __assign(__assign({}, signedFormData), { d: options.d })
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.like = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.likeAction(__assign({ action: 'like' }, options))];
            });
        });
    };
    MediaRepository.prototype.unlike = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.likeAction(__assign({ action: 'unlike' }, options))];
            });
        });
    };
    /**
     * Normally, this is requested before each comment is sent to ensure it isn't spam or hateful
     * @param commentText
     * @param mediaId - The mediaId of the post
     */
    MediaRepository.prototype.checkOffensiveComment = function (commentText, mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: '/api/v1/media/comment/check_offensive_comment/',
                            method: 'POST',
                            form: this.client.request.sign({
                                media_id: mediaId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                comment_text: commentText
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.commentsBulkDelete = function (mediaId, commentIds) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/comment/bulk_delete/",
                            method: 'POST',
                            form: this.client.request.sign({
                                comment_ids_to_delete: commentIds.join(','),
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
    MediaRepository.prototype.comment = function (_a) {
        var mediaId = _a.mediaId, text = _a.text, replyToCommentId = _a.replyToCommentId, _b = _a.module, module = _b === void 0 ? 'self_comments_v2' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/comment/",
                            method: 'POST',
                            form: this.client.request.sign({
                                user_breadcrumb: this.client.request.userBreadcrumb(text.length),
                                idempotence_token: new Chance().guid(),
                                _csrftoken: this.client.state.cookieCsrfToken,
                                radio_type: this.client.state.radioType,
                                _uid: this.client.state.cookieUserId,
                                device_id: this.client.state.deviceId,
                                _uuid: this.client.state.uuid,
                                comment_text: text,
                                containermodule: module,
                                replied_to_comment_id: replyToCommentId
                            })
                        })];
                    case 1:
                        body = (_c.sent()).body;
                        return [2 /*return*/, body.comment];
                }
            });
        });
    };
    MediaRepository.prototype.commentsDisable = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/disable_comments/",
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
    MediaRepository.prototype.commentsEnable = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/enable_comments/",
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
    MediaRepository.prototype.likers = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + id + "/likers/"
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.blocked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/blocked/"
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body.media_ids];
                }
            });
        });
    };
    MediaRepository.prototype.uploadFinish = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options.video) {
                            options.video = lodash_1.defaultsDeep(options.video, {
                                clips: [{ length: options.video.length, source_type: options.source_type }],
                                poster_frame_index: 0,
                                audio_muted: false
                            });
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/upload_finish/',
                                method: 'POST',
                                headers: {
                                    retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 })
                                },
                                form: this.client.request.sign(__assign({ timezone_offset: this.client.state.timezoneOffset, _csrftoken: this.client.state.cookieCsrfToken, source_type: options.source_type, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid, upload_id: options.upload_id, device: this.client.state.devicePayload }, options.video)),
                                qs: options.video ? { video: '1' } : {}
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    /**
     * Adds default values to the MediaConfigureOptions
     * @param options - user submitted options
     * @param defaults - default values
     */
    MediaRepository.prototype.applyConfigureDefaults = function (options, defaults) {
        var width = options.width || 1520;
        var height = options.height || 2048;
        var devicePayload = this.client.state.devicePayload;
        return lodash_1.defaultsDeep(options, __assign({ _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, _uuid: this.client.state.uuid, device: devicePayload, extra: { source_width: width, source_height: height } }, defaults));
    };
    /**
     * Configures an upload (indicated by {upload_id} in the options) for the timeline
     * @param options - configuration-options
     */
    MediaRepository.prototype.configure = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var devicePayload, now, width, height, form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        devicePayload = this.client.state.devicePayload;
                        now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
                        width = options.width || 1520;
                        height = options.height || 2048;
                        form = this.applyConfigureDefaults(options, {
                            width: width,
                            height: height,
                            upload_id: Date.now().toString(),
                            timezone_offset: this.client.state.timezoneOffset,
                            date_time_original: now,
                            date_time_digitalized: now,
                            caption: '',
                            source_type: '4',
                            media_folder: 'Camera',
                            edits: {
                                crop_original_size: [width, height],
                                crop_center: [0.0, -0.0],
                                crop_zoom: 1.0
                            },
                            // needed?!
                            camera_model: devicePayload.model,
                            scene_capture_type: 'standard',
                            device_id: this.client.state.deviceId,
                            creation_logger_session_id: this.client.state.clientSessionId,
                            software: '1',
                            camera_make: devicePayload.manufacturer
                        });
                        if (typeof form.usertags !== 'undefined') {
                            form.usertags = JSON.stringify(form.usertags);
                        }
                        if (typeof form.location !== 'undefined') {
                            form.location = JSON.stringify(form.location);
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure/',
                                method: 'POST',
                                form: this.client.request.sign(form)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.configureVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var now, form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
                        form = this.applyConfigureDefaults(options, {
                            width: options.width,
                            height: options.height,
                            upload_id: Date.now().toString(),
                            timezone_offset: this.client.state.timezoneOffset,
                            date_time_original: now,
                            caption: '',
                            source_type: '4',
                            device_id: this.client.state.deviceId,
                            filter_type: '0',
                            audio_muted: false,
                            poster_frame_index: 0
                        });
                        if (typeof form.usertags !== 'undefined') {
                            form.usertags = JSON.stringify(form.usertags);
                        }
                        if (typeof form.location !== 'undefined') {
                            form.location = JSON.stringify(form.location);
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure/',
                                method: 'POST',
                                qs: {
                                    video: '1'
                                },
                                form: this.client.request.sign(form)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.stringifyStoryStickers = function (form) {
        var serialize = function (obj) {
            if (typeof obj !== 'undefined' && Array.isArray(obj) && obj.length > 0 && typeof obj[0] !== 'string') {
                return JSON.stringify(obj);
            }
            return obj;
        };
        form.story_hashtags = serialize(form.story_hashtags);
        form.story_locations = serialize(form.story_locations);
        form.reel_mentions = serialize(form.reel_mentions);
        form.story_polls = serialize(form.story_polls);
        form.story_sliders = serialize(form.story_sliders);
        form.story_questions = serialize(form.story_questions);
        form.story_countdowns = serialize(form.story_countdowns);
        form.attached_media = serialize(form.attached_media);
        form.story_cta = serialize(form.story_cta);
        form.story_chats = serialize(form.story_chats);
        form.story_quizs = serialize(form.story_quizs);
    };
    MediaRepository.prototype.configureToStory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var now, width, height, form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        width = options.width || 1520;
                        height = options.height || 2048;
                        form = this.applyConfigureDefaults(options, {
                            width: width,
                            height: height,
                            source_type: '3',
                            configure_mode: '1',
                            client_shared_at: now.toString(),
                            edits: {
                                crop_original_size: [width, height],
                                crop_center: [0.0, -0.0],
                                crop_zoom: 1.0
                            }
                        });
                        // make sure source_type = 3
                        form.source_type = '3';
                        if (form.configure_mode === '1') {
                            MediaRepository.stringifyStoryStickers(form);
                        }
                        else if (form.configure_mode === '2') {
                            if (typeof form.recipient_users !== 'string') {
                                form.recipient_users = JSON.stringify(form.recipient_users ? [form.recipient_users.map(function (x) { return Number(x); })] : []);
                            }
                            form.thread_ids = JSON.stringify(form.thread_ids || []);
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure_to_story/',
                                method: 'POST',
                                form: this.client.request.sign(form)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.configureToStoryVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var now, devicePayload, form, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        devicePayload = this.client.state.devicePayload;
                        form = lodash_1.defaultsDeep(options, {
                            supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
                            timezone_offset: '0',
                            _csrftoken: this.client.state.cookieCsrfToken,
                            client_shared_at: now.toString(),
                            configure_mode: '1',
                            source_type: '3',
                            video_result: '',
                            _uid: this.client.state.cookieUserId,
                            date_time_original: new Date().toISOString().replace(/[-:]/g, ''),
                            device_id: this.client.state.deviceId,
                            _uuid: this.client.state.uuid,
                            device: devicePayload,
                            clips: [
                                {
                                    length: options.length,
                                    source_type: '3'
                                },
                            ],
                            extra: {
                                source_width: options.width,
                                source_height: options.height
                            },
                            audio_muted: false,
                            poster_frame_index: 0
                        });
                        // make sure source_type = 3
                        form.source_type = '3';
                        if (form.configure_mode === '1') {
                            MediaRepository.stringifyStoryStickers(form);
                        }
                        else if (form.configure_mode === '2') {
                            if (typeof form.recipient_users !== 'string') {
                                form.recipient_users = JSON.stringify(form.recipient_users ? [form.recipient_users.map(function (x) { return Number(x); })] : []);
                            }
                            form.thread_ids = JSON.stringify(form.thread_ids || []);
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure_to_story/',
                                method: 'POST',
                                qs: {
                                    video: '1'
                                },
                                form: this.client.request.sign(form)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.configureSidecar = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var isVideo, devicePayload, sidecarId, now, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isVideo = function (arg) {
                            return arg.length !== undefined;
                        };
                        devicePayload = this.client.state.devicePayload;
                        sidecarId = options.upload_id || Date.now().toString();
                        now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
                        options = lodash_1.defaultsDeep(options, {
                            _csrftoken: this.client.state.cookieCsrfToken,
                            _uid: this.client.state.cookieUserId,
                            _uuid: this.client.state.uuid,
                            timezone_offset: '0',
                            source_type: '4',
                            device_id: this.client.state.deviceId,
                            caption: '',
                            client_sidecar_id: sidecarId,
                            upload_id: sidecarId,
                            device: devicePayload
                        });
                        options.children_metadata = options.children_metadata.map(function (item) {
                            var width = item.width, height = item.height;
                            item = lodash_1.defaultsDeep(item, {
                                timezone_offset: '0',
                                caption: null,
                                source_type: '4',
                                extra: { source_width: width, source_height: height },
                                edits: { crop_original_size: [width, height], crop_center: [0.0, -0.0], crop_zoom: 1.0 },
                                device: devicePayload
                            });
                            if (typeof item.extra !== 'string') {
                                item.extra = JSON.stringify(item.extra);
                            }
                            if (typeof item.edits !== 'string') {
                                item.edits = JSON.stringify(item.edits);
                            }
                            if (typeof item.device !== 'string') {
                                item.device = JSON.stringify(item.device);
                            }
                            if (item.usertags && typeof item.usertags !== 'string') {
                                item.usertags = JSON.stringify(item.usertags);
                            }
                            if (isVideo(item)) {
                                item = lodash_1.defaultsDeep(item, {
                                    filter_type: '0',
                                    video_result: '',
                                    date_time_original: now,
                                    audio_muted: 'false',
                                    clips: [{ length: item.length, source_type: '4' }],
                                    poster_frame_index: '0'
                                });
                                var clips = item;
                                if (typeof clips !== 'string') {
                                    item.clips = JSON.stringify(clips);
                                }
                            }
                            return item;
                        });
                        if (typeof options.location !== 'string') {
                            options.location = JSON.stringify(options.location);
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure_sidecar/',
                                method: 'POST',
                                form: this.client.request.sign(options)
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.configureToIgtv = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var form, retryContext, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = lodash_1.defaultsDeep(options, {
                            caption: '',
                            date_time_original: new Date().toISOString().replace(/[-:]/g, ''),
                            igtv_share_preview_to_feed: '0',
                            clips: [
                                {
                                    length: options.length,
                                    source_type: options.source_type || '4'
                                },
                            ],
                            audio_muted: false,
                            poster_frame_index: 0,
                            filter_type: '0',
                            timezone_offset: this.client.state.timezoneOffset,
                            media_folder: options.source_type !== '4' ? 'Camera' : undefined,
                            source_type: '4',
                            device: this.client.state.devicePayload,
                            retryContext: { num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }
                        });
                        retryContext = options.retryContext;
                        delete form.retryContext;
                        return [4 /*yield*/, this.client.request.send({
                                url: '/api/v1/media/configure_to_igtv/',
                                method: 'POST',
                                qs: {
                                    video: '1'
                                },
                                headers: {
                                    is_igtv_video: '1',
                                    retry_context: JSON.stringify(retryContext)
                                },
                                form: this.client.request.sign(__assign(__assign({}, form), { _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, _uuid: this.client.state.uuid }))
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.onlyMe = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/only_me/",
                            method: 'POST',
                            form: this.client.request.sign({
                                media_id: mediaId,
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
    MediaRepository.prototype.undoOnlyMe = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/undo_only_me/",
                            method: 'POST',
                            form: this.client.request.sign({
                                media_id: mediaId,
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
    MediaRepository.prototype.seen = function (reels, module) {
        if (module === void 0) { module = 'feed_timeline'; }
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v2/media/seen/",
                            method: 'POST',
                            qs: {
                                reel: 1,
                                live_vod: 0
                            },
                            // TODO: gzip
                            form: this.client.request.sign({
                                reels: reels,
                                container_module: module,
                                reel_media_skipped: [],
                                live_vods: [],
                                live_vods_skipped: [],
                                nuxes: [],
                                nuxes_skipped: [],
                                _uuid: this.client.state.uuid,
                                _uid: this.client.state.cookieUserId,
                                _csrftoken: this.client.state.cookieCsrfToken,
                                device_id: this.client.state.deviceId
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    // tip: id = savedFeed.items()[0].media.id
    MediaRepository.prototype.save = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/save/",
                            method: 'POST'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.unsave = function (mediaId) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/unsave/",
                            method: 'POST'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.storyPollVote = function (mediaId, pollId, vote) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/" + pollId + "/story_poll_vote/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                radio_type: this.client.state.radioType,
                                _uid: this.client.state.cookieUserId,
                                vote: vote,
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
    MediaRepository.prototype.storyQuestionResponse = function (mediaId, questionId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var chance, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chance = new Chance();
                        // @ts-ignore
                        if (typeof options.response === 'undefined') {
                            options = lodash_1.defaultsDeep(options, { music_browse_session_id: chance.guid({ version: 4 }) });
                        }
                        return [4 /*yield*/, this.client.request.send({
                                url: "/api/v1/media/" + mediaId + "/" + questionId + "/story_question_response/",
                                method: 'POST',
                                form: this.client.request.sign(__assign({ client_context: chance.guid({ version: 4 }), mutation_token: chance.guid({ version: 4 }), _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, _uuid: this.client.state.uuid }, options))
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MediaRepository.prototype.storySliderVote = function (mediaId, sliderId, vote) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/" + sliderId + "/story_slider_vote/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uid: this.client.state.cookieUserId,
                                _uuid: this.client.state.uuid,
                                vote: vote.toFixed(8)
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
     * Answers a story quiz
     * @param mediaId storyId
     * @param quizId id of the quiz
     * @param answer index (string is only for compatibility)
     */
    MediaRepository.prototype.storyQuizAnswer = function (mediaId, quizId, answer) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request.send({
                            url: "/api/v1/media/" + mediaId + "/" + quizId + "/story_quiz_answer/",
                            method: 'POST',
                            form: this.client.request.sign({
                                _csrftoken: this.client.state.cookieCsrfToken,
                                _uuid: this.client.state.uuid,
                                answer: answer
                            })
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    return MediaRepository;
}(repository_1.Repository));
exports.MediaRepository = MediaRepository;
