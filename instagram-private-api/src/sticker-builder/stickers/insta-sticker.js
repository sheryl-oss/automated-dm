"use strict";
exports.__esModule = true;
var snakeCaseKeys = require("snakecase-keys");
var class_transformer_1 = require("class-transformer");
var InstaSticker = /** @class */ (function () {
    function InstaSticker() {
        this.rotation = 0.0;
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0;
        this.isSticker = true;
    }
    Object.defineProperty(InstaSticker.prototype, "additionalConfigureProperties", {
        /**
         * Only used to set the media id when attaching media
         */
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    InstaSticker.prototype.center = function () {
        this.x = 0.5;
        this.y = 0.5;
        return this;
    };
    InstaSticker.prototype.rotateDeg = function (deg) {
        this.rotation = deg % 360.0;
        return this;
    };
    InstaSticker.prototype.scale = function (factor) {
        this.width *= factor;
        this.height *= factor;
        return this;
    };
    InstaSticker.prototype.moveForward = function (layers) {
        if (layers === void 0) { layers = 1; }
        this.z += layers;
        return this;
    };
    InstaSticker.prototype.moveBackwards = function (layers) {
        if (layers === void 0) { layers = 1; }
        return this.moveForward(-layers);
    };
    InstaSticker.prototype.right = function () {
        this.x = 1.0 - this.width / 2;
        return this;
    };
    InstaSticker.prototype.left = function () {
        this.x = this.width / 2;
        return this;
    };
    InstaSticker.prototype.top = function () {
        this.y = this.height / 2;
        return this;
    };
    InstaSticker.prototype.bottom = function () {
        this.y = 1.0 - this.height / 2;
        return this;
    };
    InstaSticker.prototype.toJSON = function () {
        // @ts-ignore
        return snakeCaseKeys(class_transformer_1.classToPlain(this), { deep: true });
    };
    return InstaSticker;
}());
exports.InstaSticker = InstaSticker;
