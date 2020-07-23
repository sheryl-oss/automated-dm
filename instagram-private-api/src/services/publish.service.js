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
var types_1 = require("../types");
var errors_1 = require("../errors");
var sizeOf = require("image-size");
var Bluebird = require("bluebird");
var Chance = require("chance");
var lodash_1 = require("lodash");
var upload_repository_1 = require("../repositories/upload.repository");
var debug_1 = require("debug");
var sticker_builder_1 = require("../sticker-builder");
var PublishService = /** @class */ (function (_super) {
    __extends(PublishService, _super);
    function PublishService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chance = new Chance();
        return _this;
    }
    /**
     * The current way of handling the 202 - Accepted; Transcode pending -error
     * @param videoInfo The video info for debugging reasons
     * @param transcodeDelayInMs The delay for instagram to transcode the video
     */
    PublishService.catchTranscodeError = function (videoInfo, transcodeDelayInMs) {
        return function (error) {
            if (error.response.statusCode === 202) {
                PublishService.publishDebug("Received trancode error: " + JSON.stringify(error.response.body) + ", waiting " + transcodeDelayInMs + "ms");
                return Bluebird.delay(transcodeDelayInMs);
            }
            else {
                throw new errors_1.IgUploadVideoError(error.response, videoInfo);
            }
        };
    };
    /**
     * Gets duration in ms, width and height info for a video in the mp4 container
     * @param buffer Buffer, containing the video-file
     * @returns duration in ms, width and height in px
     */
    PublishService.getVideoInfo = function (buffer) {
        var width = PublishService.read16(buffer, ['moov', 'trak', 'stbl', 'avc1'], 24);
        var height = PublishService.read16(buffer, ['moov', 'trak', 'stbl', 'avc1'], 26);
        return {
            duration: PublishService.getMP4Duration(buffer),
            width: width,
            height: height
        };
    };
    /**
     * Reads the duration in ms from any MP4 file with at least one stream (a/v)
     * @param buffer
     */
    PublishService.getMP4Duration = function (buffer) {
        var timescale = PublishService.read32(buffer, ['moov', 'mvhd'], 12);
        var length = PublishService.read32(buffer, ['moov', 'mvhd'], 12 + 4);
        return Math.floor((length / timescale) * 1000);
    };
    PublishService.makeLocationOptions = function (location) {
        var options = {};
        if (typeof location !== 'undefined') {
            var lat = location.lat, lng = location.lng, external_id_source = location.external_id_source, external_id = location.external_id, name_1 = location.name, address = location.address;
            options.location = {
                name: name_1,
                lat: lat,
                lng: lng,
                address: address,
                external_source: external_id_source,
                external_id: external_id
            };
            options.location[external_id_source + '_id'] = external_id;
            options.geotag_enabled = '1';
            options.media_latitude = lat.toString();
            options.media_longitude = lng.toString();
            options.posting_latitude = lat.toString();
            options.posting_longitude = lng.toString();
        }
        return options;
    };
    /**
     * Reads a 32bit unsigned integer from a given Buffer by walking along the keys and getting the value with the given offset
     * ref: https://gist.github.com/OllieJones/5ffb011fa3a11964154975582360391c#file-streampeek-js-L9
     * @param buffer  The buffer to read from
     * @param keys  Keys the 'walker' should pass (stopping at the last key)
     * @param offset  Offset from the ast key to read the uint32
     */
    PublishService.read32 = function (buffer, keys, offset) {
        var start = 0;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            start = buffer.indexOf(Buffer.from(key), start) + key.length;
        }
        return buffer.readUInt32BE(start + offset);
    };
    /**
     * Reads a 16bit unsigned integer from a given Buffer by walking along the keys and getting the value with the given offset
     * ref: https://gist.github.com/OllieJones/5ffb011fa3a11964154975582360391c#file-streampeek-js-L25
     * @param buffer  The buffer to read from
     * @param keys  Keys the 'walker' should pass (stopping at the last key)
     * @param offset  Offset from the ast key to read the uint16
     */
    PublishService.read16 = function (buffer, keys, offset) {
        var start = 0;
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            start = buffer.indexOf(Buffer.from(key), start) + key.length;
        }
        return buffer.readUInt16BE(start + offset);
    };
    /**
     * Uploads a single photo to the timeline-feed
     * @param options - the options, containing caption and image-data
     */
    PublishService.prototype.photo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadedPhoto, imageSize, configureOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.upload.photo({
                            file: options.file
                        })];
                    case 1:
                        uploadedPhoto = _a.sent();
                        return [4 /*yield*/, sizeOf(options.file)];
                    case 2:
                        imageSize = _a.sent();
                        configureOptions = __assign({ upload_id: uploadedPhoto.upload_id, width: imageSize.width, height: imageSize.height, caption: options.caption }, PublishService.makeLocationOptions(options.location));
                        if (typeof options.usertags !== 'undefined') {
                            configureOptions.usertags = options.usertags;
                        }
                        return [4 /*yield*/, this.client.media.configure(configureOptions)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PublishService.prototype.video = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, videoInfo, configureOptions, i, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = Date.now().toString();
                        videoInfo = PublishService.getVideoInfo(options.video);
                        PublishService.publishDebug("Publishing video to timeline: " + JSON.stringify(videoInfo));
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.regularVideo(__assign({ video: options.video, uploadId: uploadId }, videoInfo));
                            })["catch"](errors_1.IgResponseError, function (error) {
                                throw new errors_1.IgUploadVideoError(error.response, videoInfo);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.upload.photo({
                                file: options.coverImage,
                                uploadId: uploadId.toString()
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.client.media.uploadFinish({
                                    upload_id: uploadId,
                                    source_type: '4',
                                    video: { length: videoInfo.duration / 1000.0 }
                                });
                            })["catch"](errors_1.IgResponseError, PublishService.catchTranscodeError(videoInfo, options.transcodeDelay || 5000))];
                    case 3:
                        _a.sent();
                        configureOptions = __assign({ upload_id: uploadId.toString(), caption: options.caption, length: videoInfo.duration / 1000.0, width: videoInfo.width, height: videoInfo.height, clips: [
                                {
                                    length: videoInfo.duration / 1000.0,
                                    source_type: '4'
                                },
                            ] }, PublishService.makeLocationOptions(options.location));
                        if (typeof options.usertags !== 'undefined') {
                            configureOptions.usertags = options.usertags;
                        }
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < 6)) return [3 /*break*/, 10];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 9]);
                        return [4 /*yield*/, this.client.media.configureVideo(configureOptions)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        e_1 = _a.sent();
                        if (i >= 5 || e_1.response.statusCode >= 400) {
                            throw new errors_1.IgConfigureVideoError(e_1.response, configureOptions);
                        }
                        return [4 /*yield*/, Bluebird.delay((i + 1) * 2 * 1000)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        i++;
                        return [3 /*break*/, 4];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PublishService.prototype.album = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var isPhoto, isVideo, _loop_1, this_1, _i, _a, item;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isPhoto = function (arg) {
                            return arg.file !== undefined;
                        };
                        isVideo = function (arg) {
                            return arg.video !== undefined;
                        };
                        _loop_1 = function (item) {
                            var uploadedPhoto, _a, width, height;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!isPhoto(item)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.client.upload.photo({
                                                file: item.file,
                                                uploadId: item.uploadId,
                                                isSidecar: true
                                            })];
                                    case 1:
                                        uploadedPhoto = _b.sent();
                                        return [4 /*yield*/, sizeOf(item.file)];
                                    case 2:
                                        _a = _b.sent(), width = _a.width, height = _a.height;
                                        item.width = width;
                                        item.height = height;
                                        item.uploadId = uploadedPhoto.upload_id;
                                        return [3 /*break*/, 7];
                                    case 3:
                                        if (!isVideo(item)) return [3 /*break*/, 7];
                                        item.videoInfo = PublishService.getVideoInfo(item.video);
                                        item.uploadId = Date.now().toString();
                                        PublishService.publishDebug("Adding video to album: " + JSON.stringify(item.videoInfo));
                                        return [4 /*yield*/, Bluebird["try"](function () {
                                                return _this.regularVideo(__assign({ video: item.video, uploadId: item.uploadId, isSidecar: true }, item.videoInfo));
                                            })["catch"](errors_1.IgResponseError, function (error) {
                                                throw new errors_1.IgConfigureVideoError(error.response, item.videoInfo);
                                            })];
                                    case 4:
                                        _b.sent();
                                        return [4 /*yield*/, this_1.client.upload.photo({
                                                file: item.coverImage,
                                                uploadId: item.uploadId,
                                                isSidecar: true
                                            })];
                                    case 5:
                                        _b.sent();
                                        return [4 /*yield*/, Bluebird["try"](function () {
                                                return _this.client.media.uploadFinish({
                                                    upload_id: item.uploadId,
                                                    source_type: '4',
                                                    video: { length: item.videoInfo.duration / 1000.0 }
                                                });
                                            })["catch"](errors_1.IgResponseError, PublishService.catchTranscodeError(item.videoInfo, item.transcodeDelay))];
                                    case 6:
                                        _b.sent();
                                        _b.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = options.items;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        item = _a[_i];
                        return [5 /*yield**/, _loop_1(item)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.client.media.configureSidecar(__assign({ caption: options.caption, children_metadata: options.items.map(function (item) {
                                if (isVideo(item)) {
                                    return {
                                        upload_id: item.uploadId,
                                        width: item.videoInfo.width,
                                        height: item.videoInfo.height,
                                        length: item.videoInfo.duration,
                                        usertags: item.usertags
                                    };
                                }
                                else if (isPhoto(item)) {
                                    return {
                                        upload_id: item.uploadId,
                                        width: item.width,
                                        height: item.height,
                                        usertags: item.usertags
                                    };
                                }
                            }) }, PublishService.makeLocationOptions(options.location)))];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    PublishService.prototype.story = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var isPhoto, storyStickerIds, configureOptions, uploadAndConfigure, threadIds, recipients, _a, latitude, longitude;
            var _this = this;
            return __generator(this, function (_b) {
                isPhoto = function (arg) {
                    return arg.file !== undefined;
                };
                if (options.stickerConfig instanceof sticker_builder_1.StickerBuilder) {
                    options.stickerConfig = options.stickerConfig.build();
                }
                storyStickerIds = [];
                configureOptions = __assign({ configure_mode: '1' }, (options.stickerConfig ? options.stickerConfig : {}));
                uploadAndConfigure = function () {
                    return isPhoto(options)
                        ? _this.uploadAndConfigureStoryPhoto(options, configureOptions)
                        : _this.uploadAndConfigureStoryVideo(options, configureOptions);
                };
                threadIds = typeof options.threadIds !== 'undefined';
                recipients = typeof options.recipientUsers !== 'undefined';
                if (recipients || threadIds) {
                    configureOptions.configure_mode = '2';
                    configureOptions.view_mode = options.viewMode;
                    configureOptions.reply_type = options.replyType;
                    configureOptions.client_context = this.chance.guid();
                    if (recipients) {
                        configureOptions.recipient_users = options.recipientUsers;
                    }
                    configureOptions.thread_ids = threadIds ? options.threadIds : [];
                    return [2 /*return*/, uploadAndConfigure()];
                }
                // story goes to story-feed
                if (options.toBesties) {
                    configureOptions.audience = 'besties';
                }
                // check each sticker and add them
                if (typeof options.hashtags !== 'undefined' && options.hashtags.length > 0) {
                    if (typeof options.caption === 'undefined') {
                        options.caption = '';
                    }
                    options.hashtags.forEach(function (hashtag) {
                        if (hashtag.tag_name.includes('#')) {
                            hashtag.tag_name = hashtag.tag_name.replace('#', '');
                        }
                        if (!options.caption.includes(hashtag.tag_name)) {
                            options.caption = options.caption + " " + hashtag.tag_name;
                        }
                    });
                    configureOptions.story_hashtags = options.hashtags;
                    configureOptions.mas_opt_in = 'NOT_PROMPTED';
                }
                if (typeof options.location !== 'undefined') {
                    _a = options.location, latitude = _a.latitude, longitude = _a.longitude;
                    configureOptions.geotag_enabled = '1';
                    configureOptions.posting_latitude = latitude;
                    configureOptions.posting_longitude = longitude;
                    configureOptions.media_latitude = latitude;
                    configureOptions.media_longitude = longitude;
                    configureOptions.story_locations = [options.location.sticker];
                    configureOptions.mas_opt_in = 'NOT_PROMPTED';
                }
                if (typeof options.mentions !== 'undefined' && options.mentions.length > 0) {
                    if (typeof options.caption === 'undefined') {
                        options.caption = '';
                    }
                    else {
                        options.caption = options.caption.replace(' ', '+') + '+';
                    }
                    configureOptions.reel_mentions = options.mentions;
                    configureOptions.mas_opt_in = 'NOT_PROMPTED';
                }
                if (typeof options.poll !== 'undefined') {
                    configureOptions.story_polls = [options.poll];
                    configureOptions.internal_features = 'polling_sticker';
                    configureOptions.mas_opt_in = 'NOT_PROMPTED';
                }
                if (typeof options.slider !== 'undefined') {
                    configureOptions.story_sliders = [options.slider];
                    storyStickerIds.push("emoji_slider_" + options.slider.emoji);
                }
                if (typeof options.question !== 'undefined') {
                    configureOptions.story_questions = [options.question];
                    storyStickerIds.push('question_sticker_ma');
                }
                if (typeof options.countdown !== 'undefined') {
                    configureOptions.story_countdowns = [options.countdown];
                    storyStickerIds.push('countdown_sticker_time');
                }
                if (typeof options.media !== 'undefined') {
                    configureOptions.attached_media = [options.media];
                    storyStickerIds.push("media_simple_" + options.media.media_id);
                }
                if (typeof options.chat !== 'undefined') {
                    configureOptions.story_chats = [options.chat];
                    storyStickerIds.push('chat_sticker_id');
                }
                if (typeof options.quiz !== 'undefined') {
                    configureOptions.story_quizs = [options.quiz];
                    storyStickerIds.push('quiz_story_sticker_default');
                }
                if (typeof options.link !== 'undefined' && options.link.length > 0) {
                    configureOptions.story_cta = [
                        {
                            links: [{ webUri: options.link }]
                        },
                    ];
                }
                if (storyStickerIds.length > 0) {
                    configureOptions.story_sticker_ids = storyStickerIds.join(',');
                }
                return [2 /*return*/, uploadAndConfigure()];
            });
        });
    };
    PublishService.prototype.igtvVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var videoInfo, uploadId, uploadResult, form, _a, left, right, top_1, bottom, ratio, finalInput, i, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        videoInfo = PublishService.getVideoInfo(options.video);
                        PublishService.publishDebug("Publishing video to igtv: " + JSON.stringify(videoInfo));
                        uploadId = Date.now().toString();
                        return [4 /*yield*/, this.segmentedVideo(__assign(__assign(__assign({ video: options.video, isIgtvVideo: true }, videoInfo), { uploadId: uploadId }), options.uploadOptions))];
                    case 1:
                        uploadResult = _b.sent();
                        return [4 /*yield*/, this.client.upload.photo({ uploadId: uploadId, file: options.coverFrame })];
                    case 2:
                        _b.sent();
                        form = {
                            upload_id: uploadId,
                            title: options.title,
                            caption: options.caption,
                            audio_muted: options.audioMuted,
                            length: videoInfo.duration / 1000.0,
                            extra: {
                                source_width: videoInfo.width,
                                source_height: videoInfo.height
                            },
                            retryContext: uploadResult.retryContext
                        };
                        if (options.shareToFeed) {
                            form.igtv_share_preview_to_feed = '1';
                            if (options.feedPreviewCrop) {
                                _a = options.feedPreviewCrop, left = _a.left, right = _a.right, top_1 = _a.top, bottom = _a.bottom;
                                form.feed_preview_crop = { crop_left: left, crop_bottom: bottom, crop_right: right, crop_top: top_1 };
                            }
                            else {
                                ratio = videoInfo.width / videoInfo.height;
                                if (ratio > 1) {
                                    throw new Error('Received invalid video ratio. Try specifying feedPreviewCrop directly.');
                                }
                                form.feed_preview_crop = {
                                    crop_left: 0.0,
                                    crop_right: 1.0,
                                    crop_top: (1 - ratio) / 2,
                                    crop_bottom: ratio + (1 - ratio) / 2
                                };
                            }
                        }
                        finalInput = __assign(__assign({}, form), options.configureOptions);
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < 6)) return [3 /*break*/, 9];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 8]);
                        return [4 /*yield*/, this.client.media.configureToIgtv(finalInput)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        e_2 = _b.sent();
                        if (i >= 6) {
                            throw new errors_1.IgConfigureVideoError(e_2.response, finalInput);
                        }
                        return [4 /*yield*/, Bluebird.delay((i + 1) * 2 * 1000)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        i++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PublishService.prototype.regularVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ruploadParams, offset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = lodash_1.defaults(options, {
                            uploadId: Date.now(),
                            waterfallId: this.chance.guid({ version: 4 })
                        });
                        options.uploadName = options.uploadName || options.uploadId + "_0_" + lodash_1.random(1000000000, 9999999999);
                        ruploadParams = upload_repository_1.UploadRepository.createVideoRuploadParams(options, options.uploadId);
                        return [4 /*yield*/, this.client.upload.initVideo({
                                name: options.uploadName,
                                ruploadParams: ruploadParams,
                                waterfallId: options.waterfallId
                            })];
                    case 1:
                        offset = (_a.sent()).offset;
                        return [2 /*return*/, this.client.upload.video(__assign({ offset: offset }, options))];
                }
            });
        });
    };
    PublishService.prototype.segmentedVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, retryContext, ruploadParams, waterfallId, streamId, segments, startOffset, _i, segments_1, segment, transferId, streamOffset, end;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = options.uploadId || Date.now().toString();
                        retryContext = options.retryContext || { num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 };
                        ruploadParams = upload_repository_1.UploadRepository.createVideoRuploadParams(options, uploadId, retryContext);
                        waterfallId = options.waterfallId || lodash_1.random(1000000000, 9999999999).toString();
                        return [4 /*yield*/, this.client.upload.startSegmentedVideo(ruploadParams)];
                    case 1:
                        streamId = (_a.sent()).stream_id;
                        segments = options.segments ||
                            (options.segmentDivider || types_1.SEGMENT_DIVIDERS.sectionSize(Math.pow(2, 24)))({
                                buffer: options.video,
                                client: this.client
                            });
                        PublishService.publishDebug("Uploading " + segments.length + " segments.");
                        startOffset = 0;
                        _i = 0, segments_1 = segments;
                        _a.label = 2;
                    case 2:
                        if (!(_i < segments_1.length)) return [3 /*break*/, 6];
                        segment = segments_1[_i];
                        transferId = this.chance.guid({ version: 4 }).replace('-', '') + "-0-" + segment.byteLength;
                        return [4 /*yield*/, this.client.upload.videoSegmentInit({
                                waterfallId: waterfallId,
                                streamId: streamId,
                                startOffset: startOffset,
                                ruploadParams: ruploadParams,
                                transferId: transferId
                            })];
                    case 3:
                        streamOffset = (_a.sent()).offset;
                        if (streamOffset !== 0) {
                            // TODO: implement offset != 0
                            throw new Error("Offset != 0 isn't implemented. Open an issue including your network config and other setup information to reproduce.");
                        }
                        return [4 /*yield*/, this.client.upload.videoSegmentTransfer({
                                waterfallId: waterfallId,
                                streamId: streamId,
                                startOffset: startOffset,
                                ruploadParams: ruploadParams,
                                transferId: transferId,
                                segment: segment
                            })];
                    case 4:
                        _a.sent();
                        startOffset += segment.byteLength;
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, this.client.upload.endSegmentedVideo({ ruploadParams: ruploadParams, streamId: streamId })];
                    case 7:
                        end = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, end), { retryContext: retryContext, uploadId: uploadId, waterfallId: waterfallId })];
                }
            });
        });
    };
    PublishService.prototype.uploadAndConfigureStoryPhoto = function (options, configureOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, imageSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = Date.now().toString();
                        return [4 /*yield*/, sizeOf(options.file)];
                    case 1:
                        imageSize = _a.sent();
                        return [4 /*yield*/, this.client.upload.photo({
                                file: options.file,
                                uploadId: uploadId
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.client.media.configureToStory(__assign(__assign({}, configureOptions), { upload_id: uploadId, width: imageSize.width, height: imageSize.height }))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PublishService.prototype.uploadAndConfigureStoryVideo = function (options, configureOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, videoInfo, waterfallId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = lodash_1.random(100000000000, 999999999999).toString();
                        videoInfo = PublishService.getVideoInfo(options.video);
                        PublishService.publishDebug("Publishing video to story: " + JSON.stringify(videoInfo));
                        waterfallId = this.chance.guid({ version: 4 });
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.regularVideo(__assign({ video: options.video, uploadId: uploadId, forDirectStory: configureOptions.configure_mode === '2', waterfallId: waterfallId, forAlbum: true }, videoInfo));
                            })["catch"](errors_1.IgResponseError, function (error) {
                                throw new errors_1.IgConfigureVideoError(error.response, videoInfo);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.upload.photo({
                                file: options.coverImage,
                                waterfallId: waterfallId,
                                uploadId: uploadId
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Bluebird["try"](function () {
                                return _this.client.media.uploadFinish({
                                    upload_id: uploadId,
                                    source_type: '3',
                                    video: { length: videoInfo.duration / 1000.0 }
                                });
                            })["catch"](errors_1.IgResponseError, PublishService.catchTranscodeError(videoInfo, options.transcodeDelay))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Bluebird["try"](function () {
                                return _this.client.media.configureToStoryVideo(__assign({ upload_id: uploadId, length: videoInfo.duration / 1000.0, width: videoInfo.width, height: videoInfo.height }, configureOptions));
                            })["catch"](errors_1.IgResponseError, function (error) {
                                throw new errors_1.IgConfigureVideoError(error.response, videoInfo);
                            })];
                }
            });
        });
    };
    PublishService.publishDebug = debug_1["default"]('ig:publish');
    return PublishService;
}(repository_1.Repository));
exports.PublishService = PublishService;
