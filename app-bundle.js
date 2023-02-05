/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../\u0000#Web/rotation-station/src/definitions.ts":
/*!*******************************************************!*\
  !*** ../../ #Web/rotation-station/src/definitions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/dom/animation.ts":
/*!*********************************************************!*\
  !*** ../../ #Web/rotation-station/src/dom/animation.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.animateFailure = exports.animateRotate = void 0;
function animateRotate(element, start, end) {
    var angle = start;
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    var diff = start < end ? 5 : -5;
    element.rotationID = window.setInterval(function () {
        angle += diff;
        if (diff > 0 && angle >= end || diff < 0 && angle <= end) {
            angle = end;
            window.clearInterval(element.rotationID);
        }
        element.style.transform = "rotate(".concat(angle, "deg)");
    }, 10);
}
exports.animateRotate = animateRotate;
function animateFailure(element, angle, clockwise) {
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    var diff = clockwise ? 2 : -2;
    var total = 0;
    var times = 0;
    var myAngle = angle;
    var totalTimes = 3;
    var max = 3;
    element.rotationID = window.setInterval(function () {
        myAngle += diff;
        total += diff;
        element.style.transform = "rotate(".concat(myAngle, "deg)");
        if (Math.abs(total) > max) {
            diff *= -1;
            ++times;
        }
        if (times >= totalTimes && myAngle === angle) {
            window.clearInterval(element.rotationID);
        }
    }, 10);
}
exports.animateFailure = animateFailure;


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/dom/cell_element.ts":
/*!************************************************************!*\
  !*** ../../ #Web/rotation-station/src/dom/cell_element.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CellElement = void 0;
var definitions_1 = __webpack_require__(/*! ../definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
var svgs_1 = __webpack_require__(/*! ../svgs */ "../../\u0000#Web/rotation-station/src/svgs.ts");
var animation_1 = __webpack_require__(/*! ./animation */ "../../\u0000#Web/rotation-station/src/dom/animation.ts");
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


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/dom/piece_element.ts":
/*!*************************************************************!*\
  !*** ../../ #Web/rotation-station/src/dom/piece_element.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PieceElement = void 0;
var definitions_1 = __webpack_require__(/*! ../definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
var animation_1 = __webpack_require__(/*! ./animation */ "../../\u0000#Web/rotation-station/src/dom/animation.ts");
var svgs_1 = __webpack_require__(/*! ../svgs */ "../../\u0000#Web/rotation-station/src/svgs.ts");
var PieceElement = /** @class */ (function () {
    function PieceElement(piece, scaling, offset, moveAttemptCallback) {
        var _this = this;
        this.piece = piece;
        this.offset = offset;
        this.moveAttemptCallback = moveAttemptCallback;
        this.el = document.createElement('img');
        this.el.setAttribute('draggable', 'false');
        this.el.setAttribute('src', (0, svgs_1.getPieceFileName)(piece.color));
        this.el.style.width = "".concat(scaling * 100, "%");
        this.rotation = (0, definitions_1.getRotation)(piece.direction);
        this.el.style.transform = "rotate(".concat(this.rotation, "deg)");
        this.setPosition.apply(this, piece.location);
        this.el.addEventListener('mousedown', function (event) {
            _this.mouseDown = [event.x, event.y];
        });
    }
    PieceElement.prototype.onMouseUp = function (event) {
        if (this.mouseDown == null) {
            return;
        }
        var _a = this.mouseDown, x = _a[0], y = _a[1];
        this.mouseDown = null;
        var corner = 0;
        if (event.x > x) {
            corner |= definitions_1.Openings.RIGHT;
        }
        else {
            corner |= definitions_1.Openings.LEFT;
        }
        if (event.y > y) {
            corner |= definitions_1.Openings.BOTTOM;
        }
        else {
            corner |= definitions_1.Openings.TOP;
        }
        if (this.piece.direction & corner) {
            this.switchAttachment();
        }
        var clockwise = ((0, definitions_1.rotateOpeningsClockwise)(this.piece.direction) & corner) !== 0;
        this.moveAttemptCallback(this.piece.location, clockwise);
    };
    PieceElement.prototype.deleteElement = function () {
        this.el.remove();
    };
    PieceElement.prototype.rotateClockwise = function () {
        (0, animation_1.animateRotate)(this.el, this.rotation, this.rotation + 90);
        this.rotation = (this.rotation + 90) % 360;
        this.piece.direction = (0, definitions_1.rotateOpeningsClockwise)(this.piece.direction);
    };
    PieceElement.prototype.rotateAntiClockwise = function () {
        (0, animation_1.animateRotate)(this.el, this.rotation, this.rotation - 90);
        this.rotation = (this.rotation + 360 - 90) % 360;
        this.piece.direction = (0, definitions_1.rotateOpeningsAntiClockwise)(this.piece.direction);
    };
    PieceElement.prototype.failRotateClockwise = function () {
        (0, animation_1.animateFailure)(this.el, this.rotation, true);
    };
    PieceElement.prototype.failRotateAntiClockwise = function () {
        (0, animation_1.animateFailure)(this.el, this.rotation, false);
    };
    PieceElement.prototype.isLocatedAt = function (location) {
        var areEqual = function (a, b) { return a[0] === b[0] && a[1] === b[1]; };
        if (areEqual(location, this.piece.location)) {
            return true;
        }
        if (areEqual(location, this.getPotentialLocation())) {
            this.switchAttachment();
            return true;
        }
    };
    PieceElement.prototype.getPotentialLocation = function () {
        var back = [definitions_1.Openings.TOP, definitions_1.Openings.LEFT].includes(this.piece.direction);
        var vertical = [definitions_1.Openings.TOP, definitions_1.Openings.BOTTOM].includes(this.piece.direction);
        var loc = [this.piece.location[0], this.piece.location[1]];
        loc[vertical ? 0 : 1] += back ? -1 : 1;
        return loc;
    };
    PieceElement.prototype.switchAttachment = function () {
        this.piece.location = this.getPotentialLocation();
        this.piece.direction = (0, definitions_1.rotateOpeningsClockwise)(this.piece.direction, 2);
        this.rotation = (this.rotation + 180) % 360;
        this.el.style.transform = "rotate(".concat(this.rotation, "deg)");
        this.setPosition.apply(this, this.piece.location);
    };
    PieceElement.prototype.setPosition = function (x, y) {
        this.el.style.top = "".concat(x * this.offset * 100, "%");
        this.el.style.left = "".concat(y * this.offset * 100, "%");
    };
    return PieceElement;
}());
exports.PieceElement = PieceElement;


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/game_area.ts":
/*!*****************************************************!*\
  !*** ../../ #Web/rotation-station/src/game_area.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameArea = void 0;
var cell_element_1 = __webpack_require__(/*! ./dom/cell_element */ "../../\u0000#Web/rotation-station/src/dom/cell_element.ts");
var definitions_1 = __webpack_require__(/*! ./definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
var piece_element_1 = __webpack_require__(/*! ./dom/piece_element */ "../../\u0000#Web/rotation-station/src/dom/piece_element.ts");
var GameArea = /** @class */ (function () {
    function GameArea() {
        var _this = this;
        this.cellsEl = document.querySelector('game-area > cells');
        this.piecesEl = document.querySelector('game-area > pieces');
        this.overlayEl = document.querySelector('game-area > layout');
        this.cells = [];
        this.pieces = [];
        this.attemptToMove = function (location, clockwise) {
            var i = location[0], j = location[1];
            if (_this.canRotate(i, j)) {
                clockwise ? _this.cells[i][j].rotateClockwise() : _this.cells[i][j].rotateAntiClockwise();
                _this.pieces.filter(function (piece) { return piece.isLocatedAt(location); }).forEach(function (pieceEl) {
                    clockwise ? pieceEl.rotateClockwise() : pieceEl.rotateAntiClockwise();
                });
            }
            else {
                clockwise ? _this.cells[i][j].failRotateClockwise() : _this.cells[i][j].failRotateAntiClockwise();
                _this.pieces.filter(function (piece) { return piece.isLocatedAt(location); }).forEach(function (pieceEl) {
                    clockwise ? pieceEl.failRotateClockwise() : pieceEl.failRotateAntiClockwise();
                });
            }
        };
    }
    GameArea.prototype.initialize = function (level) {
        var _this = this;
        this.clearBoard();
        var n = level.cells.length;
        var m = level.cells[0].length;
        // TODO: assumes n is same as m, and shape is perfect square.
        var scaling = 2 / (2 + (n - 1) * Math.sqrt(2));
        var margin = -(scaling * n - 1) / (n - 1);
        var i = 0, j = 0;
        for (var _i = 0, _a = level.cells; _i < _a.length; _i++) {
            var row = _a[_i];
            var curRow = [];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var cell = row_1[_b];
                var cur = new cell_element_1.CellElement(cell, scaling, margin);
                curRow.push(cur);
                this.cellsEl.appendChild(cur.el);
                ++j;
            }
            this.cells.push(curRow);
            j = 0;
            ++i;
        }
        for (var _c = 0, _d = level.pieces; _c < _d.length; _c++) {
            var piece = _d[_c];
            var cur = new piece_element_1.PieceElement(piece, scaling, scaling + margin, this.attemptToMove);
            this.piecesEl.appendChild(cur.el);
            this.pieces.push(cur);
        }
        this.piecesEl.addEventListener('mouseup', function (event) {
            for (var _i = 0, _a = _this.pieces; _i < _a.length; _i++) {
                var piece = _a[_i];
                piece.onMouseUp(event);
            }
        });
    };
    GameArea.prototype.canRotate = function (i, j) {
        if (i > 0 && !(this.cells[i - 1][j].openings & definitions_1.Openings.BOTTOM))
            return false;
        if (i < this.cells.length - 1 && !(this.cells[i + 1][j].openings & definitions_1.Openings.TOP))
            return false;
        if (j > 0 && !(this.cells[i][j - 1].openings & definitions_1.Openings.RIGHT))
            return false;
        if (j < this.cells[i].length - 1 && !(this.cells[i][j + 1].openings & definitions_1.Openings.LEFT))
            return false;
        return true;
    };
    GameArea.prototype.clearBoard = function () {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_2 = row; _b < row_2.length; _b++) {
                var cell = row_2[_b];
                cell.deleteElement();
            }
        }
        for (var _c = 0, _d = this.pieces; _c < _d.length; _c++) {
            var piece = _d[_c];
            piece.deleteElement();
        }
    };
    GameArea.getInstance = function () {
        return new GameArea();
    };
    return GameArea;
}());
exports.GameArea = GameArea;


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/levels.ts":
/*!**************************************************!*\
  !*** ../../ #Web/rotation-station/src/levels.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LEVELS = exports.constructLevel = void 0;
var definitions_1 = __webpack_require__(/*! ./definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
function constructLevel(code) {
    var _a = code.split('|'), cells = _a[0], pieces = _a[1], targets = _a[2];
    var level = {
        cells: [],
        pieces: [],
        targets: [],
    };
    var toOpening = function (s) {
        var opening = definitions_1.Openings.NONE;
        if (s.includes('r'))
            opening |= definitions_1.Openings.RIGHT;
        if (s.includes('b'))
            opening |= definitions_1.Openings.BOTTOM;
        if (s.includes('t'))
            opening |= definitions_1.Openings.TOP;
        if (s.includes('l'))
            opening |= definitions_1.Openings.LEFT;
        return opening;
    };
    for (var _i = 0, _b = cells.split(';'); _i < _b.length; _i++) {
        var row = _b[_i];
        var curRow = [];
        for (var _c = 0, _d = row.split(','); _c < _d.length; _c++) {
            var cell = _d[_c];
            curRow.push(toOpening(cell));
        }
        level.cells.push(curRow);
    }
    var i = 0;
    for (var _e = 0, _f = pieces.split(';'); _e < _f.length; _e++) {
        var piece = _f[_e];
        var _g = piece.split(','), o = _g[0], x = _g[1], y = _g[2];
        level.pieces.push({
            direction: toOpening(o),
            location: [Number(x), Number(y)],
            color: Object.values(definitions_1.Colors)[i],
        });
        ++i;
    }
    i = 0;
    for (var _h = 0, _j = targets.split(';'); _h < _j.length; _h++) {
        var target = _j[_h];
        var _k = target.split(','), d = _k[0], l = _k[1];
        level.targets.push({
            direction: toOpening(d),
            location: Number(l),
            color: Object.values(definitions_1.Colors)[i],
        });
        ++i;
    }
    return level;
}
exports.constructLevel = constructLevel;
exports.LEVELS = [
    'rb,tb,lb;rb,lr,tb;rb,tr,lb|l,2,2|b,0',
    'tb,lr,tb;tr,tr,tl;tl,tl,tl|t,0,0;b,0,0;r,1,1;l,2,0|r,0;t,1;l,1;r,2',
];


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/svgs.ts":
/*!************************************************!*\
  !*** ../../ #Web/rotation-station/src/svgs.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPieceFileName = exports.getCellInfo = exports.CELLS = exports.shuriken = exports.shovel = exports.lone = exports.full = exports.corner = exports.bar = exports.PieceInfo = exports.CellInfo = void 0;
var definitions_1 = __webpack_require__(/*! ./definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
var cellsPath = function (cell) { return "assets/cells/".concat(cell, ".svg"); };
var piecesPath = function (piece) { return "assets/pieces/".concat(piece, ".svg"); };
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************************!*\
  !*** ../../ #Web/rotation-station/src/app.ts ***!
  \***********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var game_area_1 = __webpack_require__(/*! ./game_area */ "../../\u0000#Web/rotation-station/src/game_area.ts");
