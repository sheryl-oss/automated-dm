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
var QuizSticker = /** @class */ (function (_super) {
    __extends(QuizSticker, _super);
    function QuizSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textColor = '#ffffff';
        _this.startBackgroundColor = '#262626';
        _this.endBackgroundColor = '#262626';
        _this.viewerCanAnswer = false;
        _this.viewerAnswer = -1;
        _this.width = 0.7291667;
        _this.height = 0.11824318 + 2 * 0.10304056;
        return _this;
    }
    Object.defineProperty(QuizSticker.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            var options;
            if ((function (x) { return typeof x[0] === 'string'; })(value)) {
                options = value.map(function (o) { return ({ text: o, count: 0 }); });
            }
            else {
                options = value;
            }
            this._options = options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizSticker.prototype, "id", {
        get: function () {
            return 'quiz_story_sticker_default';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizSticker.prototype, "key", {
        get: function () {
            return 'story_quizs';
        },
        enumerable: true,
        configurable: true
    });
    return QuizSticker;
}(insta_sticker_1.InstaSticker));
exports.QuizSticker = QuizSticker;
