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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var insta_sticker_1 = require("./insta-sticker");
var decorators_1 = require("../../decorators");
var MentionSticker = /** @class */ (function (_super) {
    __extends(MentionSticker, _super);
    function MentionSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayType = 'mention_username';
        _this.width = 0.64;
        _this.height = 0.125;
        return _this;
    }
    Object.defineProperty(MentionSticker.prototype, "id", {
        get: function () {
            return 'mention_sticker_vibrant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MentionSticker.prototype, "key", {
        get: function () {
            return 'reel_mentions';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MentionSticker.prototype, "additionalConfigureProperties", {
        get: function () {
            return this.displayType === 'mention_reshare' ? { reshared_media_id: this.mediaId } : null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        decorators_1.Enumerable(false)
    ], MentionSticker.prototype, "mediaId");
    return MentionSticker;
}(insta_sticker_1.InstaSticker));
exports.MentionSticker = MentionSticker;
