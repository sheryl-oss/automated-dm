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
var entity_1 = require("../core/entity");
var LiveEntity = /** @class */ (function (_super) {
    __extends(LiveEntity, _super);
    function LiveEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LiveEntity.getUrlAndKey = function (info) {
        var parts = info.upload_url.split(new RegExp(info.broadcast_id));
        return { stream_url: parts[0], stream_key: info.broadcast_id + parts[1] };
    };
    return LiveEntity;
}(entity_1.Entity));
exports.LiveEntity = LiveEntity;
