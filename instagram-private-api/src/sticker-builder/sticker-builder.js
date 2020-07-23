"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var class_transformer_1 = require("class-transformer");
var lodash_1 = require("lodash");
var stickers_1 = require("./stickers");
var StickerBuilder = /** @class */ (function () {
    function StickerBuilder() {
        this.stickers = [];
    }
    StickerBuilder.prototype.add = function (sticker) {
        this.stickers.push(sticker);
        return this;
    };
    StickerBuilder.prototype.build = function () {
        var _a;
        var map = new Map();
        for (var _i = 0, _b = this.stickers; _i < _b.length; _i++) {
            var sticker = _b[_i];
            if (map.has(sticker.key)) {
                (_a = map.get(sticker.key)) === null || _a === void 0 ? void 0 : _a.push(sticker);
            }
            else {
                map.set(sticker.key, [sticker]);
            }
        }
        var result = {};
        var ids = [];
        var additionalProperties = [];
        for (var _c = 0, _d = map.values(); _c < _d.length; _c++) {
            var stickers = _d[_c];
            Object.defineProperty(result, stickers[0].key, { value: JSON.stringify(stickers), enumerable: true });
            stickers.forEach(function (sticker) { return additionalProperties.push(sticker.additionalConfigureProperties); });
            ids.push(stickers[0].id);
        }
        return __assign(__assign(__assign({}, lodash_1.defaults.apply(void 0, __spreadArrays([{}], additionalProperties))), result), { story_sticker_ids: ids.join(',') });
    };
    // wrappers, so you only have to import StickerBuilder
    StickerBuilder.hashtag = function (options) {
        return class_transformer_1.plainToClass(stickers_1.HashtagSticker, options);
    };
    StickerBuilder.mention = function (options) {
        return class_transformer_1.plainToClass(stickers_1.MentionSticker, options);
    };
    /**
     * Wrapper to create a story-mention
     * @param mediaInfo - StoryItem Object with pk and a user
     * @param additional any additional options
     */
    StickerBuilder.mentionReel = function (mediaInfo, additional) {
        if (additional === void 0) { additional = {}; }
        return StickerBuilder.mention(__assign({ userId: mediaInfo.user.pk.toString(), mediaId: mediaInfo.pk, displayType: 'mention_reshare', width: 0.7, height: 0.9 }, additional));
    };
    StickerBuilder.location = function (options) {
        return class_transformer_1.plainToClass(stickers_1.LocationSticker, options);
    };
    StickerBuilder.countdown = function (options) {
        return class_transformer_1.plainToClass(stickers_1.CountdownSticker, options);
    };
    StickerBuilder.chat = function (options) {
        return class_transformer_1.plainToClass(stickers_1.ChatSticker, options);
    };
    StickerBuilder.poll = function (options) {
        return class_transformer_1.plainToClass(stickers_1.PollSticker, options);
    };
    StickerBuilder.question = function (options) {
        return class_transformer_1.plainToClass(stickers_1.QuestionSticker, options);
    };
    StickerBuilder.quiz = function (options) {
        return class_transformer_1.plainToClass(stickers_1.QuizSticker, __assign({ width: 0.7291667, height: 0.11824318 + options.options.length * 0.10304056 }, options));
    };
    StickerBuilder.slider = function (options) {
        return class_transformer_1.plainToClass(stickers_1.SliderSticker, options);
    };
    /**
     * The mediaId only contains the media pk.
     * The user id is stored in mediaOwnerId.
     * @param options
     */
    StickerBuilder.attachment = function (options) {
        return class_transformer_1.plainToClass(stickers_1.AttachmentSticker, options);
    };
    StickerBuilder.attachmentFromMedia = function (mediaInfo, additional) {
        if (additional === void 0) { additional = {}; }
        return StickerBuilder.attachment(__assign({ mediaId: mediaInfo.pk, mediaOwnerId: mediaInfo.user.pk.toString() }, additional));
    };
    return StickerBuilder;
}());
exports.StickerBuilder = StickerBuilder;
