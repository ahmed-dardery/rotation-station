"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRotation = exports.rotateOpeningsAntiClockwise = exports.rotateOpeningsClockwise = exports.Corners = exports.Colors = exports.Openings = void 0;
var Openings;
(function (Openings) {
    Openings[Openings["NONE"] = 0] = "NONE";
    Openings[Openings["BOTTOM"] = 1] = "BOTTOM";
    Openings[Openings["RIGHT"] = 2] = "RIGHT";
    Openings[Openings["TOP"] = 4] = "TOP";
    Openings[Openings["LEFT"] = 8] = "LEFT";
})(Openings = exports.Openings || (exports.Openings = {}));
var Colors;
(function (Colors) {
    Colors["blue"] = "blue";
    Colors["cyan"] = "cyan";
    Colors["green"] = "green";
    Colors["red"] = "red";
    Colors["violet"] = "violet";
    Colors["yellow"] = "yellow";
})(Colors = exports.Colors || (exports.Colors = {}));
var Corners;
(function (Corners) {
    Corners[Corners["TOP_LEFT"] = 12] = "TOP_LEFT";
    Corners[Corners["TOP_RIGHT"] = 6] = "TOP_RIGHT";
    Corners[Corners["BOTTOM_LEFT"] = 9] = "BOTTOM_LEFT";
    Corners[Corners["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
})(Corners = exports.Corners || (exports.Corners = {}));
function rotateOpeningsClockwise(openings, n) {
    if (n === void 0) { n = 1; }
    return ((openings << (4 - n)) | (openings >> n)) & 15;
}
exports.rotateOpeningsClockwise = rotateOpeningsClockwise;
function rotateOpeningsAntiClockwise(openings, n) {
    if (n === void 0) { n = 1; }
    return ((openings >> (4 - n)) | (openings << n)) & 15;
}
exports.rotateOpeningsAntiClockwise = rotateOpeningsAntiClockwise;
/** Assumes Left is 0, returns clockwise angle. */
function getRotation(opening) {
    switch (opening) {
        case Openings.LEFT:
            return 0;
        case Openings.TOP:
            return 90;
        case Openings.RIGHT:
            return 180;
        case Openings.BOTTOM:
            return 270;
        default:
            throw new Error("Unexpected opening argument: ".concat(opening, "."));
    }
}
exports.getRotation = getRotation;
//# sourceMappingURL=definitions.js.map