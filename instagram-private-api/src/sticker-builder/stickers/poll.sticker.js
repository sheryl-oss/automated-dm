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
exports.__esModule = true;
var insta_sticker_1 = require("./insta-sticker");
var PollSticker = /** @class */ (function (_super) {
    __extends(PollSticker, _super);
    function PollSticker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finished = false;
        _this.viewerVote = 0;
        _this.viewerCanVote = true;
        _this.isSharedResult = false;
        _this.width = 0.49934897;
        _this.height = 0.1266892;
        return _this;
    }
    Object.defineProperty(PollSticker.prototype, "tallies", {
        get: function () {
            return this._tallies;
        },
        set: function (value) {
            this._tallies = value.map(function (t) { return (__assign({ fontSize: 28.0 }, t)); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PollSticker.prototype, "id", {
        get: function () {
            return 'polling_sticker_vibrant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PollSticker.prototype, "key", {
        get: function () {
            return 'story_polls';
        },
        enumerable: true,
        configurable: true
    });
    return PollSticker;
}(insta_sticker_1.InstaSticker));
exports.PollSticker = PollSticker;
