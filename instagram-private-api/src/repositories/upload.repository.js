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
var repository_1 = require("../core/repository");
var Chance = require("chance");
var debug_1 = require("debug");
var UploadRepository = /** @class */ (function (_super) {
    __extends(UploadRepository, _super);
    function UploadRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chance = new Chance();
        return _this;
    }
    UploadRepository.prototype.photo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadId, name, contentLength, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadId = options.uploadId || Date.now();
                        name = uploadId + "_0_" + lodash_1.random(1000000000, 9999999999);
                        contentLength = options.file.byteLength;
                        UploadRepository.uploadDebug("Uploading " + options.file.byteLength + "b as " + uploadId + " (photo, jpeg)");
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igphoto/" + name,
                                method: 'POST',
                                headers: {
                                    X_FB_PHOTO_WATERFALL_ID: options.waterfallId || this.chance.guid(),
                                    'X-Entity-Type': 'image/jpeg',
                                    Offset: 0,
                                    'X-Instagram-Rupload-Params': JSON.stringify(UploadRepository.createPhotoRuploadParams(options, uploadId)),
                                    'X-Entity-Name': name,
                                    'X-Entity-Length': contentLength,
                                    'Content-Type': 'application/octet-stream',
                                    'Content-Length': contentLength,
                                    'Accept-Encoding': 'gzip'
                                },
                                body: options.file
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    /**
     * Uploads a video (container: mp4 with h264 and aac)
     */
    UploadRepository.prototype.video = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var video, uploadId, name, contentLength, waterfallId, ruploadParams, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        video = options.video;
                        uploadId = options.uploadId || Date.now();
                        name = options.uploadName || uploadId + "_0_" + lodash_1.random(1000000000, 9999999999);
                        contentLength = video.byteLength;
                        waterfallId = options.waterfallId || this.chance.guid({ version: 4 });
                        ruploadParams = UploadRepository.createVideoRuploadParams(options, uploadId);
                        UploadRepository.uploadDebug("Uploading " + options.video.byteLength + "b as " + uploadId + " (video, mp4, not segmented). Info: " + JSON.stringify(ruploadParams));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + name,
                                method: 'POST',
                                qs: {
                                // target: this.client.state.extractCookieValue('rur'),
                                },
                                headers: __assign(__assign({}, this.getBaseHeaders(ruploadParams)), { X_FB_VIDEO_WATERFALL_ID: waterfallId, 'X-Entity-Type': 'video/mp4', Offset: options.offset || 0, 'X-Entity-Name': name, 'X-Entity-Length': contentLength, 'Content-Type': 'application/octet-stream', 'Content-Length': contentLength, 'Accept-Encoding': 'gzip' }),
                                body: video
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.initVideo = function (_a) {
        var name = _a.name, ruploadParams = _a.ruploadParams, waterfallId = _a.waterfallId;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        UploadRepository.uploadDebug("Initializing video upload: " + JSON.stringify(ruploadParams));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + name,
                                method: 'GET',
                                headers: __assign(__assign({}, this.getBaseHeaders(ruploadParams)), { X_FB_VIDEO_WATERFALL_ID: waterfallId, 'X-Entity-Type': 'video/mp4', 'Accept-Encoding': 'gzip' })
                            }, true)];
                    case 1:
                        body = (_b.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.startSegmentedVideo = function (ruploadParams) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UploadRepository.uploadDebug("Starting segmented video upload: " + JSON.stringify(ruploadParams));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + this.chance.guid({ version: 4 }),
                                qs: {
                                    segmented: true,
                                    phase: 'start'
                                },
                                method: 'POST',
                                body: '',
                                headers: __assign(__assign({}, this.getBaseHeaders(ruploadParams)), { 'Accept-Encoding': 'gzip', 'Content-Length': 0 })
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.videoSegmentInit = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UploadRepository.uploadDebug("Initializing segmented video upload: " + JSON.stringify(options));
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + options.transferId,
                                method: 'GET',
                                qs: {
                                    segmented: true,
                                    phase: 'transfer'
                                },
                                headers: __assign(__assign({}, this.getBaseHeaders(options.ruploadParams)), { 'Stream-Id': options.streamId, 'Segment-Start-Offset': options.startOffset, X_FB_VIDEO_WATERFALL_ID: options.waterfallId, 'Segment-Type': '2', 'Accept-Encoding': 'gzip' })
                            }, true)];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.videoSegmentTransfer = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UploadRepository.uploadDebug("Transfering segmented video: " + options.segment.byteLength + "b, stream position: " + options.startOffset);
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + options.transferId,
                                qs: {
                                    segmented: true,
                                    phase: 'transfer'
                                },
                                method: 'POST',
                                headers: __assign(__assign({}, this.getBaseHeaders(options.ruploadParams)), { 'X-Entity-Length': options.segment.byteLength, 'X-Entity-Name': options.transferId, 'Stream-Id': options.streamId, 'X-Entity-Type': 'video/mp4', 'Segment-Start-Offset': options.startOffset, 'Segment-Type': '2', X_FB_VIDEO_WATERFALL_ID: options.waterfallId, 
                                    // TODO: inspect offset
                                    Offset: 0, 'Content-Length': options.segment.byteLength }),
                                body: options.segment
                            })];
                    case 1:
                        body = (_a.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.endSegmentedVideo = function (_a) {
        var ruploadParams = _a.ruploadParams, streamId = _a.streamId;
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        UploadRepository.uploadDebug("Ending segmented video upload of " + streamId);
                        return [4 /*yield*/, this.client.request.send({
                                url: "/rupload_igvideo/" + this.chance.guid({ version: 4 }),
                                qs: {
                                    segmented: true,
                                    phase: 'end'
                                },
                                method: 'POST',
                                body: '',
                                headers: __assign(__assign({}, this.getBaseHeaders(ruploadParams)), { 'Accept-Encoding': 'gzip', 'Content-Length': 0, 'Stream-Id': streamId })
                            })];
                    case 1:
                        body = (_b.sent()).body;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    UploadRepository.prototype.getBaseHeaders = function (ruploadParams) {
        return {
            'X-IG-Connection-Type': this.client.state.connectionTypeHeader,
            'X-IG-Capabilities': this.client.state.capabilitiesHeader,
            'X-IG-App-ID': this.client.state.fbAnalyticsApplicationId,
            'Accept-Encoding': 'gzip',
            'X-Instagram-Rupload-Params': JSON.stringify(ruploadParams)
        };
    };
    UploadRepository.createPhotoRuploadParams = function (options, uploadId) {
        var ruploadParams = {
            retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
            media_type: '1',
            upload_id: uploadId.toString(),
            xsharing_user_ids: JSON.stringify([]),
            image_compression: JSON.stringify({ lib_name: 'moz', lib_version: '3.1.m', quality: '80' })
        };
        if (options.isSidecar) {
            ruploadParams.is_sidecar = '1';
        }
        return ruploadParams;
    };
    UploadRepository.createVideoRuploadParams = function (options, uploadId, retryContext) {
        var duration = options.duration, width = options.width, height = options.height;
        var ruploadParams = {
            retry_context: JSON.stringify(retryContext || { num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
            media_type: options.mediaType || '2',
            xsharing_user_ids: JSON.stringify([]),
            upload_id: uploadId.toString(),
            upload_media_height: height === null || height === void 0 ? void 0 : height.toString(),
            upload_media_width: width === null || width === void 0 ? void 0 : width.toString(),
            upload_media_duration_ms: duration.toString()
        };
        if (options.isSidecar) {
            ruploadParams.is_sidecar = '1';
        }
        if (options.forAlbum) {
            ruploadParams.for_album = '1';
        }
        if (options.isDirect) {
            ruploadParams.direct_v2 = '1';
        }
        if (options.forDirectStory) {
            ruploadParams.for_direct_story = '1';
            ruploadParams.content_tags = '';
        }
        if (options.isIgtvVideo) {
            ruploadParams.is_igtv_video = '1';
        }
        if (options.isDirectVoice) {
            ruploadParams.is_direct_voice = '1';
        }
        return ruploadParams;
    };
    UploadRepository.uploadDebug = debug_1["default"]('ig:upload');
    return UploadRepository;
}(repository_1.Repository));
exports.UploadRepository = UploadRepository;
