"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetElement = void 0;
var svgs_1 = require("../svgs");
var definitions_1 = require("../definitions");
var TargetElement = /** @class */ (function () {
    function TargetElement(target, scaling, offset) {
        this.target = target;
        this.offset = offset;
        this.el = document.createElement('img');
        this.el.setAttribute('draggable', 'false');
        this.el.setAttribute('src', (0, svgs_1.getTargetFileName)(target.color));
        this.el.setAttribute('class', 'target');
        this.el.style.width = "".concat(scaling * 100, "%");
        this.rotation = (0, definitions_1.getRotation)(target.direction);
        this.el.style.transform = "rotate(".concat(this.rotation, "deg)");
        this.setPosition(target.location, target.direction);
    }
    TargetElement.prototype.setPosition = function (loc, direction) {
        switch (direction) {
            case definitions_1.Openings.LEFT:
                this.el.style.top = "".concat(loc * this.offset * 100, "%");
                this.el.style.left = "-20%";
                this.el.style.right = this.el.style.bottom = undefined;
                break;
            case definitions_1.Openings.BOTTOM:
                this.el.style.left = "".concat(loc * this.offset * 100, "%");
                this.el.style.bottom = "-20%";
                this.el.style.right = this.el.style.top = undefined;
                break;
            case definitions_1.Openings.RIGHT:
                this.el.style.top = "".concat(loc * this.offset * 100, "%");
                this.el.style.right = "-20%";
                this.el.style.left = this.el.style.bottom = undefined;
                break;
            case definitions_1.Openings.TOP:
                this.el.style.left = "".concat(loc * this.offset * 100, "%");
                this.el.style.top = "-20%";
                this.el.style.right = this.el.style.bottom = undefined;
                break;
            default:
                throw new Error("Unexpected direction: ".concat(direction));
        }
    };
    return TargetElement;
}());
exports.TargetElement = TargetElement;
//# sourceMappingURL=target_element.js.map