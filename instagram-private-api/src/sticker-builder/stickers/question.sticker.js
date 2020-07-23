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
var QuestionSticker = /** @class */ (function (_super) {
    __extends(QuestionSticker, _super);
    function QuestionSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backgroundColor = '#ffffff';
        _this.textColor = '#000000';
        _this.profilePicUrl = '';
        _this.questionType = 'text';
        _this.viewerCanInteract = false;
        _this.width = 0.7291667;
        _this.height = 0.28716215;
        return _this;
    }
    Object.defineProperty(QuestionSticker.prototype, "id", {
        get: function () {
            return 'question_sticker_ama';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionSticker.prototype, "key", {
        get: function () {
            return 'story_questions';
        },
        enumerable: true,
        configurable: true
    });
    return QuestionSticker;
}(insta_sticker_1.InstaSticker));
exports.QuestionSticker = QuestionSticker;
