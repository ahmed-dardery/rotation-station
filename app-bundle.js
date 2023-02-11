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
    element.style.transform = "rotate(".concat(end, "deg)");
    element.animate([
        { transform: "rotate(".concat(start, "deg)") },
        { transform: "rotate(".concat(end, "deg)") },
    ], {
        duration: 400,
        easing: 'ease',
    });
}
exports.animateRotate = animateRotate;
function animateFailure(element, angle, clockwise) {
    var delta = clockwise ? 3 : -3;
    element.animate([
        { transform: "rotate(".concat(angle, "deg)") },
        { transform: "rotate(".concat(angle + delta, "deg)") },
        { transform: "rotate(".concat(angle, "deg)") },
        { transform: "rotate(".concat(angle - delta, "deg)") },
        { transform: "rotate(".concat(angle, "deg)") },
    ], {
        duration: 100,
        iterations: 3,
    });
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
        this.el.setAttribute('class', 'piece');
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

/***/ "../../\u0000#Web/rotation-station/src/dom/target_element.ts":
/*!**************************************************************!*\
  !*** ../../ #Web/rotation-station/src/dom/target_element.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TargetElement = void 0;
var svgs_1 = __webpack_require__(/*! ../svgs */ "../../\u0000#Web/rotation-station/src/svgs.ts");
var definitions_1 = __webpack_require__(/*! ../definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
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
var target_element_1 = __webpack_require__(/*! ./dom/target_element */ "../../\u0000#Web/rotation-station/src/dom/target_element.ts");
var GameArea = /** @class */ (function () {
    function GameArea() {
        var _this = this;
        this.cellsEl = document.querySelector('game-area > cells');
        this.piecesEl = document.querySelector('game-area > pieces');
        this.cells = [];
        this.pieces = [];
        this.targets = [];
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
        this.piecesEl.addEventListener('mouseup', function (event) { return _this.piecesElMouseUp(event); });
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
        this.piecesElMouseUp = function (event) {
            for (var _i = 0, _a = _this.pieces; _i < _a.length; _i++) {
                var piece = _a[_i];
                piece.onMouseUp(event);
            }
        };
        for (var _e = 0, _f = level.targets; _e < _f.length; _e++) {
            var target = _f[_e];
            var cur = new target_element_1.TargetElement(target, scaling, scaling + margin);
            this.piecesEl.appendChild(cur.el);
            this.targets.push(cur);
        }
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
    'tr,tb,lb;tr,tr,lr;tr,tb,tl|t,0,0;t,0,1;r,1,1;r,1,2|l,1;r,1;t,1;b,1',
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
exports.getTargetFileName = exports.getPieceFileName = exports.getCellInfo = exports.CELLS = exports.shuriken = exports.shovel = exports.lone = exports.full = exports.corner = exports.bar = exports.PieceInfo = exports.CellInfo = void 0;
var definitions_1 = __webpack_require__(/*! ./definitions */ "../../\u0000#Web/rotation-station/src/definitions.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUMsQ0FBQztJQUVoRCxLQUFvQixVQUFTLEVBQVQsdUJBQVMsRUFBVCx1QkFBUyxFQUFULElBQVMsRUFBQztRQUExQixJQUFJLFFBQVE7UUFDZCxLQUFnQixVQUFLLEVBQUwsdUJBQUssRUFBTCxtQkFBSyxFQUFMLElBQUssRUFBQztZQUFsQixJQUFJLElBQUk7WUFDVixJQUFJLFFBQVEsS0FBSyx5Q0FBdUIsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBQztnQkFDNUUsNkJBQ0ssSUFBSSxLQUNQLFFBQVEsRUFBRSxRQUFRLElBQ25CO2FBQ0Y7U0FDRjtLQUNGO0FBQ0gsQ0FBQztBQWJELGtDQWFDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBYTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCw4Q0FFQzs7Ozs7OztVQ3ZFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsK0dBQXFDO0FBQ3JDLHNHQUFnRDtBQUVoRCxJQUFNLFFBQVEsR0FBRyxvQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxVQUFVLENBQUMsMkJBQWMsRUFBQyxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RlZmluaXRpb25zLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vYW5pbWF0aW9uLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vY2VsbF9lbGVtZW50LnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vcGllY2VfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL3RhcmdldF9lbGVtZW50LnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9nYW1lX2FyZWEudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvc3Zncy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gT3BlbmluZ3Mge1xyXG4gIE5PTkUgPSAwLFxyXG4gIEJPVFRPTSA9IDEsXHJcbiAgUklHSFQgPSAyLFxyXG4gIFRPUCA9IDQsXHJcbiAgTEVGVCA9IDgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbG9ycyB7XHJcbiAgYmx1ZSA9ICdibHVlJyxcclxuICBjeWFuID0gJ2N5YW4nLFxyXG4gIGdyZWVuID0gJ2dyZWVuJyxcclxuICByZWQgPSAncmVkJyxcclxuICB2aW9sZXQgPSAndmlvbGV0JyxcclxuICB5ZWxsb3cgPSAneWVsbG93JyxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUm90YXRpb24gPSAwfDkwfDE4MHwyNzA7XHJcblxyXG5leHBvcnQgZW51bSBDb3JuZXJzIHtcclxuICBUT1BfTEVGVCA9IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLkxFRlQsXHJcbiAgVE9QX1JJR0hUID0gT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQsXHJcbiAgQk9UVE9NX0xFRlQgPSBPcGVuaW5ncy5CT1RUT00gfCBPcGVuaW5ncy5MRUZULFxyXG4gIEJPVFRPTV9SSUdIVCA9IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLlJJR0hULFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKG9wZW5pbmdzOiBPcGVuaW5ncywgbiA9IDEpOiBPcGVuaW5ncyB7XHJcbiAgcmV0dXJuICgob3BlbmluZ3MgPDwgKDQtbikpIHwgKG9wZW5pbmdzID4+IG4pKSAmIDBiMTExMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZShvcGVuaW5nczogT3BlbmluZ3MsIG4gPSAxKTogT3BlbmluZ3Mge1xyXG4gIHJldHVybiAoKG9wZW5pbmdzID4+ICg0LW4pKSB8IChvcGVuaW5ncyA8PCBuKSkgJiAwYjExMTE7XHJcbn1cclxuXHJcbi8qKiBBc3N1bWVzIExlZnQgaXMgMCwgcmV0dXJucyBjbG9ja3dpc2UgYW5nbGUuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGlvbihvcGVuaW5nOiBPcGVuaW5ncyk6IFJvdGF0aW9uIHtcclxuICBzd2l0Y2gob3BlbmluZyl7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkxFRlQ6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSBPcGVuaW5ncy5UT1A6XHJcbiAgICAgIHJldHVybiA5MDtcclxuICAgIGNhc2UgT3BlbmluZ3MuUklHSFQ6XHJcbiAgICAgIHJldHVybiAxODA7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkJPVFRPTTpcclxuICAgICAgcmV0dXJuIDI3MDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVuaW5nIGFyZ3VtZW50OiAke29wZW5pbmd9LmApO1xyXG4gIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBhbmltYXRlUm90YXRlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xyXG5cclxuICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtlbmR9ZGVnKWBcclxuXHJcbiAgZWxlbWVudC5hbmltYXRlKFtcclxuICAgIHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7c3RhcnR9ZGVnKWAgfSxcclxuICAgIHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7ZW5kfWRlZylgIH0sXHJcbiAgXSwge1xyXG4gICAgZHVyYXRpb246IDQwMCxcclxuICAgIGVhc2luZzogJ2Vhc2UnLFxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlRmFpbHVyZShlbGVtZW50OiBIVE1MRWxlbWVudCwgYW5nbGU6IG51bWJlciwgY2xvY2t3aXNlOiBib29sZWFuKSB7XHJcblxyXG4gIGNvbnN0IGRlbHRhID0gY2xvY2t3aXNlID8gMyA6IC0zO1xyXG5cclxuICBlbGVtZW50LmFuaW1hdGUoW1xyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZX1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZStkZWx0YX1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZX1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZS1kZWx0YX1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZX1kZWcpYCB9LFxyXG4gIF0sIHtcclxuICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICBpdGVyYXRpb25zOiAzLFxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IHtPcGVuaW5ncywgcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZX0gZnJvbSBcIi4uL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7Z2V0Q2VsbEluZm99IGZyb20gXCIuLi9zdmdzXCI7XHJcbmltcG9ydCB7YW5pbWF0ZUZhaWx1cmUsIGFuaW1hdGVSb3RhdGV9IGZyb20gXCIuL2FuaW1hdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENlbGxFbGVtZW50IHtcclxuICBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3BlbmluZ3M6IE9wZW5pbmdzLCBzY2FsaW5nOiBudW1iZXIsIG1hcmdpbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBjZWxsSW5mbyA9IGdldENlbGxJbmZvKG9wZW5pbmdzKTtcclxuICAgIHRoaXMucm90YXRpb24gPSBjZWxsSW5mby5yb3RhdGlvbjtcclxuXHJcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtjZWxsSW5mby5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnc3JjJywgY2VsbEluZm8uZmlsZU5hbWUpO1xyXG5cclxuICAgIHRoaXMuYWRqdXN0KGAke3NjYWxpbmcgKiAxMDB9JWAsIGAke21hcmdpbiAqIDEwMH0lYCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVFbGVtZW50KCkge1xyXG4gICAgdGhpcy5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiArIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDkwKSAlIDM2MDtcclxuICAgIHRoaXMub3BlbmluZ3MgPSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLm9wZW5pbmdzKTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlUm90YXRlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRoaXMucm90YXRpb24gLSA5MCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAzNjAgLSA5MCkgJSAzNjA7XHJcbiAgICB0aGlzLm9wZW5pbmdzID0gcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlKHRoaXMub3BlbmluZ3MpO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlRmFpbHVyZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBhZGp1c3QoZWRnZTogc3RyaW5nLCBtYXJnaW46IHN0cmluZykge1xyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGVkZ2U7XHJcbiAgICB0aGlzLmVsLnN0eWxlLm1hcmdpblJpZ2h0ID0gbWFyZ2luO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBtYXJnaW5cclxuICB9XHJcbn0iLCJpbXBvcnQge0Nvcm5lcnMsIGdldFJvdGF0aW9uLCBPcGVuaW5ncywgcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZX0gZnJvbSBcIi4uL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7YW5pbWF0ZUZhaWx1cmUsIGFuaW1hdGVSb3RhdGV9IGZyb20gXCIuL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQge1BpZWNlfSBmcm9tIFwiLi4vbGV2ZWxzXCI7XHJcbmltcG9ydCB7Z2V0UGllY2VGaWxlTmFtZX0gZnJvbSBcIi4uL3N2Z3NcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE1vdmVBdHRlbXB0Q2FsbEJhY2sgPSAobG9jYXRpb246IFtudW1iZXIsIG51bWJlcl0sIGNsb2Nrd2lzZTogYm9vbGVhbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQaWVjZUVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgbW91c2VEb3duPzogW251bWJlciwgbnVtYmVyXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHBpZWNlOiBQaWVjZSwgc2NhbGluZzogbnVtYmVyLCBwcml2YXRlIG9mZnNldDogbnVtYmVyLCBwcml2YXRlIG1vdmVBdHRlbXB0Q2FsbGJhY2s6IE1vdmVBdHRlbXB0Q2FsbEJhY2spIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnc3JjJywgZ2V0UGllY2VGaWxlTmFtZShwaWVjZS5jb2xvcikpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3BpZWNlJyk7XHJcblxyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3NjYWxpbmcgKiAxMDB9JWA7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGdldFJvdGF0aW9uKHBpZWNlLmRpcmVjdGlvbik7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuc2V0UG9zaXRpb24oLi4ucGllY2UubG9jYXRpb24pO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMubW91c2VEb3duID0gW2V2ZW50LngsIGV2ZW50LnldO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlVXAoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLm1vdXNlRG93biA9PSBudWxsKXtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMubW91c2VEb3duO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xyXG5cclxuICAgIGxldCBjb3JuZXI6IENvcm5lcnMgPSAwO1xyXG5cclxuICAgIGlmIChldmVudC54ID4geCl7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5SSUdIVDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5MRUZUO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC55ID4geSl7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5CT1RUT007XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuVE9QO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBpZWNlLmRpcmVjdGlvbiAmIGNvcm5lcikge1xyXG4gICAgICB0aGlzLnN3aXRjaEF0dGFjaG1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbG9ja3dpc2UgPSAocm90YXRlT3BlbmluZ3NDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24pICYgY29ybmVyKSAhPT0gMDtcclxuXHJcbiAgICB0aGlzLm1vdmVBdHRlbXB0Q2FsbGJhY2sodGhpcy5waWVjZS5sb2NhdGlvbiwgY2xvY2t3aXNlKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5waWVjZS5kaXJlY3Rpb24gPSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICByb3RhdGVBbnRpQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uIC0gOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMzYwIC0gOTApICUgMzYwO1xyXG4gICAgdGhpcy5waWVjZS5kaXJlY3Rpb24gPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZmFpbFJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlRmFpbHVyZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBpc0xvY2F0ZWRBdChsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXSl7XHJcbiAgICBjb25zdCBhcmVFcXVhbCA9IChhOiBbbnVtYmVyLCBudW1iZXJdLCBiOiBbbnVtYmVyLCBudW1iZXJdKSA9PiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV07XHJcblxyXG4gICAgaWYgKGFyZUVxdWFsKGxvY2F0aW9uLCB0aGlzLnBpZWNlLmxvY2F0aW9uKSl7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmVFcXVhbChsb2NhdGlvbiwgdGhpcy5nZXRQb3RlbnRpYWxMb2NhdGlvbigpKSl7XHJcbiAgICAgIHRoaXMuc3dpdGNoQXR0YWNobWVudCgpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UG90ZW50aWFsTG9jYXRpb24oKSA6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgY29uc3QgYmFjayA9IFtPcGVuaW5ncy5UT1AsIE9wZW5pbmdzLkxFRlRdLmluY2x1ZGVzKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IHZlcnRpY2FsID0gW09wZW5pbmdzLlRPUCwgT3BlbmluZ3MuQk9UVE9NXS5pbmNsdWRlcyh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcblxyXG4gICAgY29uc3QgbG9jOiBbbnVtYmVyLCBudW1iZXJdID0gW3RoaXMucGllY2UubG9jYXRpb25bMF0sIHRoaXMucGllY2UubG9jYXRpb25bMV1dO1xyXG4gICAgbG9jW3ZlcnRpY2FsID8gMCA6IDFdICs9IGJhY2sgPyAtMSA6IDE7XHJcblxyXG4gICAgcmV0dXJuIGxvYztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3dpdGNoQXR0YWNobWVudCgpIHtcclxuICAgIHRoaXMucGllY2UubG9jYXRpb24gPSB0aGlzLmdldFBvdGVudGlhbExvY2F0aW9uKCk7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uLCAyKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDE4MCkgJSAzNjA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuc2V0UG9zaXRpb24oLi4udGhpcy5waWVjZS5sb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke3ggKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke3kgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICB9XHJcbn0iLCJpbXBvcnQge1RhcmdldH0gZnJvbSBcIi4uL2xldmVsc1wiO1xyXG5pbXBvcnQge2dldFRhcmdldEZpbGVOYW1lfSBmcm9tIFwiLi4vc3Znc1wiO1xyXG5pbXBvcnQge2dldFJvdGF0aW9uLCBPcGVuaW5ncywgcm90YXRlT3BlbmluZ3NDbG9ja3dpc2V9IGZyb20gXCIuLi9kZWZpbml0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhcmdldEVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YXJnZXQ6IFRhcmdldCwgc2NhbGluZzogbnVtYmVyLCBwcml2YXRlIG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGdldFRhcmdldEZpbGVOYW1lKHRhcmdldC5jb2xvcikpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RhcmdldCcpO1xyXG5cclxuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtzY2FsaW5nICogMTAwfSVgO1xyXG5cclxuICAgIHRoaXMucm90YXRpb24gPSBnZXRSb3RhdGlvbih0YXJnZXQuZGlyZWN0aW9uKTtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb259ZGVnKWA7XHJcblxyXG4gICAgdGhpcy5zZXRQb3NpdGlvbih0YXJnZXQubG9jYXRpb24sIHRhcmdldC5kaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQb3NpdGlvbihsb2M6IG51bWJlciwgZGlyZWN0aW9uOiBPcGVuaW5ncykge1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBPcGVuaW5ncy5MRUZUOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYC0yMCVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBPcGVuaW5ncy5CT1RUT006XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IHRoaXMuZWwuc3R5bGUudG9wID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE9wZW5pbmdzLlJJR0hUOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IGAtMjAlYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBPcGVuaW5ncy5UT1A6XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IHRoaXMuZWwuc3R5bGUuYm90dG9tID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBkaXJlY3Rpb246ICR7ZGlyZWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7Q2VsbEVsZW1lbnR9IGZyb20gXCIuL2RvbS9jZWxsX2VsZW1lbnRcIjtcclxuaW1wb3J0IHtMZXZlbH0gZnJvbSAnLi9sZXZlbHMnO1xyXG5pbXBvcnQge09wZW5pbmdzfSBmcm9tIFwiLi9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQge1BpZWNlRWxlbWVudH0gZnJvbSBcIi4vZG9tL3BpZWNlX2VsZW1lbnRcIjtcclxuaW1wb3J0IHtUYXJnZXRFbGVtZW50fSBmcm9tIFwiLi9kb20vdGFyZ2V0X2VsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQXJlYSB7XHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucGllY2VzRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5waWVjZXNFbE1vdXNlVXAoZXZlbnQpKTtcclxuICB9XHJcblxyXG4gIGNlbGxzRWw6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZ2FtZS1hcmVhID4gY2VsbHMnKTtcclxuICBwaWVjZXNFbDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBwaWVjZXMnKTtcclxuXHJcbiAgcHJpdmF0ZSBjZWxsczogQ2VsbEVsZW1lbnRbXVtdID0gW107XHJcbiAgcHJpdmF0ZSBwaWVjZXM6IFBpZWNlRWxlbWVudFtdID0gW107XHJcbiAgcHJpdmF0ZSB0YXJnZXRzOiBUYXJnZXRFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBwaWVjZXNFbE1vdXNlVXA6IChldmVudCkgPT4gdm9pZDtcclxuXHJcbiAgaW5pdGlhbGl6ZShsZXZlbDogTGV2ZWwpIHtcclxuICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIGNvbnN0IG4gPSBsZXZlbC5jZWxscy5sZW5ndGg7XHJcbiAgICBjb25zdCBtID0gbGV2ZWwuY2VsbHNbMF0ubGVuZ3RoO1xyXG5cclxuICAgIC8vIFRPRE86IGFzc3VtZXMgbiBpcyBzYW1lIGFzIG0sIGFuZCBzaGFwZSBpcyBwZXJmZWN0IHNxdWFyZS5cclxuICAgIGNvbnN0IHNjYWxpbmcgPSAyIC8gKDIgKyAobiAtIDEpICogTWF0aC5zcXJ0KDIpKTtcclxuICAgIGNvbnN0IG1hcmdpbiA9IC0oc2NhbGluZyAqIG4gLSAxKSAvIChuIC0gMSk7XHJcblxyXG4gICAgbGV0IGkgPSAwLCBqID0gMDtcclxuICAgIGZvciAobGV0IHJvdyBvZiBsZXZlbC5jZWxscykge1xyXG4gICAgICBjb25zdCBjdXJSb3cgPSBbXTtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjb25zdCBjdXIgPSBuZXcgQ2VsbEVsZW1lbnQoY2VsbCwgc2NhbGluZywgbWFyZ2luKTtcclxuXHJcbiAgICAgICAgY3VyUm93LnB1c2goY3VyKTtcclxuICAgICAgICB0aGlzLmNlbGxzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuXHJcbiAgICAgICAgKytqO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjdXJSb3cpO1xyXG4gICAgICBqID0gMDtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3IgKGxldCBwaWVjZSBvZiBsZXZlbC5waWVjZXMpIHtcclxuICAgICAgY29uc3QgY3VyID0gbmV3IFBpZWNlRWxlbWVudChwaWVjZSwgc2NhbGluZywgc2NhbGluZyArIG1hcmdpbiwgdGhpcy5hdHRlbXB0VG9Nb3ZlKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuICAgICAgdGhpcy5waWVjZXMucHVzaChjdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGllY2VzRWxNb3VzZVVwID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGZvciAobGV0IHBpZWNlIG9mIHRoaXMucGllY2VzKSB7XHJcbiAgICAgICAgcGllY2Uub25Nb3VzZVVwKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhcmdldCBvZiBsZXZlbC50YXJnZXRzKSB7XHJcbiAgICAgIGNvbnN0IGN1ciA9IG5ldyBUYXJnZXRFbGVtZW50KHRhcmdldCwgc2NhbGluZywgc2NhbGluZyArIG1hcmdpbik7XHJcblxyXG4gICAgICB0aGlzLnBpZWNlc0VsLmFwcGVuZENoaWxkKGN1ci5lbCk7XHJcbiAgICAgIHRoaXMudGFyZ2V0cy5wdXNoKGN1cik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRlbXB0VG9Nb3ZlID0gKGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdLCBjbG9ja3dpc2U6IGJvb2xlYW4pID0+IHtcclxuICAgIGNvbnN0IFtpLCBqXSA9IGxvY2F0aW9uO1xyXG5cclxuICAgIGlmICh0aGlzLmNhblJvdGF0ZShpLCBqKSkge1xyXG4gICAgICBjbG9ja3dpc2UgPyB0aGlzLmNlbGxzW2ldW2pdLnJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcblxyXG4gICAgICB0aGlzLnBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiBwaWVjZS5pc0xvY2F0ZWRBdChsb2NhdGlvbikpLmZvckVhY2goKHBpZWNlRWwpID0+IHtcclxuICAgICAgICBjbG9ja3dpc2UgPyBwaWVjZUVsLnJvdGF0ZUNsb2Nrd2lzZSgpIDogcGllY2VFbC5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbG9ja3dpc2UgPyB0aGlzLmNlbGxzW2ldW2pdLmZhaWxSb3RhdGVDbG9ja3dpc2UoKSA6IHRoaXMuY2VsbHNbaV1bal0uZmFpbFJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzLmZpbHRlcigocGllY2UpID0+IHBpZWNlLmlzTG9jYXRlZEF0KGxvY2F0aW9uKSkuZm9yRWFjaCgocGllY2VFbCkgPT4ge1xyXG4gICAgICAgIGNsb2Nrd2lzZSA/IHBpZWNlRWwuZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIDogcGllY2VFbC5mYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjYW5Sb3RhdGUoaTogbnVtYmVyLCBqOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGlmIChpID4gMCAmJiAhKHRoaXMuY2VsbHNbaSAtIDFdW2pdLm9wZW5pbmdzICYgT3BlbmluZ3MuQk9UVE9NKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGkgPCB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgJiYgISh0aGlzLmNlbGxzW2kgKyAxXVtqXS5vcGVuaW5ncyAmIE9wZW5pbmdzLlRPUCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChqID4gMCAmJiAhKHRoaXMuY2VsbHNbaV1baiAtIDFdLm9wZW5pbmdzICYgT3BlbmluZ3MuUklHSFQpKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaiA8IHRoaXMuY2VsbHNbaV0ubGVuZ3RoIC0gMSAmJiAhKHRoaXMuY2VsbHNbaV1baiArIDFdLm9wZW5pbmdzICYgT3BlbmluZ3MuTEVGVCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJCb2FyZCgpIHtcclxuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLmNlbGxzKSB7XHJcbiAgICAgIGZvciAobGV0IGNlbGwgb2Ygcm93KSB7XHJcbiAgICAgICAgY2VsbC5kZWxldGVFbGVtZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBwaWVjZSBvZiB0aGlzLnBpZWNlcykge1xyXG4gICAgICBwaWVjZS5kZWxldGVFbGVtZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogR2FtZUFyZWEge1xyXG4gICAgcmV0dXJuIG5ldyBHYW1lQXJlYSgpO1xyXG4gIH1cclxufSIsImltcG9ydCB7T3BlbmluZ3MsIENvbG9yc30gZnJvbSBcIi4vZGVmaW5pdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGllY2Uge1xyXG4gIGRpcmVjdGlvbjogT3BlbmluZ3M7XHJcbiAgbG9jYXRpb246IFtudW1iZXIsIG51bWJlcl07XHJcbiAgY29sb3I6IENvbG9ycztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYXJnZXQge1xyXG4gIGRpcmVjdGlvbjogT3BlbmluZ3M7XHJcbiAgbG9jYXRpb246IG51bWJlcjtcclxuICBjb2xvcjogQ29sb3JzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExldmVsIHtcclxuICBjZWxsczogT3BlbmluZ3NbXVtdO1xyXG4gIHBpZWNlczogUGllY2VbXTtcclxuICB0YXJnZXRzOiBUYXJnZXRbXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdExldmVsKGNvZGU6IHN0cmluZyk6IExldmVsIHtcclxuICBjb25zdCBbY2VsbHMsIHBpZWNlcywgdGFyZ2V0c10gPSBjb2RlLnNwbGl0KCd8Jyk7XHJcblxyXG4gIGNvbnN0IGxldmVsOiBMZXZlbCA9IHtcclxuICAgIGNlbGxzOiBbXSxcclxuICAgIHBpZWNlczogW10sXHJcbiAgICB0YXJnZXRzOiBbXSxcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvT3BlbmluZyA9IChzOiBzdHJpbmcpOiBPcGVuaW5ncyA9PiB7XHJcbiAgICBsZXQgb3BlbmluZzogT3BlbmluZ3MgPSBPcGVuaW5ncy5OT05FO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ3InKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5SSUdIVDtcclxuICAgIGlmIChzLmluY2x1ZGVzKCdiJykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuQk9UVE9NO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ3QnKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5UT1A7XHJcbiAgICBpZiAocy5pbmNsdWRlcygnbCcpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLkxFRlQ7XHJcblxyXG4gICAgcmV0dXJuIG9wZW5pbmc7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCByb3cgb2YgY2VsbHMuc3BsaXQoJzsnKSkge1xyXG4gICAgY29uc3QgY3VyUm93OiBPcGVuaW5nc1tdID0gW107XHJcbiAgICBmb3IgKGxldCBjZWxsIG9mIHJvdy5zcGxpdCgnLCcpKSB7XHJcbiAgICAgIGN1clJvdy5wdXNoKHRvT3BlbmluZyhjZWxsKSk7XHJcbiAgICB9XHJcbiAgICBsZXZlbC5jZWxscy5wdXNoKGN1clJvdyk7XHJcbiAgfVxyXG5cclxuICBsZXQgaSA9IDA7XHJcblxyXG4gIGZvciAobGV0IHBpZWNlIG9mIHBpZWNlcy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBbbywgeCwgeV0gPSBwaWVjZS5zcGxpdCgnLCcpO1xyXG4gICAgbGV2ZWwucGllY2VzLnB1c2goe1xyXG4gICAgICBkaXJlY3Rpb246IHRvT3BlbmluZyhvKSxcclxuICAgICAgbG9jYXRpb246IFtOdW1iZXIoeCksIE51bWJlcih5KV0sXHJcbiAgICAgIGNvbG9yOiBPYmplY3QudmFsdWVzKENvbG9ycylbaV0sXHJcbiAgICB9KTtcclxuXHJcbiAgICArK2k7XHJcbiAgfVxyXG5cclxuICBpID0gMDtcclxuICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBbZCwgbF0gPSB0YXJnZXQuc3BsaXQoJywnKTtcclxuICAgIGxldmVsLnRhcmdldHMucHVzaCh7XHJcbiAgICAgIGRpcmVjdGlvbjogdG9PcGVuaW5nKGQpLFxyXG4gICAgICBsb2NhdGlvbjogTnVtYmVyKGwpLFxyXG4gICAgICBjb2xvcjogT2JqZWN0LnZhbHVlcyhDb2xvcnMpW2ldLFxyXG4gICAgfSlcclxuXHJcbiAgICArK2k7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBMRVZFTFMgPSBbXHJcbiAgJ3JiLHRiLGxiO3JiLGxyLHRiO3JiLHRyLGxifGwsMiwyfGIsMCcsXHJcbiAgJ3RyLHRiLGxiO3RyLHRyLGxyO3RyLHRiLHRsfHQsMCwwO3QsMCwxO3IsMSwxO3IsMSwyfGwsMTtyLDE7dCwxO2IsMScsXHJcbiAgJ3RiLGxyLHRiO3RyLHRyLHRsO3RsLHRsLHRsfHQsMCwwO2IsMCwwO3IsMSwxO2wsMiwwfHIsMDt0LDE7bCwxO3IsMicsXHJcbl1cclxuIiwiaW1wb3J0IHtDb2xvcnMsIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSwgUm90YXRpb259IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcblxyXG5jb25zdCBjZWxsc1BhdGggPSAoY2VsbCkgPT4gYGFzc2V0cy9jZWxscy8ke2NlbGx9LnN2Z2A7XHJcbmNvbnN0IHBpZWNlc1BhdGggPSAocGllY2UpID0+IGBhc3NldHMvcGllY2VzLyR7cGllY2V9LnN2Z2A7XHJcbmNvbnN0IHRhcmdldHNQYXRoID0gKHBpZWNlKSA9PiBgYXNzZXRzL3RhcmdldHMvJHtwaWVjZX0uc3ZnYDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDZWxsSW5mbyB7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzO1xyXG4gIHJvdGF0aW9uPzogUm90YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaWVjZUluZm8ge1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgY29sb3I6IENvbG9ycztcclxuICByb3RhdGlvbj86IFJvdGF0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBiYXI6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2JhcicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuQk9UVE9NLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvcm5lcjogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnY29ybmVyJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmdWxsOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdmdWxsJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5OT05FLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvbmU6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2xvbmUnKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaG92ZWw6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ3Nob3ZlbCcpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQgfCBPcGVuaW5ncy5CT1RUT00sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2h1cmlrZW46IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ3NodXJpa2VuJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCB8IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLkxFRlQsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ0VMTFMgPSBbYmFyLCBjb3JuZXIsIGZ1bGwsIGxvbmUsIHNob3ZlbCwgc2h1cmlrZW5dO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxJbmZvKG9wZW5pbmdzOiBPcGVuaW5ncyk6IENlbGxJbmZve1xyXG4gIGNvbnN0IHJvdGF0aW9uczogUm90YXRpb25bXSA9IFswLCA5MCwgMTgwLCAyNzBdO1xyXG5cclxuICBmb3IobGV0IHJvdGF0aW9uIG9mIHJvdGF0aW9ucyl7XHJcbiAgICBmb3IobGV0IGNlbGwgb2YgQ0VMTFMpe1xyXG4gICAgICBpZiAob3BlbmluZ3MgPT09IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKGNlbGwuaW5pdGlhbE9wZW5pbmdzLCByb3RhdGlvbiAvIDkwKSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmNlbGwsXHJcbiAgICAgICAgICByb3RhdGlvbjogcm90YXRpb24sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGllY2VGaWxlTmFtZShwaWVjZTogQ29sb3JzKTogc3RyaW5ne1xyXG4gIHJldHVybiBwaWVjZXNQYXRoKHBpZWNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldEZpbGVOYW1lKHRhcmdldDogQ29sb3JzKTogc3RyaW5ne1xyXG4gIHJldHVybiB0YXJnZXRzUGF0aCh0YXJnZXQpO1xyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7R2FtZUFyZWF9IGZyb20gXCIuL2dhbWVfYXJlYVwiO1xyXG5pbXBvcnQge2NvbnN0cnVjdExldmVsLCBMRVZFTFN9IGZyb20gJy4vbGV2ZWxzJztcclxuXHJcbmNvbnN0IGdhbWVBcmVhID0gR2FtZUFyZWEuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbmdhbWVBcmVhLmluaXRpYWxpemUoY29uc3RydWN0TGV2ZWwoTEVWRUxTWzFdKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9