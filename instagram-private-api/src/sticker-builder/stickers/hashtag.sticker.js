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
exports.__esModule = true;
var insta_sticker_1 = require("./insta-sticker");
var HashtagSticker = /** @class */ (function (_super) {
    __extends(HashtagSticker, _super);
    function HashtagSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 0.47;
        _this.height = 0.11;
        return _this;
    }
    Object.defineProperty(HashtagSticker.prototype, "id", {
        get: function () {
            return 'hashtag_sticker_vibrant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashtagSticker.prototype, "key", {
        get: function () {
            return 'story_hashtags';
        },
        enumerable: true,
        configurable: true
    });
    return HashtagSticker;
}(insta_sticker_1.InstaSticker));
exports.HashtagSticker = HashtagSticker;
