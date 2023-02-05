"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellElement = void 0;
var definitions_1 = require("../definitions");
var svgs_1 = require("../svgs");
var animation_1 = require("./animation");
var CellElement = /** @class */ (function () {
    function CellElement(openings, scaling, margin) {
        this.openings = openings;
        var cellInfo = (0, svgs_1.getCellInfo)(openings);
        this.rotation = cellInfo.rotation;
        this.el = document.createElement('img');
        this.el.setAttribute('draggable', 'false');
        this.el.style.transform = "rotate(".concat(cellInfo.rotation, "deg)");
        this.el.setAttribute('src', cellInfo.fileName);
        this.adjust("".concat(scaling * 100, "%"), "".concat(margin * 100, "%"));
    }
    CellElement.prototype.deleteElement = function () {
        this.el.remove();
    };
    CellElement.prototype.rotateClockwise = function () {
        (0, animation_1.animateRotate)(this.el, this.rotation, this.rotation + 90);
        this.rotation = (this.rotation + 90) % 360;
        this.openings = (0, definitions_1.rotateOpeningsClockwise)(this.openings);
    };
    CellElement.prototype.rotateAntiClockwise = function () {
        (0, animation_1.animateRotate)(this.el, this.rotation, this.rotation - 90);
        this.rotation = (this.rotation + 360 - 90) % 360;
        this.openings = (0, definitions_1.rotateOpeningsAntiClockwise)(this.openings);
    };
    CellElement.prototype.failRotateClockwise = function () {
        (0, animation_1.animateFailure)(this.el, this.rotation, true);
    };
    CellElement.prototype.failRotateAntiClockwise = function () {
        (0, animation_1.animateFailure)(this.el, this.rotation, false);
    };
    CellElement.prototype.adjust = function (edge, margin) {
        this.el.style.width = edge;
        this.el.style.marginRight = margin;
        this.el.style.marginBottom = margin;
    };
    return CellElement;
}());
exports.CellElement = CellElement;
//# sourceMappingURL=cell_element.js.map