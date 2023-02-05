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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQ25CO2FBQ0Y7U0FDRjtLQUNGO0FBQ0gsQ0FBQztBQWJELGtDQWFDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBYTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCw4Q0FFQzs7Ozs7OztVQ3ZFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsK0dBQXFDO0FBQ3JDLHNHQUFnRDtBQUVoRCxJQUFNLFFBQVEsR0FBRyxvQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxVQUFVLENBQUMsMkJBQWMsRUFBQyxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RlZmluaXRpb25zLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vYW5pbWF0aW9uLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vY2VsbF9lbGVtZW50LnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kb20vcGllY2VfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL3RhcmdldF9lbGVtZW50LnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9nYW1lX2FyZWEudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvc3Zncy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gT3BlbmluZ3Mge1xyXG4gIE5PTkUgPSAwLFxyXG4gIEJPVFRPTSA9IDEsXHJcbiAgUklHSFQgPSAyLFxyXG4gIFRPUCA9IDQsXHJcbiAgTEVGVCA9IDgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbG9ycyB7XHJcbiAgYmx1ZSA9ICdibHVlJyxcclxuICBjeWFuID0gJ2N5YW4nLFxyXG4gIGdyZWVuID0gJ2dyZWVuJyxcclxuICByZWQgPSAncmVkJyxcclxuICB2aW9sZXQgPSAndmlvbGV0JyxcclxuICB5ZWxsb3cgPSAneWVsbG93JyxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUm90YXRpb24gPSAwfDkwfDE4MHwyNzA7XHJcblxyXG5leHBvcnQgZW51bSBDb3JuZXJzIHtcclxuICBUT1BfTEVGVCA9IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLkxFRlQsXHJcbiAgVE9QX1JJR0hUID0gT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQsXHJcbiAgQk9UVE9NX0xFRlQgPSBPcGVuaW5ncy5CT1RUT00gfCBPcGVuaW5ncy5MRUZULFxyXG4gIEJPVFRPTV9SSUdIVCA9IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLlJJR0hULFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKG9wZW5pbmdzOiBPcGVuaW5ncywgbiA9IDEpOiBPcGVuaW5ncyB7XHJcbiAgcmV0dXJuICgob3BlbmluZ3MgPDwgKDQtbikpIHwgKG9wZW5pbmdzID4+IG4pKSAmIDBiMTExMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZShvcGVuaW5nczogT3BlbmluZ3MsIG4gPSAxKTogT3BlbmluZ3Mge1xyXG4gIHJldHVybiAoKG9wZW5pbmdzID4+ICg0LW4pKSB8IChvcGVuaW5ncyA8PCBuKSkgJiAwYjExMTE7XHJcbn1cclxuXHJcbi8qKiBBc3N1bWVzIExlZnQgaXMgMCwgcmV0dXJucyBjbG9ja3dpc2UgYW5nbGUuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGlvbihvcGVuaW5nOiBPcGVuaW5ncyk6IFJvdGF0aW9uIHtcclxuICBzd2l0Y2gob3BlbmluZyl7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkxFRlQ6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSBPcGVuaW5ncy5UT1A6XHJcbiAgICAgIHJldHVybiA5MDtcclxuICAgIGNhc2UgT3BlbmluZ3MuUklHSFQ6XHJcbiAgICAgIHJldHVybiAxODA7XHJcbiAgICBjYXNlIE9wZW5pbmdzLkJPVFRPTTpcclxuICAgICAgcmV0dXJuIDI3MDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVuaW5nIGFyZ3VtZW50OiAke29wZW5pbmd9LmApO1xyXG4gIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBhbmltYXRlUm90YXRlKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgeyByb3RhdGlvbklEPzogbnVtYmVyIH0sIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgbGV0IGFuZ2xlID0gc3RhcnQ7XHJcbiAgaWYgKGVsZW1lbnQucm90YXRpb25JRCkge1xyXG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwoZWxlbWVudC5yb3RhdGlvbklEKTtcclxuICB9XHJcbiAgY29uc3QgZGlmZiA9IHN0YXJ0IDwgZW5kID8gNSA6IC01O1xyXG5cclxuICBlbGVtZW50LnJvdGF0aW9uSUQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYW5nbGUgKz0gZGlmZjtcclxuXHJcbiAgICBpZiAoZGlmZiA+IDAgJiYgYW5nbGUgPj0gZW5kIHx8IGRpZmYgPCAwICYmIGFuZ2xlIDw9IGVuZCkge1xyXG4gICAgICBhbmdsZSA9IGVuZDtcclxuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoZWxlbWVudC5yb3RhdGlvbklEKTtcclxuICAgIH1cclxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2FuZ2xlfWRlZylgXHJcbiAgfSwgMTApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVGYWlsdXJlKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgeyByb3RhdGlvbklEPzogbnVtYmVyIH0sIGFuZ2xlOiBudW1iZXIsIGNsb2Nrd2lzZTogYm9vbGVhbikge1xyXG4gIGlmIChlbGVtZW50LnJvdGF0aW9uSUQpIHtcclxuICAgIHdpbmRvdy5jbGVhckludGVydmFsKGVsZW1lbnQucm90YXRpb25JRCk7XHJcbiAgfVxyXG4gIGxldCBkaWZmID0gY2xvY2t3aXNlID8gMiA6IC0yO1xyXG4gIGxldCB0b3RhbCA9IDA7XHJcbiAgbGV0IHRpbWVzID0gMDtcclxuICBsZXQgbXlBbmdsZSA9IGFuZ2xlO1xyXG4gIGNvbnN0IHRvdGFsVGltZXMgPSAzO1xyXG4gIGNvbnN0IG1heCA9IDM7XHJcblxyXG4gIGVsZW1lbnQucm90YXRpb25JRCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBteUFuZ2xlICs9IGRpZmY7XHJcbiAgICB0b3RhbCArPSBkaWZmO1xyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke215QW5nbGV9ZGVnKWBcclxuICAgIGlmIChNYXRoLmFicyh0b3RhbCkgPiBtYXgpIHtcclxuICAgICAgZGlmZiAqPSAtMTtcclxuICAgICAgKyt0aW1lcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGltZXMgPj0gdG90YWxUaW1lcyAmJiBteUFuZ2xlID09PSBhbmdsZSkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChlbGVtZW50LnJvdGF0aW9uSUQpO1xyXG4gICAgfVxyXG4gIH0sIDEwKTtcclxufVxyXG4iLCJpbXBvcnQge09wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtnZXRDZWxsSW5mb30gZnJvbSBcIi4uL3N2Z3NcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVuaW5nczogT3BlbmluZ3MsIHNjYWxpbmc6IG51bWJlciwgbWFyZ2luOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGNlbGxJbmZvID0gZ2V0Q2VsbEluZm8ob3BlbmluZ3MpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGNlbGxJbmZvLnJvdGF0aW9uO1xyXG5cclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2NlbGxJbmZvLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBjZWxsSW5mby5maWxlTmFtZSk7XHJcblxyXG4gICAgdGhpcy5hZGp1c3QoYCR7c2NhbGluZyAqIDEwMH0lYCwgYCR7bWFyZ2luICogMTAwfSVgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5vcGVuaW5ncyA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMub3BlbmluZ3MpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiAtIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDM2MCAtIDkwKSAlIDM2MDtcclxuICAgIHRoaXMub3BlbmluZ3MgPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5vcGVuaW5ncyk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGFkanVzdChlZGdlOiBzdHJpbmcsIG1hcmdpbjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gZWRnZTtcclxuICAgIHRoaXMuZWwuc3R5bGUubWFyZ2luUmlnaHQgPSBtYXJnaW47XHJcbiAgICB0aGlzLmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9IG1hcmdpblxyXG4gIH1cclxufSIsImltcG9ydCB7Q29ybmVycywgZ2V0Um90YXRpb24sIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7UGllY2V9IGZyb20gXCIuLi9sZXZlbHNcIjtcclxuaW1wb3J0IHtnZXRQaWVjZUZpbGVOYW1lfSBmcm9tIFwiLi4vc3Znc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgTW92ZUF0dGVtcHRDYWxsQmFjayA9IChsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXSwgY2xvY2t3aXNlOiBib29sZWFuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpZWNlRWxlbWVudCB7XHJcbiAgZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcm90YXRpb246IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZURvd24/OiBbbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGllY2U6IFBpZWNlLCBzY2FsaW5nOiBudW1iZXIsIHByaXZhdGUgb2Zmc2V0OiBudW1iZXIsIHByaXZhdGUgbW92ZUF0dGVtcHRDYWxsYmFjazogTW92ZUF0dGVtcHRDYWxsQmFjaykge1xyXG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xyXG5cclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBnZXRQaWVjZUZpbGVOYW1lKHBpZWNlLmNvbG9yKSk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGllY2UnKTtcclxuXHJcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7c2NhbGluZyAqIDEwMH0lYDtcclxuXHJcbiAgICB0aGlzLnJvdGF0aW9uID0gZ2V0Um90YXRpb24ocGllY2UuZGlyZWN0aW9uKTtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb259ZGVnKWA7XHJcblxyXG4gICAgdGhpcy5zZXRQb3NpdGlvbiguLi5waWVjZS5sb2NhdGlvbik7XHJcblxyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5tb3VzZURvd24gPSBbZXZlbnQueCwgZXZlbnQueV07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VVcChldmVudCkge1xyXG4gICAgaWYgKHRoaXMubW91c2VEb3duID09IG51bGwpe1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgW3gsIHldID0gdGhpcy5tb3VzZURvd247XHJcbiAgICB0aGlzLm1vdXNlRG93biA9IG51bGw7XHJcblxyXG4gICAgbGV0IGNvcm5lcjogQ29ybmVycyA9IDA7XHJcblxyXG4gICAgaWYgKGV2ZW50LnggPiB4KXtcclxuICAgICAgY29ybmVyIHw9IE9wZW5pbmdzLlJJR0hUO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29ybmVyIHw9IE9wZW5pbmdzLkxFRlQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LnkgPiB5KXtcclxuICAgICAgY29ybmVyIHw9IE9wZW5pbmdzLkJPVFRPTTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5UT1A7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGllY2UuZGlyZWN0aW9uICYgY29ybmVyKSB7XHJcbiAgICAgIHRoaXMuc3dpdGNoQXR0YWNobWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb2Nrd2lzZSA9IChyb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbikgJiBjb3JuZXIpICE9PSAwO1xyXG5cclxuICAgIHRoaXMubW92ZUF0dGVtcHRDYWxsYmFjayh0aGlzLnBpZWNlLmxvY2F0aW9uLCBjbG9ja3dpc2UpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRWxlbWVudCgpIHtcclxuICAgIHRoaXMuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGVDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlUm90YXRlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRoaXMucm90YXRpb24gKyA5MCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyA5MCkgJSAzNjA7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlUm90YXRlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRoaXMucm90YXRpb24gLSA5MCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAzNjAgLSA5MCkgJSAzNjA7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGlzTG9jYXRlZEF0KGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdKXtcclxuICAgIGNvbnN0IGFyZUVxdWFsID0gKGE6IFtudW1iZXIsIG51bWJlcl0sIGI6IFtudW1iZXIsIG51bWJlcl0pID0+IGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcclxuXHJcbiAgICBpZiAoYXJlRXF1YWwobG9jYXRpb24sIHRoaXMucGllY2UubG9jYXRpb24pKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFyZUVxdWFsKGxvY2F0aW9uLCB0aGlzLmdldFBvdGVudGlhbExvY2F0aW9uKCkpKXtcclxuICAgICAgdGhpcy5zd2l0Y2hBdHRhY2htZW50KCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQb3RlbnRpYWxMb2NhdGlvbigpIDogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBjb25zdCBiYWNrID0gW09wZW5pbmdzLlRPUCwgT3BlbmluZ3MuTEVGVF0uaW5jbHVkZXModGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgdmVydGljYWwgPSBbT3BlbmluZ3MuVE9QLCBPcGVuaW5ncy5CT1RUT01dLmluY2x1ZGVzKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuXHJcbiAgICBjb25zdCBsb2M6IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy5waWVjZS5sb2NhdGlvblswXSwgdGhpcy5waWVjZS5sb2NhdGlvblsxXV07XHJcbiAgICBsb2NbdmVydGljYWwgPyAwIDogMV0gKz0gYmFjayA/IC0xIDogMTtcclxuXHJcbiAgICByZXR1cm4gbG9jO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzd2l0Y2hBdHRhY2htZW50KCkge1xyXG4gICAgdGhpcy5waWVjZS5sb2NhdGlvbiA9IHRoaXMuZ2V0UG90ZW50aWFsTG9jYXRpb24oKTtcclxuICAgIHRoaXMucGllY2UuZGlyZWN0aW9uID0gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24sIDIpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMTgwKSAlIDM2MDtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb259ZGVnKWA7XHJcblxyXG4gICAgdGhpcy5zZXRQb3NpdGlvbiguLi50aGlzLnBpZWNlLmxvY2F0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7eCAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7eSAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gIH1cclxufSIsImltcG9ydCB7VGFyZ2V0fSBmcm9tIFwiLi4vbGV2ZWxzXCI7XHJcbmltcG9ydCB7Z2V0VGFyZ2V0RmlsZU5hbWV9IGZyb20gXCIuLi9zdmdzXCI7XHJcbmltcG9ydCB7Z2V0Um90YXRpb24sIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZX0gZnJvbSBcIi4uL2RlZmluaXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFyZ2V0RWxlbWVudCB7XHJcbiAgZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcm90YXRpb246IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRhcmdldDogVGFyZ2V0LCBzY2FsaW5nOiBudW1iZXIsIHByaXZhdGUgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnc3JjJywgZ2V0VGFyZ2V0RmlsZU5hbWUodGFyZ2V0LmNvbG9yKSk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFyZ2V0Jyk7XHJcblxyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3NjYWxpbmcgKiAxMDB9JWA7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGdldFJvdGF0aW9uKHRhcmdldC5kaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKHRhcmdldC5sb2NhdGlvbiwgdGFyZ2V0LmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFBvc2l0aW9uKGxvYzogbnVtYmVyLCBkaXJlY3Rpb246IE9wZW5pbmdzKSB7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIE9wZW5pbmdzLkxFRlQ6XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBgJHtsb2MgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IHRoaXMuZWwuc3R5bGUuYm90dG9tID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE9wZW5pbmdzLkJPVFRPTTpcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHtsb2MgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IGAtMjAlYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnJpZ2h0ID0gdGhpcy5lbC5zdHlsZS50b3AgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgT3BlbmluZ3MuUklHSFQ6XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBgJHtsb2MgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnJpZ2h0ID0gYC0yMCVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IHRoaXMuZWwuc3R5bGUuYm90dG9tID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE9wZW5pbmdzLlRPUDpcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHtsb2MgKiB0aGlzLm9mZnNldCAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAtMjAlYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnJpZ2h0ID0gdGhpcy5lbC5zdHlsZS5ib3R0b20gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGRpcmVjdGlvbjogJHtkaXJlY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtDZWxsRWxlbWVudH0gZnJvbSBcIi4vZG9tL2NlbGxfZWxlbWVudFwiO1xyXG5pbXBvcnQge0xldmVsfSBmcm9tICcuL2xldmVscyc7XHJcbmltcG9ydCB7T3BlbmluZ3N9IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcbmltcG9ydCB7UGllY2VFbGVtZW50fSBmcm9tIFwiLi9kb20vcGllY2VfZWxlbWVudFwiO1xyXG5pbXBvcnQge1RhcmdldEVsZW1lbnR9IGZyb20gXCIuL2RvbS90YXJnZXRfZWxlbWVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBcmVhIHtcclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5waWVjZXNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB0aGlzLnBpZWNlc0VsTW91c2VVcChldmVudCkpO1xyXG4gIH1cclxuXHJcbiAgY2VsbHNFbDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBjZWxscycpO1xyXG4gIHBpZWNlc0VsOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtYXJlYSA+IHBpZWNlcycpO1xyXG5cclxuICBwcml2YXRlIGNlbGxzOiBDZWxsRWxlbWVudFtdW10gPSBbXTtcclxuICBwcml2YXRlIHBpZWNlczogUGllY2VFbGVtZW50W10gPSBbXTtcclxuICBwcml2YXRlIHRhcmdldHM6IFRhcmdldEVsZW1lbnRbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIHBpZWNlc0VsTW91c2VVcDogKGV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICBpbml0aWFsaXplKGxldmVsOiBMZXZlbCkge1xyXG4gICAgdGhpcy5jbGVhckJvYXJkKCk7XHJcblxyXG4gICAgY29uc3QgbiA9IGxldmVsLmNlbGxzLmxlbmd0aDtcclxuICAgIGNvbnN0IG0gPSBsZXZlbC5jZWxsc1swXS5sZW5ndGg7XHJcblxyXG4gICAgLy8gVE9ETzogYXNzdW1lcyBuIGlzIHNhbWUgYXMgbSwgYW5kIHNoYXBlIGlzIHBlcmZlY3Qgc3F1YXJlLlxyXG4gICAgY29uc3Qgc2NhbGluZyA9IDIgLyAoMiArIChuIC0gMSkgKiBNYXRoLnNxcnQoMikpO1xyXG4gICAgY29uc3QgbWFyZ2luID0gLShzY2FsaW5nICogbiAtIDEpIC8gKG4gLSAxKTtcclxuXHJcbiAgICBsZXQgaSA9IDAsIGogPSAwO1xyXG4gICAgZm9yIChsZXQgcm93IG9mIGxldmVsLmNlbGxzKSB7XHJcbiAgICAgIGNvbnN0IGN1clJvdyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBjZWxsIG9mIHJvdykge1xyXG4gICAgICAgIGNvbnN0IGN1ciA9IG5ldyBDZWxsRWxlbWVudChjZWxsLCBzY2FsaW5nLCBtYXJnaW4pO1xyXG5cclxuICAgICAgICBjdXJSb3cucHVzaChjdXIpO1xyXG4gICAgICAgIHRoaXMuY2VsbHNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG5cclxuICAgICAgICArK2o7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jZWxscy5wdXNoKGN1clJvdyk7XHJcbiAgICAgIGogPSAwO1xyXG4gICAgICArK2k7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZvciAobGV0IHBpZWNlIG9mIGxldmVsLnBpZWNlcykge1xyXG4gICAgICBjb25zdCBjdXIgPSBuZXcgUGllY2VFbGVtZW50KHBpZWNlLCBzY2FsaW5nLCBzY2FsaW5nICsgbWFyZ2luLCB0aGlzLmF0dGVtcHRUb01vdmUpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG4gICAgICB0aGlzLnBpZWNlcy5wdXNoKGN1cik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5waWVjZXNFbE1vdXNlVXAgPSAoZXZlbnQpID0+IHtcclxuICAgICAgZm9yIChsZXQgcGllY2Ugb2YgdGhpcy5waWVjZXMpIHtcclxuICAgICAgICBwaWVjZS5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgdGFyZ2V0IG9mIGxldmVsLnRhcmdldHMpIHtcclxuICAgICAgY29uc3QgY3VyID0gbmV3IFRhcmdldEVsZW1lbnQodGFyZ2V0LCBzY2FsaW5nLCBzY2FsaW5nICsgbWFyZ2luKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuICAgICAgdGhpcy50YXJnZXRzLnB1c2goY3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGVtcHRUb01vdmUgPSAobG9jYXRpb246IFtudW1iZXIsIG51bWJlcl0sIGNsb2Nrd2lzZTogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3QgW2ksIGpdID0gbG9jYXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMuY2FuUm90YXRlKGksIGopKSB7XHJcbiAgICAgIGNsb2Nrd2lzZSA/IHRoaXMuY2VsbHNbaV1bal0ucm90YXRlQ2xvY2t3aXNlKCkgOiB0aGlzLmNlbGxzW2ldW2pdLnJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzLmZpbHRlcigocGllY2UpID0+IHBpZWNlLmlzTG9jYXRlZEF0KGxvY2F0aW9uKSkuZm9yRWFjaCgocGllY2VFbCkgPT4ge1xyXG4gICAgICAgIGNsb2Nrd2lzZSA/IHBpZWNlRWwucm90YXRlQ2xvY2t3aXNlKCkgOiBwaWVjZUVsLnJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsb2Nrd2lzZSA/IHRoaXMuY2VsbHNbaV1bal0uZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5mYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXMuZmlsdGVyKChwaWVjZSkgPT4gcGllY2UuaXNMb2NhdGVkQXQobG9jYXRpb24pKS5mb3JFYWNoKChwaWVjZUVsKSA9PiB7XHJcbiAgICAgICAgY2xvY2t3aXNlID8gcGllY2VFbC5mYWlsUm90YXRlQ2xvY2t3aXNlKCkgOiBwaWVjZUVsLmZhaWxSb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhblJvdGF0ZShpOiBudW1iZXIsIGo6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGkgPiAwICYmICEodGhpcy5jZWxsc1tpIC0gMV1bal0ub3BlbmluZ3MgJiBPcGVuaW5ncy5CT1RUT00pKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaSA8IHRoaXMuY2VsbHMubGVuZ3RoIC0gMSAmJiAhKHRoaXMuY2VsbHNbaSArIDFdW2pdLm9wZW5pbmdzICYgT3BlbmluZ3MuVE9QKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGogPiAwICYmICEodGhpcy5jZWxsc1tpXVtqIC0gMV0ub3BlbmluZ3MgJiBPcGVuaW5ncy5SSUdIVCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChqIDwgdGhpcy5jZWxsc1tpXS5sZW5ndGggLSAxICYmICEodGhpcy5jZWxsc1tpXVtqICsgMV0ub3BlbmluZ3MgJiBPcGVuaW5ncy5MRUZUKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhckJvYXJkKCkge1xyXG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuY2VsbHMpIHtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjZWxsLmRlbGV0ZUVsZW1lbnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHBpZWNlIG9mIHRoaXMucGllY2VzKSB7XHJcbiAgICAgIHBpZWNlLmRlbGV0ZUVsZW1lbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHYW1lQXJlYSB7XHJcbiAgICByZXR1cm4gbmV3IEdhbWVBcmVhKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtPcGVuaW5ncywgQ29sb3JzfSBmcm9tIFwiLi9kZWZpbml0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQaWVjZSB7XHJcbiAgZGlyZWN0aW9uOiBPcGVuaW5ncztcclxuICBsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXTtcclxuICBjb2xvcjogQ29sb3JzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldCB7XHJcbiAgZGlyZWN0aW9uOiBPcGVuaW5ncztcclxuICBsb2NhdGlvbjogbnVtYmVyO1xyXG4gIGNvbG9yOiBDb2xvcnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGV2ZWwge1xyXG4gIGNlbGxzOiBPcGVuaW5nc1tdW107XHJcbiAgcGllY2VzOiBQaWVjZVtdO1xyXG4gIHRhcmdldHM6IFRhcmdldFtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0TGV2ZWwoY29kZTogc3RyaW5nKTogTGV2ZWwge1xyXG4gIGNvbnN0IFtjZWxscywgcGllY2VzLCB0YXJnZXRzXSA9IGNvZGUuc3BsaXQoJ3wnKTtcclxuXHJcbiAgY29uc3QgbGV2ZWw6IExldmVsID0ge1xyXG4gICAgY2VsbHM6IFtdLFxyXG4gICAgcGllY2VzOiBbXSxcclxuICAgIHRhcmdldHM6IFtdLFxyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9PcGVuaW5nID0gKHM6IHN0cmluZyk6IE9wZW5pbmdzID0+IHtcclxuICAgIGxldCBvcGVuaW5nOiBPcGVuaW5ncyA9IE9wZW5pbmdzLk5PTkU7XHJcbiAgICBpZiAocy5pbmNsdWRlcygncicpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLlJJR0hUO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ2InKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5CT1RUT007XHJcbiAgICBpZiAocy5pbmNsdWRlcygndCcpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLlRPUDtcclxuICAgIGlmIChzLmluY2x1ZGVzKCdsJykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuTEVGVDtcclxuXHJcbiAgICByZXR1cm4gb3BlbmluZztcclxuICB9XHJcblxyXG4gIGZvciAobGV0IHJvdyBvZiBjZWxscy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBjdXJSb3c6IE9wZW5pbmdzW10gPSBbXTtcclxuICAgIGZvciAobGV0IGNlbGwgb2Ygcm93LnNwbGl0KCcsJykpIHtcclxuICAgICAgY3VyUm93LnB1c2godG9PcGVuaW5nKGNlbGwpKTtcclxuICAgIH1cclxuICAgIGxldmVsLmNlbGxzLnB1c2goY3VyUm93KTtcclxuICB9XHJcblxyXG4gIGxldCBpID0gMDtcclxuXHJcbiAgZm9yIChsZXQgcGllY2Ugb2YgcGllY2VzLnNwbGl0KCc7JykpIHtcclxuICAgIGNvbnN0IFtvLCB4LCB5XSA9IHBpZWNlLnNwbGl0KCcsJyk7XHJcbiAgICBsZXZlbC5waWVjZXMucHVzaCh7XHJcbiAgICAgIGRpcmVjdGlvbjogdG9PcGVuaW5nKG8pLFxyXG4gICAgICBsb2NhdGlvbjogW051bWJlcih4KSwgTnVtYmVyKHkpXSxcclxuICAgICAgY29sb3I6IE9iamVjdC52YWx1ZXMoQ29sb3JzKVtpXSxcclxuICAgIH0pO1xyXG5cclxuICAgICsraTtcclxuICB9XHJcblxyXG4gIGkgPSAwO1xyXG4gIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzLnNwbGl0KCc7JykpIHtcclxuICAgIGNvbnN0IFtkLCBsXSA9IHRhcmdldC5zcGxpdCgnLCcpO1xyXG4gICAgbGV2ZWwudGFyZ2V0cy5wdXNoKHtcclxuICAgICAgZGlyZWN0aW9uOiB0b09wZW5pbmcoZCksXHJcbiAgICAgIGxvY2F0aW9uOiBOdW1iZXIobCksXHJcbiAgICAgIGNvbG9yOiBPYmplY3QudmFsdWVzKENvbG9ycylbaV0sXHJcbiAgICB9KVxyXG5cclxuICAgICsraTtcclxuICB9XHJcblxyXG4gIHJldHVybiBsZXZlbDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IExFVkVMUyA9IFtcclxuICAncmIsdGIsbGI7cmIsbHIsdGI7cmIsdHIsbGJ8bCwyLDJ8YiwwJyxcclxuICAndHIsdGIsbGI7dHIsdHIsbHI7dHIsdGIsdGx8dCwwLDA7dCwwLDE7ciwxLDE7ciwxLDJ8bCwxO3IsMTt0LDE7YiwxJyxcclxuICAndGIsbHIsdGI7dHIsdHIsdGw7dGwsdGwsdGx8dCwwLDA7YiwwLDA7ciwxLDE7bCwyLDB8ciwwO3QsMTtsLDE7ciwyJyxcclxuXVxyXG4iLCJpbXBvcnQge0NvbG9ycywgT3BlbmluZ3MsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlLCBSb3RhdGlvbn0gZnJvbSBcIi4vZGVmaW5pdGlvbnNcIjtcclxuXHJcbmNvbnN0IGNlbGxzUGF0aCA9IChjZWxsKSA9PiBgYXNzZXRzL2NlbGxzLyR7Y2VsbH0uc3ZnYDtcclxuY29uc3QgcGllY2VzUGF0aCA9IChwaWVjZSkgPT4gYGFzc2V0cy9waWVjZXMvJHtwaWVjZX0uc3ZnYDtcclxuY29uc3QgdGFyZ2V0c1BhdGggPSAocGllY2UpID0+IGBhc3NldHMvdGFyZ2V0cy8ke3BpZWNlfS5zdmdgO1xyXG5cclxuZXhwb3J0IGNsYXNzIENlbGxJbmZvIHtcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3M7XHJcbiAgcm90YXRpb24/OiBSb3RhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBpZWNlSW5mbyB7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBjb2xvcjogQ29sb3JzO1xyXG4gIHJvdGF0aW9uPzogUm90YXRpb25cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGJhcjogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnYmFyJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5CT1RUT00sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29ybmVyOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdjb3JuZXInKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLlJJR0hULFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGZ1bGw6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2Z1bGwnKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLk5PTkUsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9uZTogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnbG9uZScpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNob3ZlbDogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnc2hvdmVsJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCB8IE9wZW5pbmdzLkJPVFRPTSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaHVyaWtlbjogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnc2h1cmlrZW4nKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLlJJR0hUIHwgT3BlbmluZ3MuQk9UVE9NIHwgT3BlbmluZ3MuTEVGVCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDRUxMUyA9IFtiYXIsIGNvcm5lciwgZnVsbCwgbG9uZSwgc2hvdmVsLCBzaHVyaWtlbl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VsbEluZm8ob3BlbmluZ3M6IE9wZW5pbmdzKTogQ2VsbEluZm97XHJcbiAgY29uc3Qgcm90YXRpb25zOiBSb3RhdGlvbltdID0gWzAsIDkwLCAxODAsIDI3MF07XHJcblxyXG4gIGZvcihsZXQgcm90YXRpb24gb2Ygcm90YXRpb25zKXtcclxuICAgIGZvcihsZXQgY2VsbCBvZiBDRUxMUyl7XHJcbiAgICAgIGlmIChvcGVuaW5ncyA9PT0gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2UoY2VsbC5pbml0aWFsT3BlbmluZ3MsIHJvdGF0aW9uIC8gOTApKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uY2VsbCxcclxuICAgICAgICAgIHJvdGF0aW9uOiByb3RhdGlvbixcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQaWVjZUZpbGVOYW1lKHBpZWNlOiBDb2xvcnMpOiBzdHJpbmd7XHJcbiAgcmV0dXJuIHBpZWNlc1BhdGgocGllY2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0RmlsZU5hbWUodGFyZ2V0OiBDb2xvcnMpOiBzdHJpbmd7XHJcbiAgcmV0dXJuIHRhcmdldHNQYXRoKHRhcmdldCk7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHtHYW1lQXJlYX0gZnJvbSBcIi4vZ2FtZV9hcmVhXCI7XHJcbmltcG9ydCB7Y29uc3RydWN0TGV2ZWwsIExFVkVMU30gZnJvbSAnLi9sZXZlbHMnO1xyXG5cclxuY29uc3QgZ2FtZUFyZWEgPSBHYW1lQXJlYS5nZXRJbnN0YW5jZSgpO1xyXG5cclxuZ2FtZUFyZWEuaW5pdGlhbGl6ZShjb25zdHJ1Y3RMZXZlbChMRVZFTFNbMV0pKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=