var levels_1 = __webpack_require__(/*! ./levels */ "../../\u0000#Web/rotation-station/src/levels.ts");
var gameArea = game_area_1.GameArea.getInstance();
gameArea.initialize((0, levels_1.constructLevel)(levels_1.LEVELS[1]));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2xCLHVDQUFRO0lBQ1IsMkNBQVU7SUFDVix5Q0FBUztJQUNULHFDQUFPO0lBQ1AsdUNBQVE7QUFDVixDQUFDLEVBTlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNbkI7QUFFRCxJQUFZLE1BT1g7QUFQRCxXQUFZLE1BQU07SUFDaEIsdUJBQWE7SUFDYix1QkFBYTtJQUNiLHlCQUFlO0lBQ2YscUJBQVc7SUFDWCwyQkFBaUI7SUFDakIsMkJBQWlCO0FBQ25CLENBQUMsRUFQVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFPakI7QUFJRCxJQUFZLE9BS1g7QUFMRCxXQUFZLE9BQU87SUFDakIsOENBQXVDO0lBQ3ZDLCtDQUF5QztJQUN6QyxtREFBNkM7SUFDN0MscURBQStDO0FBQ2pELENBQUMsRUFMVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFLbEI7QUFHRCxTQUFnQix1QkFBdUIsQ0FBQyxRQUFrQixFQUFFLENBQUs7SUFBTCx5QkFBSztJQUMvRCxPQUFPLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQU0sQ0FBQztBQUMxRCxDQUFDO0FBRkQsMERBRUM7QUFFRCxTQUFnQiwyQkFBMkIsQ0FBQyxRQUFrQixFQUFFLENBQUs7SUFBTCx5QkFBSztJQUNuRSxPQUFPLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQU0sQ0FBQztBQUMxRCxDQUFDO0FBRkQsa0VBRUM7QUFFRCxrREFBa0Q7QUFDbEQsU0FBZ0IsV0FBVyxDQUFDLE9BQWlCO0lBQzNDLFFBQU8sT0FBTyxFQUFDO1FBQ2IsS0FBSyxRQUFRLENBQUMsSUFBSTtZQUNoQixPQUFPLENBQUMsQ0FBQztRQUNYLEtBQUssUUFBUSxDQUFDLEdBQUc7WUFDZixPQUFPLEVBQUUsQ0FBQztRQUNaLEtBQUssUUFBUSxDQUFDLEtBQUs7WUFDakIsT0FBTyxHQUFHLENBQUM7UUFDYixLQUFLLFFBQVEsQ0FBQyxNQUFNO1lBQ2xCLE9BQU8sR0FBRyxDQUFDO1FBQ2I7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUFnQyxPQUFPLE1BQUcsQ0FBQyxDQUFDO0tBQy9EO0FBQ0gsQ0FBQztBQWJELGtDQWFDOzs7Ozs7Ozs7Ozs7OztBQ2pERCxTQUFnQixhQUFhLENBQUMsT0FBOEMsRUFBRSxLQUFhLEVBQUUsR0FBVztJQUN0RyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQyxPQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEMsS0FBSyxJQUFJLElBQUksQ0FBQztRQUVkLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUN4RCxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ1osTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxLQUFLLFNBQU07SUFDakQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVQsQ0FBQztBQWpCRCxzQ0FpQkM7QUFFRCxTQUFnQixjQUFjLENBQUMsT0FBOEMsRUFBRSxLQUFhLEVBQUUsU0FBa0I7SUFDOUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFDO0lBQ0QsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRWQsT0FBTyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDaEIsS0FBSyxJQUFJLElBQUksQ0FBQztRQUVkLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFVLE9BQU8sU0FBTTtRQUNqRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLEVBQUUsS0FBSyxDQUFDO1NBQ1Q7UUFFRCxJQUFJLEtBQUssSUFBSSxVQUFVLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUM7QUF6QkQsd0NBeUJDOzs7Ozs7Ozs7Ozs7OztBQzVDRCxzSEFBOEY7QUFDOUYsaUdBQW9DO0FBQ3BDLG1IQUEwRDtBQUUxRDtJQUlFLHFCQUFtQixRQUFrQixFQUFFLE9BQWUsRUFBRSxNQUFjO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkMsSUFBTSxRQUFRLEdBQUcsc0JBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQVUsUUFBUSxDQUFDLFFBQVEsU0FBTSxDQUFDO1FBRTVELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFHLE9BQU8sR0FBRyxHQUFHLE1BQUcsRUFBRSxVQUFHLE1BQU0sR0FBRyxHQUFHLE1BQUcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNFLDZCQUFhLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcseUNBQXVCLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx5Q0FBbUIsR0FBbkI7UUFDRSw2QkFBYSxFQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyw2Q0FBMkIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFtQixHQUFuQjtRQUNFLDhCQUFjLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw2Q0FBdUIsR0FBdkI7UUFDRSw4QkFBYyxFQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQVksRUFBRSxNQUFjO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBTTtJQUNyQyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDO0FBOUNZLGtDQUFXOzs7Ozs7Ozs7Ozs7OztBQ0p4QixzSEFBb0g7QUFDcEgsbUhBQTBEO0FBRTFELGlHQUF5QztBQUl6QztJQU1FLHNCQUFtQixLQUFZLEVBQUUsT0FBZSxFQUFVLE1BQWMsRUFBVSxtQkFBd0M7UUFBMUgsaUJBZ0JDO1FBaEJrQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQTJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hILElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLDJCQUFnQixFQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFHLE9BQU8sR0FBRyxHQUFHLE1BQUcsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxHQUFHLDZCQUFXLEVBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxJQUFJLENBQUMsUUFBUSxTQUFNLENBQUM7UUFFeEQsSUFBSSxDQUFDLFdBQVcsT0FBaEIsSUFBSSxFQUFnQixLQUFLLENBQUMsUUFBUSxFQUFFO1FBRXBDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBaUI7WUFDdEQsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBQztZQUN6QixPQUFPO1NBQ1I7UUFFSyxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQXRCLENBQUMsVUFBRSxDQUFDLFFBQWtCLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxNQUFNLEdBQVksQ0FBQyxDQUFDO1FBRXhCLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDZCxNQUFNLElBQUksc0JBQVEsQ0FBQyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNMLE1BQU0sSUFBSSxzQkFBUSxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUVELElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDZCxNQUFNLElBQUksc0JBQVEsQ0FBQyxNQUFNLENBQUM7U0FDM0I7YUFBTTtZQUNMLE1BQU0sSUFBSSxzQkFBUSxDQUFDLEdBQUcsQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBTSxTQUFTLEdBQUcsQ0FBQyx5Q0FBdUIsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG9DQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0UsNkJBQWEsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcseUNBQXVCLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsMENBQW1CLEdBQW5CO1FBQ0UsNkJBQWEsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLDZDQUEyQixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNFLDhCQUFjLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw4Q0FBdUIsR0FBdkI7UUFDRSw4QkFBYyxFQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLFFBQTBCO1FBQ3BDLElBQU0sUUFBUSxHQUFHLFVBQUMsQ0FBbUIsRUFBRSxDQUFtQixJQUFLLFFBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQztRQUU5RixJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQztZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEVBQUM7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTywyQ0FBb0IsR0FBNUI7UUFDRSxJQUFNLElBQUksR0FBRyxDQUFDLHNCQUFRLENBQUMsR0FBRyxFQUFFLHNCQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUUsSUFBTSxRQUFRLEdBQUcsQ0FBQyxzQkFBUSxDQUFDLEdBQUcsRUFBRSxzQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWhGLElBQU0sR0FBRyxHQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU8sdUNBQWdCLEdBQXhCO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcseUNBQXVCLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzVDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxJQUFJLENBQUMsUUFBUSxTQUFNLENBQUM7UUFFeEQsSUFBSSxDQUFDLFdBQVcsT0FBaEIsSUFBSSxFQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtJQUMzQyxDQUFDO0lBRU8sa0NBQVcsR0FBbkIsVUFBb0IsQ0FBUyxFQUFFLENBQVM7UUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxNQUFHLENBQUM7UUFDaEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxNQUFHLENBQUM7SUFDbkQsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQztBQW5IWSxvQ0FBWTs7Ozs7Ozs7Ozs7Ozs7QUNQekIsZ0lBQStDO0FBRS9DLHFIQUFnRDtBQUNoRCxtSUFBaUQ7QUFFakQ7SUFDRTtRQUFBLGlCQUNDO1FBRUQsWUFBTyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkUsYUFBUSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckUsY0FBUyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBRTdELFVBQUssR0FBb0IsRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBbUIsRUFBRSxDQUFDO1FBMkNwQyxrQkFBYSxHQUFHLFVBQUMsUUFBMEIsRUFBRSxTQUFrQjtZQUN0RCxLQUFDLEdBQU8sUUFBUSxHQUFmLEVBQUUsQ0FBQyxHQUFJLFFBQVEsR0FBWixDQUFhO1lBRXhCLElBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7Z0JBQ3RCLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUV4RixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN4RSxDQUFDLENBQUM7YUFDSDtpQkFBSztnQkFDSixTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUVoRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ2hGLENBQUMsQ0FBQzthQUNIO1FBQ0gsQ0FBQztJQWxFRCxDQUFDO0lBU0QsNkJBQVUsR0FBVixVQUFXLEtBQVk7UUFBdkIsaUJBdUNDO1FBdENDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVoQyw2REFBNkQ7UUFDN0QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFnQixVQUFXLEVBQVgsVUFBSyxDQUFDLEtBQUssRUFBWCxjQUFXLEVBQVgsSUFBVyxFQUFFO1lBQXhCLElBQUksR0FBRztZQUNWLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFpQixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRyxFQUFFO2dCQUFqQixJQUFJLElBQUk7Z0JBQ1gsSUFBTSxHQUFHLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFakMsRUFBRSxDQUFDLENBQUM7YUFDTDtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQztTQUNMO1FBR0QsS0FBaUIsVUFBWSxFQUFaLFVBQUssQ0FBQyxNQUFNLEVBQVosY0FBWSxFQUFaLElBQVksRUFBRTtZQUEzQixJQUFJLEtBQUs7WUFDWCxJQUFNLEdBQUcsR0FBRyxJQUFJLDRCQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVuRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7WUFDOUMsS0FBaUIsVUFBVyxFQUFYLFVBQUksQ0FBQyxNQUFNLEVBQVgsY0FBVyxFQUFYLElBQVcsRUFBQztnQkFBekIsSUFBSSxLQUFLO2dCQUNYLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFvQk8sNEJBQVMsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLENBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsc0JBQVEsQ0FBQyxNQUFNLENBQUM7WUFDM0QsT0FBTyxLQUFLLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxzQkFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1RSxPQUFPLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLHNCQUFRLENBQUMsS0FBSyxDQUFDO1lBQzFELE9BQU8sS0FBSyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsc0JBQVEsQ0FBQyxJQUFJLENBQUM7WUFDaEYsT0FBTyxLQUFLLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyw2QkFBVSxHQUFsQjtRQUNFLEtBQWdCLFVBQVUsRUFBVixTQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLEVBQUU7WUFBdkIsSUFBSSxHQUFHO1lBQ1YsS0FBaUIsVUFBRyxFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUcsRUFBRTtnQkFBakIsSUFBSSxJQUFJO2dCQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN0QjtTQUNGO1FBRUQsS0FBa0IsVUFBVyxFQUFYLFNBQUksQ0FBQyxNQUFNLEVBQVgsY0FBVyxFQUFYLElBQVcsRUFBRTtZQUExQixJQUFJLEtBQUs7WUFDWixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRU0sb0JBQVcsR0FBbEI7UUFDRSxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDO0FBbEdZLDRCQUFROzs7Ozs7Ozs7Ozs7OztBQ0xyQixxSEFBK0M7QUFvQi9DLFNBQWdCLGNBQWMsQ0FBQyxJQUFZO0lBQ25DLFNBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXpDLEtBQUssVUFBRSxNQUFNLFVBQUUsT0FBTyxRQUFtQixDQUFDO0lBRWpELElBQU0sS0FBSyxHQUFVO1FBQ25CLEtBQUssRUFBRSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEVBQUU7UUFDVixPQUFPLEVBQUUsRUFBRTtLQUNaO0lBRUQsSUFBTSxTQUFTLEdBQUcsVUFBQyxDQUFTO1FBQzFCLElBQUksT0FBTyxHQUFhLHNCQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksc0JBQVEsQ0FBQyxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxzQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLHNCQUFRLENBQUMsR0FBRyxDQUFDO1FBQzdDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksc0JBQVEsQ0FBQyxJQUFJLENBQUM7UUFFOUMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELEtBQWdCLFVBQWdCLEVBQWhCLFVBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCLEVBQUU7UUFBN0IsSUFBSSxHQUFHO1FBQ1YsSUFBTSxNQUFNLEdBQWUsRUFBRSxDQUFDO1FBQzlCLEtBQWlCLFVBQWMsRUFBZCxRQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFkLGNBQWMsRUFBZCxJQUFjLEVBQUU7WUFBNUIsSUFBSSxJQUFJO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVYsS0FBa0IsVUFBaUIsRUFBakIsV0FBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBakIsY0FBaUIsRUFBakIsSUFBaUIsRUFBRTtRQUFoQyxJQUFJLEtBQUs7UUFDTixTQUFZLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQTNCLENBQUMsVUFBRSxDQUFDLFVBQUUsQ0FBQyxRQUFvQixDQUFDO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQztLQUNMO0lBRUQsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNOLEtBQW1CLFVBQWtCLEVBQWxCLFlBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUU7UUFBbEMsSUFBSSxNQUFNO1FBQ1AsU0FBUyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF6QixDQUFDLFVBQUUsQ0FBQyxRQUFxQixDQUFDO1FBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEMsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDO0tBQ0w7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFyREQsd0NBcURDO0FBRVksY0FBTSxHQUFHO0lBQ3BCLHNDQUFzQztJQUN0QyxvRUFBb0U7Q0FDckU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RUQscUhBQWtGO0FBRWxGLElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBSSxJQUFLLDhCQUFnQixJQUFJLFNBQU0sRUFBMUIsQ0FBMEIsQ0FBQztBQUN2RCxJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQUssSUFBSywrQkFBaUIsS0FBSyxTQUFNLEVBQTVCLENBQTRCLENBQUM7QUFFM0Q7SUFBQTtJQUlBLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FBQztBQUpZLDRCQUFRO0FBTXJCO0lBQUE7SUFJQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDO0FBSlksOEJBQVM7QUFNVCxXQUFHLEdBQWE7SUFDM0IsUUFBUSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDMUIsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRyxHQUFHLHNCQUFRLENBQUMsTUFBTTtDQUNoRCxDQUFDO0FBRVcsY0FBTSxHQUFhO0lBQzlCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdCLGVBQWUsRUFBRSxzQkFBUSxDQUFDLEdBQUcsR0FBRyxzQkFBUSxDQUFDLEtBQUs7Q0FDL0MsQ0FBQztBQUVXLFlBQUksR0FBYTtJQUM1QixRQUFRLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUMzQixlQUFlLEVBQUUsc0JBQVEsQ0FBQyxJQUFJO0NBQy9CLENBQUM7QUFFVyxZQUFJLEdBQWE7SUFDNUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDM0IsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRztDQUM5QixDQUFDO0FBRVcsY0FBTSxHQUFhO0lBQzlCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdCLGVBQWUsRUFBRSxzQkFBUSxDQUFDLEdBQUcsR0FBRyxzQkFBUSxDQUFDLEtBQUssR0FBRyxzQkFBUSxDQUFDLE1BQU07Q0FDakUsQ0FBQztBQUVXLGdCQUFRLEdBQWE7SUFDaEMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDL0IsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRyxHQUFHLHNCQUFRLENBQUMsS0FBSyxHQUFHLHNCQUFRLENBQUMsTUFBTSxHQUFHLHNCQUFRLENBQUMsSUFBSTtDQUNqRixDQUFDO0FBRVcsYUFBSyxHQUFHLENBQUMsV0FBRyxFQUFFLGNBQU0sRUFBRSxZQUFJLEVBQUUsWUFBSSxFQUFFLGNBQU0sRUFBRSxnQkFBUSxDQUFDLENBQUM7QUFFakUsU0FBZ0IsV0FBVyxDQUFDLFFBQWtCO0lBQzVDLElBQU0sU0FBUyxHQUFlLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFaEQsS0FBb0IsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTLEVBQUM7UUFBMUIsSUFBSSxRQUFRO1FBQ2QsS0FBZ0IsVUFBSyxFQUFMLHVCQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQUM7WUFBbEIsSUFBSSxJQUFJO1lBQ1YsSUFBSSxRQUFRLEtBQUsseUNBQXVCLEVBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUM7Z0JBQzVFLDZCQUNLLElBQUksS0FDUCxRQUFRLEVBQUUsUUFBUSxJQUNuQjthQUNGO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUFiRCxrQ0FhQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEtBQWE7SUFDNUMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUZELDRDQUVDOzs7Ozs7O1VDbEVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSwrR0FBcUM7QUFDckMsc0dBQWdEO0FBRWhELElBQU0sUUFBUSxHQUFHLG9CQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFeEMsUUFBUSxDQUFDLFVBQVUsQ0FBQywyQkFBYyxFQUFDLGVBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZGVmaW5pdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RvbS9hbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RvbS9jZWxsX2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RvbS9waWVjZV9lbGVtZW50LnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9nYW1lX2FyZWEudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvc3Zncy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gT3BlbmluZ3Mge1xyXG4gIE5PTkUgPSAwLFxyXG4gIEJPVFRPTSA9IDEsXHJcbiAgUklHSFQgPSAyLFxyXG4gIFRPUCA9IDQsXHJcbiAgTEVGVCA9IDgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbG9ycyB7XHJcbiAgYmx1ZSA9ICdibHVlJyxcclxuICBjeWFuID0gJ2N5YW4nLFxyXG4gIGdyZWVuID0gJ2dyZWVuJyxcclxuICByZWQgPSAncmVkJyxcclxuICB2aW9sZXQgPSAndmlvbGV0JyxcclxuICB5ZWxsb3cgPSAneWVsbG93JyxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUm90YXRpb24gPSAwfDkwfDE4MHwyNzA7XHJcblxyXG5leHBvcnQgZW51bSBDb3JuZXJzIHtcclxuICBUT1BfTEVGVCA9IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLkxFRlQsXHJcbiAgVE9QX1JJR0hUID0gT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQsXHJcbiAgQk9UVE9NX0xFRlQgPSBPcGVuaW5ncy5CT1RUT00gfCBPcGVuaW5ncy5MRUZULFxyXG4gIEJPVFRPTV9SSUdIVCA9IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLlJJR0hULFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKG9wZW5pbmdzOiBPcGVuaW5ncywgbiA9IDEpOiBPcGVuaW5ncyB7XHJcbiAgcmV0dXJuICgob3BlbmluZ3MgPDwgKDQtbikpIHwgKG9wZW5pbmdzID4+IG4pKSAmIDBiMTExMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZShvcGVuaW5nczogT3BlbmluZ3MsIG4gPSAxKTogT3BlbmluZ3Mge1xyXG4gIHJldHVybiAoKG9wZW5pbmdzID4+ICg0LW4pKSB8IChvcGVuaW5ncyA8PCBuKSkgJiAwYjExMTE7XHJcbn1cclxuXHJcbi8qKiBBc3N1bWVzIExlZnQgaXMgMCwgcmV0dXJucyBjbG9ja3dpc2UgYW5nbGUuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGlvbihvcGVuaW5nOiBPcGVuaW5ncyk6IFJvdGF0aW9uIHtcclxuICBzd2l0Y2gob3BlbmluZyl7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkxFRlQ6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSBPcGVuaW5ncy5UT1A6XHJcbiAgICAgIHJldHVybiA5MDtcclxuICAgIGNhc2UgT3BlbmluZ3MuUklHSFQ6XHJcbiAgICAgIHJldHVybiAxODA7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkJPVFRPTTpcclxuICAgICAgcmV0dXJuIDI3MDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVuaW5nIGFyZ3VtZW50OiAke29wZW5pbmd9LmApO1xyXG4gIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBhbmltYXRlUm90YXRlKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgeyByb3RhdGlvbklEPzogbnVtYmVyIH0sIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgbGV0IGFuZ2xlID0gc3RhcnQ7XHJcbiAgaWYgKGVsZW1lbnQucm90YXRpb25JRCkge1xyXG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwoZWxlbWVudC5yb3RhdGlvbklEKTtcclxuICB9XHJcbiAgY29uc3QgZGlmZiA9IHN0YXJ0IDwgZW5kID8gNSA6IC01O1xyXG5cclxuICBlbGVtZW50LnJvdGF0aW9uSUQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYW5nbGUgKz0gZGlmZjtcclxuXHJcbiAgICBpZiAoZGlmZiA+IDAgJiYgYW5nbGUgPj0gZW5kIHx8IGRpZmYgPCAwICYmIGFuZ2xlIDw9IGVuZCkge1xyXG4gICAgICBhbmdsZSA9IGVuZDtcclxuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoZWxlbWVudC5yb3RhdGlvbklEKTtcclxuICAgIH1cclxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2FuZ2xlfWRlZylgXHJcbiAgfSwgMTApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVGYWlsdXJlKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgeyByb3RhdGlvbklEPzogbnVtYmVyIH0sIGFuZ2xlOiBudW1iZXIsIGNsb2Nrd2lzZTogYm9vbGVhbikge1xyXG4gIGlmIChlbGVtZW50LnJvdGF0aW9uSUQpIHtcclxuICAgIHdpbmRvdy5jbGVhckludGVydmFsKGVsZW1lbnQucm90YXRpb25JRCk7XHJcbiAgfVxyXG4gIGxldCBkaWZmID0gY2xvY2t3aXNlID8gMiA6IC0yO1xyXG4gIGxldCB0b3RhbCA9IDA7XHJcbiAgbGV0IHRpbWVzID0gMDtcclxuICBsZXQgbXlBbmdsZSA9IGFuZ2xlO1xyXG4gIGNvbnN0IHRvdGFsVGltZXMgPSAzO1xyXG4gIGNvbnN0IG1heCA9IDM7XHJcblxyXG4gIGVsZW1lbnQucm90YXRpb25JRCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBteUFuZ2xlICs9IGRpZmY7XHJcbiAgICB0b3RhbCArPSBkaWZmO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke215QW5nbGV9ZGVnKWBcclxuICAgIGlmIChNYXRoLmFicyh0b3RhbCkgPiBtYXgpIHtcclxuICAgICAgZGlmZiAqPSAtMTtcclxuICAgICAgKyt0aW1lcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGltZXMgPj0gdG90YWxUaW1lcyAmJiBteUFuZ2xlID09PSBhbmdsZSkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChlbGVtZW50LnJvdGF0aW9uSUQpO1xyXG4gICAgfVxyXG4gIH0sIDEwKTtcclxufVxyXG4iLCJpbXBvcnQge09wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtnZXRDZWxsSW5mb30gZnJvbSBcIi4uL3N2Z3NcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVuaW5nczogT3BlbmluZ3MsIHNjYWxpbmc6IG51bWJlciwgbWFyZ2luOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGNlbGxJbmZvID0gZ2V0Q2VsbEluZm8ob3BlbmluZ3MpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGNlbGxJbmZvLnJvdGF0aW9uO1xyXG5cclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2NlbGxJbmZvLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBjZWxsSW5mby5maWxlTmFtZSk7XHJcblxyXG4gICAgdGhpcy5hZGp1c3QoYCR7c2NhbGluZyAqIDEwMH0lYCwgYCR7bWFyZ2luICogMTAwfSVgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5vcGVuaW5ncyA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMub3BlbmluZ3MpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiAtIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDM2MCAtIDkwKSAlIDM2MDtcclxuICAgIHRoaXMub3BlbmluZ3MgPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5vcGVuaW5ncyk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGFkanVzdChlZGdlOiBzdHJpbmcsIG1hcmdpbjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gZWRnZTtcclxuICAgIHRoaXMuZWwuc3R5bGUubWFyZ2luUmlnaHQgPSBtYXJnaW47XHJcbiAgICB0aGlzLmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9IG1hcmdpblxyXG4gIH1cclxufSIsImltcG9ydCB7Q29ybmVycywgZ2V0Um90YXRpb24sIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7UGllY2V9IGZyb20gXCIuLi9sZXZlbHNcIjtcclxuaW1wb3J0IHtnZXRQaWVjZUZpbGVOYW1lfSBmcm9tIFwiLi4vc3Znc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgTW92ZUF0dGVtcHRDYWxsQmFjayA9IChsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXSwgY2xvY2t3aXNlOiBib29sZWFuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpZWNlRWxlbWVudCB7XHJcbiAgZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcm90YXRpb246IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZURvd24/OiBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGllY2U6IFBpZWNlLCBzY2FsaW5nOiBudW1iZXIsIHByaXZhdGUgb2Zmc2V0OiBudW1iZXIsIHByaXZhdGUgbW92ZUF0dGVtcHRDYWxsYmFjazogTW92ZUF0dGVtcHRDYWxsQmFjaykge1xyXG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xyXG5cclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBnZXRQaWVjZUZpbGVOYW1lKHBpZWNlLmNvbG9yKSk7XHJcblxyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3NjYWxpbmcgKiAxMDB9JWA7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGdldFJvdGF0aW9uKHBpZWNlLmRpcmVjdGlvbik7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuc2V0UG9zaXRpb24oLi4ucGllY2UubG9jYXRpb24pO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMubW91c2VEb3duID0gW2V2ZW50LngsIGV2ZW50LnldO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlVXAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm1vdXNlRG93biA9PSBudWxsKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMubW91c2VEb3duO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xyXG5cclxuICAgIGxldCBjb3JuZXI6IENvcm5lcnMgPSAwO1xyXG5cclxuICAgIGlmIChldmVudC54ID4geCl7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5SSUdIVDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5MRUZUO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC55ID4geSl7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5CT1RUT007XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuVE9QO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBpZWNlLmRpcmVjdGlvbiAmIGNvcm5lcikge1xyXG4gICAgICB0aGlzLnN3aXRjaEF0dGFjaG1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbG9ja3dpc2UgPSAocm90YXRlT3BlbmluZ3NDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24pICYgY29ybmVyKSAhPT0gMDtcclxuXHJcbiAgICB0aGlzLm1vdmVBdHRlbXB0Q2FsbGJhY2sodGhpcy5waWVjZS5sb2NhdGlvbiwgY2xvY2t3aXNlKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5waWVjZS5kaXJlY3Rpb24gPSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICByb3RhdGVBbnRpQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uIC0gOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMzYwIC0gOTApICUgMzYwO1xyXG4gICAgdGhpcy5waWVjZS5kaXJlY3Rpb24gPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlRmFpbHVyZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBpc0xvY2F0ZWRBdChsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXSl7XHJcbiAgICBjb25zdCBhcmVFcXVhbCA9IChhOiBbbnVtYmVyLCBudW1iZXJdLCBiOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XHJcblxyXG4gICAgaWYgKGFyZUVxdWFsKGxvY2F0aW9uLCB0aGlzLnBpZWNlLmxvY2F0aW9uKSl7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmVFcXVhbChsb2NhdGlvbiwgdGhpcy5nZXRQb3RlbnRpYWxMb2NhdGlvbigpKSl7XHJcbiAgICAgIHRoaXMuc3dpdGNoQXR0YWNobWVudCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UG90ZW50aWFsTG9jYXRpb24oKSA6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgY29uc3QgYmFjayA9IFtPcGVuaW5ncy5UT1AsIE9wZW5pbmdzLkxFRlRdLmluY2x1ZGVzKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IHZlcnRpY2FsID0gW09wZW5pbmdzLlRPUCwgT3BlbmluZ3MuQk9UVE9NXS5pbmNsdWRlcyh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcblxyXG4gICAgY29uc3QgbG9jOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMucGllY2UubG9jYXRpb25bMF0sIHRoaXMucGllY2UubG9jYXRpb25bMV1dO1xyXG4gICAgbG9jW3ZlcnRpY2FsID8gMCA6IDFdICs9IGJhY2sgPyAtMSA6IDE7XHJcblxyXG4gICAgcmV0dXJuIGxvYztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3dpdGNoQXR0YWNobWVudCgpIHtcclxuICAgIHRoaXMucGllY2UubG9jYXRpb24gPSB0aGlzLmdldFBvdGVudGlhbExvY2F0aW9uKCk7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uLCAyKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDE4MCkgJSAzNjA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuc2V0UG9zaXRpb24oLi4udGhpcy5waWVjZS5sb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke3ggKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3kgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICB9XHJcbn0iLCJpbXBvcnQge0NlbGxFbGVtZW50fSBmcm9tIFwiLi9kb20vY2VsbF9lbGVtZW50XCI7XHJcbmltcG9ydCB7TGV2ZWwsIFBpZWNlfSBmcm9tICcuL2xldmVscyc7XHJcbmltcG9ydCB7Q29ybmVycywgT3BlbmluZ3N9IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7UGllY2VFbGVtZW50fSBmcm9tIFwiLi9kb20vcGllY2VfZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBcmVhIHtcclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgY2VsbHNFbDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBjZWxscycpO1xyXG4gIHBpZWNlc0VsOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtYXJlYSA+IHBpZWNlcycpO1xyXG4gIG92ZXJsYXlFbDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBsYXlvdXQnKVxyXG5cclxuICBwcml2YXRlIGNlbGxzOiBDZWxsRWxlbWVudFtdW10gPSBbXTtcclxuICBwcml2YXRlIHBpZWNlczogUGllY2VFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgaW5pdGlhbGl6ZShsZXZlbDogTGV2ZWwpIHtcclxuICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIGNvbnN0IG4gPSBsZXZlbC5jZWxscy5sZW5ndGg7XHJcbiAgICBjb25zdCBtID0gbGV2ZWwuY2VsbHNbMF0ubGVuZ3RoO1xyXG5cclxuICAgIC8vIFRPRE86IGFzc3VtZXMgbiBpcyBzYW1lIGFzIG0sIGFuZCBzaGFwZSBpcyBwZXJmZWN0IHNxdWFyZS5cclxuICAgIGNvbnN0IHNjYWxpbmcgPSAyIC8gKDIgKyAobi0xKSpNYXRoLnNxcnQoMikpO1xyXG4gICAgY29uc3QgbWFyZ2luID0gLShzY2FsaW5nKm4gLSAxKSAvIChuIC0gMSk7XHJcblxyXG4gICAgbGV0IGkgPSAwLCBqID0gMDtcclxuICAgIGZvciAobGV0IHJvdyBvZiBsZXZlbC5jZWxscykge1xyXG4gICAgICBjb25zdCBjdXJSb3cgPSBbXTtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjb25zdCBjdXIgPSBuZXcgQ2VsbEVsZW1lbnQoY2VsbCwgc2NhbGluZywgbWFyZ2luKTtcclxuXHJcbiAgICAgICAgY3VyUm93LnB1c2goY3VyKTtcclxuICAgICAgICB0aGlzLmNlbGxzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuXHJcbiAgICAgICAgKytqO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjdXJSb3cpO1xyXG4gICAgICBqID0gMDtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3IobGV0IHBpZWNlIG9mIGxldmVsLnBpZWNlcykge1xyXG4gICAgICBjb25zdCBjdXIgPSBuZXcgUGllY2VFbGVtZW50KHBpZWNlLCBzY2FsaW5nLCBzY2FsaW5nICsgbWFyZ2luLCB0aGlzLmF0dGVtcHRUb01vdmUpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG4gICAgICB0aGlzLnBpZWNlcy5wdXNoKGN1cik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5waWVjZXNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KT0+e1xyXG4gICAgICBmb3IobGV0IHBpZWNlIG9mIHRoaXMucGllY2VzKXtcclxuICAgICAgICBwaWVjZS5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF0dGVtcHRUb01vdmUgPSAobG9jYXRpb246IFtudW1iZXIsIG51bWJlcl0sIGNsb2Nrd2lzZTogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3QgW2ksIGpdID0gbG9jYXRpb247XHJcblxyXG4gICAgaWYodGhpcy5jYW5Sb3RhdGUoaSwgaikpe1xyXG4gICAgICBjbG9ja3dpc2UgPyB0aGlzLmNlbGxzW2ldW2pdLnJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcblxyXG4gICAgICB0aGlzLnBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiBwaWVjZS5pc0xvY2F0ZWRBdChsb2NhdGlvbikpLmZvckVhY2goKHBpZWNlRWwpID0+IHtcclxuICAgICAgICBjbG9ja3dpc2UgPyBwaWVjZUVsLnJvdGF0ZUNsb2Nrd2lzZSgpIDogcGllY2VFbC5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIGNsb2Nrd2lzZSA/IHRoaXMuY2VsbHNbaV1bal0uZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5mYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXMuZmlsdGVyKChwaWVjZSkgPT4gcGllY2UuaXNMb2NhdGVkQXQobG9jYXRpb24pKS5mb3JFYWNoKChwaWVjZUVsKSA9PiB7XHJcbiAgICAgICAgY2xvY2t3aXNlID8gcGllY2VFbC5mYWlsUm90YXRlQ2xvY2t3aXNlKCkgOiBwaWVjZUVsLmZhaWxSb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhblJvdGF0ZShpOiBudW1iZXIsIGo6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGkgPiAwICYmICEodGhpcy5jZWxsc1tpLTFdW2pdLm9wZW5pbmdzICYgT3BlbmluZ3MuQk9UVE9NKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGkgPCB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgJiYgISh0aGlzLmNlbGxzW2krMV1bal0ub3BlbmluZ3MgJiBPcGVuaW5ncy5UT1ApKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaiA+IDAgJiYgISh0aGlzLmNlbGxzW2ldW2otMV0ub3BlbmluZ3MgJiBPcGVuaW5ncy5SSUdIVCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChqIDwgdGhpcy5jZWxsc1tpXS5sZW5ndGggLSAxICYmICEodGhpcy5jZWxsc1tpXVtqKzFdLm9wZW5pbmdzICYgT3BlbmluZ3MuTEVGVCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJCb2FyZCgpIHtcclxuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLmNlbGxzKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgb2Ygcm93KSB7XHJcbiAgICAgICAgY2VsbC5kZWxldGVFbGVtZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBwaWVjZSBvZiB0aGlzLnBpZWNlcykge1xyXG4gICAgICBwaWVjZS5kZWxldGVFbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR2FtZUFyZWEge1xyXG4gICAgcmV0dXJuIG5ldyBHYW1lQXJlYSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7T3BlbmluZ3MsIENvbG9yc30gZnJvbSBcIi4vZGVmaW5pdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGllY2Uge1xyXG4gIGRpcmVjdGlvbjogT3BlbmluZ3M7XHJcbiAgbG9jYXRpb246IFtudW1iZXIsIG51bWJlcl07XHJcbiAgY29sb3I6IENvbG9ycztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXQge1xyXG4gIGRpcmVjdGlvbjogT3BlbmluZ3M7XHJcbiAgbG9jYXRpb246IG51bWJlcjtcclxuICBjb2xvcjogQ29sb3JzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExldmVsIHtcclxuICBjZWxsczogT3BlbmluZ3NbXVtdO1xyXG4gIHBpZWNlczogUGllY2VbXTtcclxuICB0YXJnZXRzOiBUYXJnZXRbXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdExldmVsKGNvZGU6IHN0cmluZyk6IExldmVsIHtcclxuICBjb25zdCBbY2VsbHMsIHBpZWNlcywgdGFyZ2V0c10gPSBjb2RlLnNwbGl0KCd8Jyk7XHJcblxyXG4gIGNvbnN0IGxldmVsOiBMZXZlbCA9IHtcclxuICAgIGNlbGxzOiBbXSxcclxuICAgIHBpZWNlczogW10sXHJcbiAgICB0YXJnZXRzOiBbXSxcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvT3BlbmluZyA9IChzOiBzdHJpbmcpOiBPcGVuaW5ncyA9PiB7XHJcbiAgICBsZXQgb3BlbmluZzogT3BlbmluZ3MgPSBPcGVuaW5ncy5OT05FO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ3InKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5SSUdIVDtcclxuICAgIGlmIChzLmluY2x1ZGVzKCdiJykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuQk9UVE9NO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ3QnKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5UT1A7XHJcbiAgICBpZiAocy5pbmNsdWRlcygnbCcpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLkxFRlQ7XHJcblxyXG4gICAgcmV0dXJuIG9wZW5pbmc7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCByb3cgb2YgY2VsbHMuc3BsaXQoJzsnKSkge1xyXG4gICAgY29uc3QgY3VyUm93OiBPcGVuaW5nc1tdID0gW107XHJcbiAgICBmb3IgKGxldCBjZWxsIG9mIHJvdy5zcGxpdCgnLCcpKSB7XHJcbiAgICAgIGN1clJvdy5wdXNoKHRvT3BlbmluZyhjZWxsKSk7XHJcbiAgICB9XHJcbiAgICBsZXZlbC5jZWxscy5wdXNoKGN1clJvdyk7XHJcbiAgfVxyXG5cclxuICBsZXQgaSA9IDA7XHJcblxyXG4gIGZvciAobGV0IHBpZWNlIG9mIHBpZWNlcy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBbbywgeCwgeV0gPSBwaWVjZS5zcGxpdCgnLCcpO1xyXG4gICAgbGV2ZWwucGllY2VzLnB1c2goe1xyXG4gICAgICBkaXJlY3Rpb246IHRvT3BlbmluZyhvKSxcclxuICAgICAgbG9jYXRpb246IFtOdW1iZXIoeCksIE51bWJlcih5KV0sXHJcbiAgICAgIGNvbG9yOiBPYmplY3QudmFsdWVzKENvbG9ycylbaV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICArK2k7XHJcbiAgfVxyXG5cclxuICBpID0gMDtcclxuICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBbZCwgbF0gPSB0YXJnZXQuc3BsaXQoJywnKTtcclxuICAgIGxldmVsLnRhcmdldHMucHVzaCh7XHJcbiAgICAgIGRpcmVjdGlvbjogdG9PcGVuaW5nKGQpLFxyXG4gICAgICBsb2NhdGlvbjogTnVtYmVyKGwpLFxyXG4gICAgICBjb2xvcjogT2JqZWN0LnZhbHVlcyhDb2xvcnMpW2ldLFxyXG4gICAgfSlcclxuXHJcbiAgICArK2k7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSBbXHJcbiAgJ3JiLHRiLGxiO3JiLGxyLHRiO3JiLHRyLGxifGwsMiwyfGIsMCcsXHJcbiAgJ3RiLGxyLHRiO3RyLHRyLHRsO3RsLHRsLHRsfHQsMCwwO2IsMCwwO3IsMSwxO2wsMiwwfHIsMDt0LDE7bCwxO3IsMicsXHJcbl1cclxuIiwiaW1wb3J0IHtDb2xvcnMsIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSwgUm90YXRpb259IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcblxyXG5jb25zdCBjZWxsc1BhdGggPSAoY2VsbCkgPT4gYGFzc2V0cy9jZWxscy8ke2NlbGx9LnN2Z2A7XHJcbmNvbnN0IHBpZWNlc1BhdGggPSAocGllY2UpID0+IGBhc3NldHMvcGllY2VzLyR7cGllY2V9LnN2Z2A7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEluZm8ge1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncztcclxuICByb3RhdGlvbj86IFJvdGF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGllY2VJbmZvIHtcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIGNvbG9yOiBDb2xvcnM7XHJcbiAgcm90YXRpb24/OiBSb3RhdGlvblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYmFyOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdiYXInKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLkJPVFRPTSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb3JuZXI6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2Nvcm5lcicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZnVsbDogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnZnVsbCcpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuTk9ORSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb25lOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdsb25lJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvdmVsOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdzaG92ZWwnKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLlJJR0hUIHwgT3BlbmluZ3MuQk9UVE9NLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNodXJpa2VuOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdzaHVyaWtlbicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQgfCBPcGVuaW5ncy5CT1RUT00gfCBPcGVuaW5ncy5MRUZULFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENFTExTID0gW2JhciwgY29ybmVyLCBmdWxsLCBsb25lLCBzaG92ZWwsIHNodXJpa2VuXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDZWxsSW5mbyhvcGVuaW5nczogT3BlbmluZ3MpOiBDZWxsSW5mb3tcclxuICBjb25zdCByb3RhdGlvbnM6IFJvdGF0aW9uW10gPSBbMCwgOTAsIDE4MCwgMjcwXTtcclxuXHJcbiAgZm9yKGxldCByb3RhdGlvbiBvZiByb3RhdGlvbnMpe1xyXG4gICAgZm9yKGxldCBjZWxsIG9mIENFTExTKXtcclxuICAgICAgaWYgKG9wZW5pbmdzID09PSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZShjZWxsLmluaXRpYWxPcGVuaW5ncywgcm90YXRpb24gLyA5MCkpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5jZWxsLFxyXG4gICAgICAgICAgcm90YXRpb246IHJvdGF0aW9uLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlRmlsZU5hbWUocGllY2U6IENvbG9ycyk6IHN0cmluZ3tcclxuICByZXR1cm4gcGllY2VzUGF0aChwaWVjZSk7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHtHYW1lQXJlYX0gZnJvbSBcIi4vZ2FtZV9hcmVhXCI7XHJcbmltcG9ydCB7Y29uc3RydWN0TGV2ZWwsIExFVkVMU30gZnJvbSAnLi9sZXZlbHMnO1xyXG5cclxuY29uc3QgZ2FtZUFyZWEgPSBHYW1lQXJlYS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuZ2FtZUFyZWEuaW5pdGlhbGl6ZShjb25zdHJ1Y3RMZXZlbChMRVZFTFNbMV0pKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=