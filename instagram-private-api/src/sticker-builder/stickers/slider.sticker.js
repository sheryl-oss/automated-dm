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
var SliderSticker = /** @class */ (function (_super) {
    __extends(SliderSticker, _super);
    function SliderSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backgroundColor = '#ffffff';
        _this.textColor = '#000000';
        _this.viewerCanVote = false;
        _this.sliderVoteCount = 0;
        _this.viewerVote = -1.0;
        _this.sliderVoteAverage = 0.0;
        _this.width = 0.7291667;
        _this.height = 0.22212838;
        return _this;
    }
    Object.defineProperty(SliderSticker.prototype, "id", {
        get: function () {
            return "emoji_slider_" + this.emoji;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderSticker.prototype, "key", {
        get: function () {
            return 'story_sliders';
        },
        enumerable: true,
        configurable: true
    });
    return SliderSticker;
}(insta_sticker_1.InstaSticker));
exports.SliderSticker = SliderSticker;
