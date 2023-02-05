"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetFileName = exports.getPieceFileName = exports.getCellInfo = exports.CELLS = exports.shuriken = exports.shovel = exports.lone = exports.full = exports.corner = exports.bar = exports.PieceInfo = exports.CellInfo = void 0;
var definitions_1 = require("./definitions");
var cellsPath = function (cell) { return "assets/cells/".concat(cell, ".svg"); };
var piecesPath = function (piece) { return "assets/pieces/".concat(piece, ".svg"); };
var targetsPath = function (piece) { return "assets/targets/".concat(piece, ".svg"); };
var CellInfo = /** @class */ (function () {
    function CellInfo() {
    }
    return CellInfo;
}());
exports.CellInfo = CellInfo;
var PieceInfo = /** @class */ (function () {
    function PieceInfo() {
    }
    return PieceInfo;
}());
exports.PieceInfo = PieceInfo;
exports.bar = {
    fileName: cellsPath('bar'),
    initialOpenings: definitions_1.Openings.TOP | definitions_1.Openings.BOTTOM,
};
exports.corner = {
    fileName: cellsPath('corner'),
    initialOpenings: definitions_1.Openings.TOP | definitions_1.Openings.RIGHT,
};
exports.full = {
    fileName: cellsPath('full'),
    initialOpenings: definitions_1.Openings.NONE,
};
exports.lone = {
    fileName: cellsPath('lone'),
    initialOpenings: definitions_1.Openings.TOP,
};
exports.shovel = {
    fileName: cellsPath('shovel'),
    initialOpenings: definitions_1.Openings.TOP | definitions_1.Openings.RIGHT | definitions_1.Openings.BOTTOM,
};
exports.shuriken = {
    fileName: cellsPath('shuriken'),
    initialOpenings: definitions_1.Openings.TOP | definitions_1.Openings.RIGHT | definitions_1.Openings.BOTTOM | definitions_1.Openings.LEFT,
};
exports.CELLS = [exports.bar, exports.corner, exports.full, exports.lone, exports.shovel, exports.shuriken];
function getCellInfo(openings) {
    var rotations = [0, 90, 180, 270];
    for (var _i = 0, rotations_1 = rotations; _i < rotations_1.length; _i++) {
        var rotation = rotations_1[_i];
        for (var _a = 0, CELLS_1 = exports.CELLS; _a < CELLS_1.length; _a++) {
            var cell = CELLS_1[_a];
            if (openings === (0, definitions_1.rotateOpeningsClockwise)(cell.initialOpenings, rotation / 90)) {
                return __assign(__assign({}, cell), { rotation: rotation });
            }
        }
    }
}
exports.getCellInfo = getCellInfo;
function getPieceFileName(piece) {
    return piecesPath(piece);
}
exports.getPieceFileName = getPieceFileName;
function getTargetFileName(target) {
    return targetsPath(target);
}
exports.getTargetFileName = getTargetFileName;
//# sourceMappingURL=svgs.js.map