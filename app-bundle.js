/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../\u0000#Web/rotation-station/src/definitions.ts":
/*!*******************************************************!*\
  !*** ../../ #Web/rotation-station/src/definitions.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRotation = exports.cycleOpenings = exports.rotateOpeningsAntiClockwise = exports.rotateOpeningsClockwise = exports.Corners = exports.Colors = exports.Openings = void 0;
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
var openingsCycle = [
    0,
    12,
    6,
    3,
    9,
    10,
    5,
    14,
    7,
    11,
    13,
    8,
    4,
    2,
    1,
    15,
];
function cycleOpenings(openings, backwards) {
    if (backwards === void 0) { backwards = false; }
    var idx = openingsCycle.findIndex(function (v) { return v === openings; });
    var nxt = (idx + (backwards ? 15 : 1)) % 16;
    return openingsCycle[nxt];
}
exports.cycleOpenings = cycleOpenings;
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
    function CellElement(openings, scaling, offset, i, j) {
        this.el = document.createElement('img');
        this.el.setAttribute('draggable', 'false');
        this.updateOpenings(openings);
        this.adjust(scaling, offset, i, j);
    }
    CellElement.prototype.updateOpenings = function (openings) {
        this.openings = openings;
        var cellInfo = (0, svgs_1.getCellInfo)(openings);
        this.rotation = cellInfo.rotation;
        this.el.style.transform = "rotate(".concat(cellInfo.rotation, "deg)");
        this.el.setAttribute('src', cellInfo.fileName);
    };
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
    CellElement.prototype.adjust = function (edge, offset, i, j) {
        this.el.style.width = "".concat(edge * 100, "%");
        this.el.style.height = "".concat(edge * 100, "%");
        this.el.style.left = "".concat(offset * j * 100, "%");
        this.el.style.top = "".concat(offset * i * 100, "%");
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
        this.el.style.height = "".concat(scaling * 100, "%");
        this.rotation = (0, definitions_1.getRotation)(piece.direction);
        this.el.style.transform = "rotate(".concat(this.rotation, "deg)");
        this.setPosition.apply(this, piece.location);
        this.el.addEventListener('mousedown', function (event) {
            _this.mouseDown = [event.x, event.y];
        });
        this.el.addEventListener('touchstart', function (event) {
            if (event.touches[0]) {
                _this.mouseDown = [event.touches[0].clientX, event.touches[0].clientY];
            }
        });
    }
    PieceElement.prototype.onMouseUp = function (x, y) {
        if (this.mouseDown == null) {
            return;
        }
        var _a = this.mouseDown, xlast = _a[0], ylast = _a[1];
        this.mouseDown = null;
        var corner = 0;
        if (x > xlast) {
            corner |= definitions_1.Openings.RIGHT;
        }
        else {
            corner |= definitions_1.Openings.LEFT;
        }
        if (y > ylast) {
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
        this.el.style.height = "".concat(scaling * 100, "%");
        this.rotation = (0, definitions_1.getRotation)(target.direction);
        this.el.style.transform = "rotate(".concat(this.rotation, "deg)");
        this.setPosition(target.location, target.direction);
    }
    TargetElement.prototype.deleteElement = function () {
        this.el.remove();
    };
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
    function GameArea(cellsSelector, piecesSelector) {
        var _this = this;
        this.cells = [];
        this.pieces = [];
        this.targets = [];
        this.isDirty = false;
        this.attemptToMove = function (location, clockwise) {
            var i = location[0], j = location[1];
            if (_this.canRotate(i, j)) {
                _this.isDirty = true;
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
        this.cellsEl = document.querySelector('game-area > cells');
        this.piecesEl = document.querySelector('game-area > pieces');
    }
    GameArea.prototype.initialize = function (level) {
        var _this = this;
        this.clearBoard();
        var n = level.cells.length;
        var m = level.cells[0].length;
        // TODO: assumes n is same as m, and shape is perfect square.
        var scaling = 2 / (2 + (n - 1) * Math.sqrt(2));
        var offset = (1 - scaling) / (n - 1);
        var i = 0, j = 0;
        for (var _i = 0, _a = level.cells; _i < _a.length; _i++) {
            var row = _a[_i];
            var curRow = [];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var cell = row_1[_b];
                var cur = new cell_element_1.CellElement(cell, scaling, offset, i, j);
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
            var cur = new piece_element_1.PieceElement(piece, scaling, offset, this.attemptToMove);
            this.piecesEl.appendChild(cur.el);
            this.pieces.push(cur);
        }
        this.piecesElMouseUp = function (x, y) {
            for (var _i = 0, _a = _this.pieces; _i < _a.length; _i++) {
                var piece = _a[_i];
                piece.onMouseUp(x, y);
            }
        };
        for (var _e = 0, _f = level.targets; _e < _f.length; _e++) {
            var target = _f[_e];
            var cur = new target_element_1.TargetElement(target, scaling, offset);
            this.piecesEl.appendChild(cur.el);
            this.targets.push(cur);
        }
    };
    GameArea.prototype.levelEditor = function (n, m) {
        this.clearBoard();
        // TODO: assumes n is same as m, and shape is perfect square.
        var scaling = 2 / (2 + (n - 1) * Math.sqrt(2));
        var offset = (1 - scaling) / (n - 1);
        var i = 0, j = 0;
        for (var i_1 = 0; i_1 < n; ++i_1) {
            var curRow = [];
            var _loop_1 = function (j_1) {
                var cur = new cell_element_1.CellElement(definitions_1.Openings.NONE, scaling, offset, i_1, j_1);
                curRow.push(cur);
                cur.el.addEventListener('click', function () {
                    cur.updateOpenings((0, definitions_1.cycleOpenings)(cur.openings));
                });
                cur.el.addEventListener('contextmenu', function (e) {
                    cur.updateOpenings((0, definitions_1.cycleOpenings)(cur.openings, true));
                    e.preventDefault();
                });
                this_1.cellsEl.appendChild(cur.el);
            };
            var this_1 = this;
            for (var j_1 = 0; j_1 < m; ++j_1) {
                _loop_1(j_1);
            }
            this.cells.push(curRow);
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
        this.cellsEl.style.zIndex = null;
        this.piecesEl.style.zIndex = null;
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
        for (var _e = 0, _f = this.targets; _e < _f.length; _e++) {
            var target = _f[_e];
            target.deleteElement();
        }
        this.cells = [];
        this.pieces = [];
        this.targets = [];
        this.isDirty = false;
    };
    return GameArea;
}());
exports.GameArea = GameArea;


/***/ }),

/***/ "../../\u0000#Web/rotation-station/src/level_controls.ts":
/*!**********************************************************!*\
  !*** ../../ #Web/rotation-station/src/level_controls.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LevelControls = void 0;
var levels_1 = __webpack_require__(/*! ./levels */ "../../\u0000#Web/rotation-station/src/levels.ts");
var LevelControls = /** @class */ (function () {
    function LevelControls(levelsSelector, editorSelector) {
        this.levelsEls = [];
        this.editorControls = {
            pieces: null,
            cells: null,
            editor: null,
        };
        this.levelsEl = document.querySelector(levelsSelector);
        this.editorEl = document.querySelector(editorSelector);
        this.editorEl.style.display = "none";
    }
    LevelControls.prototype.initialize = function (gameArea, levels) {
        this.initializeLevelSelectors(gameArea, levels);
        this.initializeLevelEditorSelector(gameArea);
        this.initializeLevelEditorControls(gameArea);
    };
    LevelControls.prototype.initializeLevelSelectors = function (gameArea, levels) {
        var _this = this;
        this.levelsEls = [];
        var _loop_1 = function (i) {
            var levelButton = this_1.createRadio(this_1.levelsEl, "lvl".concat(i + 1), String(i + 1), levels[i].difficulty, 'level');
            levelButton.addEventListener('click', function (event) {
                if (!gameArea.isDirty || confirm("Are you sure you want to change the level?")) {
                    gameArea.initialize((0, levels_1.constructLevel)(levels[i].description));
                    _this.editorEl.style.display = 'none';
                }
                else {
                    event.preventDefault();
                }
            });
            this_1.levelsEls.push(levelButton);
        };
        var this_1 = this;
        for (var i = 0; i < levels.length; ++i) {
            _loop_1(i);
        }
    };
    LevelControls.prototype.initializeLevelEditorSelector = function (gameArea) {
        var _this = this;
        this.editorControls.editor = this.createRadio(this.levelsEl, "custom", 'editor', 'master', 'level');
        this.editorControls.editor.addEventListener('click', function (event) {
            if (confirm("Go to level editor (experimental)?")) {
                gameArea.levelEditor(3, 3);
                _this.editorEl.style.display = null;
                _this.editorControls.cells.click();
            }
            else {
                event.preventDefault();
            }
        });
    };
    LevelControls.prototype.initializeLevelEditorControls = function (gameArea) {
        this.editorControls.pieces = this.createRadio(this.editorEl, 'pieces', 'pieces', 'master', 'controls');
        this.editorControls.pieces.addEventListener('click', function (event) {
            gameArea.piecesEl.style.zIndex = '1';
            gameArea.cellsEl.style.zIndex = null;
        });
        this.editorControls.cells = this.createRadio(this.editorEl, 'cells', 'cells', 'master', 'controls');
        this.editorControls.cells.addEventListener('click', function (event) {
            gameArea.cellsEl.style.zIndex = '1';
            gameArea.piecesEl.style.zIndex = null;
        });
    };
    LevelControls.prototype.createRadio = function (el, id, text, className, family) {
        var radioEl = document.createElement("input");
        radioEl.setAttribute("type", "radio");
        radioEl.id = id;
        radioEl.name = family;
        var labelEl = document.createElement("label");
        labelEl.htmlFor = radioEl.id;
        labelEl.innerText = text;
        labelEl.className = className;
        el.appendChild(radioEl);
        el.appendChild(labelEl);
        return radioEl;
    };
    LevelControls.prototype.setLevel = function (index) {
        this.levelsEls[index].click();
    };
    return LevelControls;
}());
exports.LevelControls = LevelControls;


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
    { difficulty: 'starter', description: 'rb,tb,lb;rb,lr,tb;rb,tr,lb|l,2,2|b,0' },
    { difficulty: 'starter', description: 'lr,tb,lr;tr,bl,tl;tr,tl,tl|r,2,0|r,2' },
    { difficulty: 'starter', description: 'tr,tb,lb;tr,tr,lr;tr,tb,tl|t,0,0;t,0,1;r,1,1;r,1,2|l,1;r,1;t,1;b,1' },
    { difficulty: 'junior', description: 'tb,lr,lr;tr,tr,tr;tl,tl,tl|t,0,0;b,0,0;l,2,0|r,0;l,1;r,2' },
    { difficulty: 'expert', description: 'lr,lr,lb;tl,tl,tl;tb,tl,tl|b,0,2;b,2,0|b,0;r,1' },
    { difficulty: 'master', description: 'tb,lr,tb;tr,tr,tl;tl,tl,tl|t,0,0;b,0,0;r,1,1;l,2,0|r,0;t,1;l,1;r,2' }, //59
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
    throw new Error("unable to find info for ".concat(openings));
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
var level_controls_1 = __webpack_require__(/*! ./level_controls */ "../../\u0000#Web/rotation-station/src/level_controls.ts");
var levels_1 = __webpack_require__(/*! ./levels */ "../../\u0000#Web/rotation-station/src/levels.ts");
var gameArea = new game_area_1.GameArea('game-area > cells', 'game-area > pieces');
document.body.addEventListener('mouseup', function (event) { return gameArea.piecesElMouseUp(event.x, event.y); });
document.body.addEventListener('touchend', function (event) { return event.changedTouches[0] && gameArea.piecesElMouseUp(event.changedTouches[0].clientX, event.changedTouches[0].clientY); });
var levelControls = new level_controls_1.LevelControls('controls[levels]', 'controls[editor]');
levelControls.initialize(gameArea, levels_1.LEVELS);
levelControls.setLevel(0);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2xCLHVDQUFRO0lBQ1IsMkNBQVU7SUFDVix5Q0FBUztJQUNULHFDQUFPO0lBQ1AsdUNBQVE7QUFDVixDQUFDLEVBTlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNbkI7QUFFRCxJQUFZLE1BT1g7QUFQRCxXQUFZLE1BQU07SUFDaEIsdUJBQWE7SUFDYix1QkFBYTtJQUNiLHlCQUFlO0lBQ2YscUJBQVc7SUFDWCwyQkFBaUI7SUFDakIsMkJBQWlCO0FBQ25CLENBQUMsRUFQVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFPakI7QUFJRCxJQUFZLE9BS1g7QUFMRCxXQUFZLE9BQU87SUFDakIsOENBQXVDO0lBQ3ZDLCtDQUF5QztJQUN6QyxtREFBNkM7SUFDN0MscURBQStDO0FBQ2pELENBQUMsRUFMVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFLbEI7QUFHRCxTQUFnQix1QkFBdUIsQ0FBQyxRQUFrQixFQUFFLENBQUs7SUFBTCx5QkFBSztJQUMvRCxPQUFPLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQU0sQ0FBQztBQUMxRCxDQUFDO0FBRkQsMERBRUM7QUFFRCxTQUFnQiwyQkFBMkIsQ0FBQyxRQUFrQixFQUFFLENBQUs7SUFBTCx5QkFBSztJQUNuRSxPQUFPLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQU0sQ0FBQztBQUMxRCxDQUFDO0FBRkQsa0VBRUM7QUFFRCxJQUFNLGFBQWEsR0FBZTtJQUNoQyxDQUFNO0lBQ04sRUFBTTtJQUNOLENBQU07SUFDTixDQUFNO0lBQ04sQ0FBTTtJQUNOLEVBQU07SUFDTixDQUFNO0lBQ04sRUFBTTtJQUNOLENBQU07SUFDTixFQUFNO0lBQ04sRUFBTTtJQUNOLENBQU07SUFDTixDQUFNO0lBQ04sQ0FBTTtJQUNOLENBQU07SUFDTixFQUFNO0NBQ1AsQ0FBQztBQUVGLFNBQWdCLGFBQWEsQ0FBQyxRQUFrQixFQUFFLFNBQWlCO0lBQWpCLDZDQUFpQjtJQUNqRSxJQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLFFBQUMsS0FBSyxRQUFRLEVBQWQsQ0FBYyxDQUFDLENBQUM7SUFDM0QsSUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUMsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUpELHNDQUlDO0FBQ0Qsa0RBQWtEO0FBQ2xELFNBQWdCLFdBQVcsQ0FBQyxPQUFpQjtJQUMzQyxRQUFPLE9BQU8sRUFBQztRQUNiLEtBQUssUUFBUSxDQUFDLElBQUk7WUFDaEIsT0FBTyxDQUFDLENBQUM7UUFDWCxLQUFLLFFBQVEsQ0FBQyxHQUFHO1lBQ2YsT0FBTyxFQUFFLENBQUM7UUFDWixLQUFLLFFBQVEsQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsS0FBSyxRQUFRLENBQUMsTUFBTTtZQUNsQixPQUFPLEdBQUcsQ0FBQztRQUNiO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBZ0MsT0FBTyxNQUFHLENBQUMsQ0FBQztLQUMvRDtBQUNILENBQUM7QUFiRCxrQ0FhQzs7Ozs7Ozs7Ozs7Ozs7QUN6RUQsU0FBZ0IsYUFBYSxDQUFDLE9BQW9CLEVBQUUsS0FBYSxFQUFFLEdBQVc7SUFFNUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQVUsR0FBRyxTQUFNO0lBRTdDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDZCxFQUFFLFNBQVMsRUFBRSxpQkFBVSxLQUFLLFNBQU0sRUFBRTtRQUNwQyxFQUFFLFNBQVMsRUFBRSxpQkFBVSxHQUFHLFNBQU0sRUFBRTtLQUNuQyxFQUFFO1FBQ0QsUUFBUSxFQUFFLEdBQUc7UUFDYixNQUFNLEVBQUUsTUFBTTtLQUNmLENBQUM7QUFDSixDQUFDO0FBWEQsc0NBV0M7QUFFRCxTQUFnQixjQUFjLENBQUMsT0FBb0IsRUFBRSxLQUFhLEVBQUUsU0FBa0I7SUFFcEYsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDZCxFQUFFLFNBQVMsRUFBRSxpQkFBVSxLQUFLLFNBQU0sRUFBRTtRQUNwQyxFQUFFLFNBQVMsRUFBRSxpQkFBVSxLQUFLLEdBQUMsS0FBSyxTQUFNLEVBQUU7UUFDMUMsRUFBRSxTQUFTLEVBQUUsaUJBQVUsS0FBSyxTQUFNLEVBQUU7UUFDcEMsRUFBRSxTQUFTLEVBQUUsaUJBQVUsS0FBSyxHQUFDLEtBQUssU0FBTSxFQUFFO1FBQzFDLEVBQUUsU0FBUyxFQUFFLGlCQUFVLEtBQUssU0FBTSxFQUFFO0tBQ3JDLEVBQUU7UUFDRCxRQUFRLEVBQUUsR0FBRztRQUNiLFVBQVUsRUFBRSxDQUFDO0tBQ2QsQ0FBQztBQUNKLENBQUM7QUFkRCx3Q0FjQzs7Ozs7Ozs7Ozs7Ozs7QUMzQkQsc0hBQThGO0FBQzlGLGlHQUFvQztBQUNwQyxtSEFBMEQ7QUFFMUQ7SUFLRSxxQkFBWSxRQUFrQixFQUFFLE9BQWUsRUFBRSxNQUFjLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDbkYsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxRQUFrQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixJQUFNLFFBQVEsR0FBRyxzQkFBVyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQVUsUUFBUSxDQUFDLFFBQVEsU0FBTSxDQUFDO1FBQzVELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELG1DQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0UsNkJBQWEsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyx5Q0FBdUIsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHlDQUFtQixHQUFuQjtRQUNFLDZCQUFhLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLDZDQUEyQixFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQseUNBQW1CLEdBQW5CO1FBQ0UsOEJBQWMsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDZDQUF1QixHQUF2QjtRQUNFLDhCQUFjLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLE1BQWMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUN2RCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBRyxJQUFJLEdBQUMsR0FBRyxNQUFHLENBQUM7UUFDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQUcsSUFBSSxHQUFDLEdBQUcsTUFBRyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFHLENBQUM7UUFDNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQUcsQ0FBQztJQUM3QyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDO0FBckRZLGtDQUFXOzs7Ozs7Ozs7Ozs7OztBQ0p4QixzSEFBb0g7QUFDcEgsbUhBQTBEO0FBRTFELGlHQUF5QztBQUl6QztJQU1FLHNCQUFtQixLQUFZLEVBQUUsT0FBZSxFQUFVLE1BQWMsRUFBVSxtQkFBd0M7UUFBMUgsaUJBd0JDO1FBeEJrQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQTJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hILElBQUksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLDJCQUFnQixFQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBRyxPQUFPLEdBQUcsR0FBRyxNQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQUcsT0FBTyxHQUFHLEdBQUcsTUFBRyxDQUFDO1FBRTNDLElBQUksQ0FBQyxRQUFRLEdBQUcsNkJBQVcsRUFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFVLElBQUksQ0FBQyxRQUFRLFNBQU0sQ0FBQztRQUV4RCxJQUFJLENBQUMsV0FBVyxPQUFoQixJQUFJLEVBQWdCLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFFcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFpQjtZQUN0RCxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFDLEtBQWlCO1lBQ3ZELElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDWixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFDO1lBQ3pCLE9BQU87U0FDUjtRQUVLLFNBQWlCLElBQUksQ0FBQyxTQUFTLEVBQTlCLEtBQUssVUFBRSxLQUFLLFFBQWtCLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxNQUFNLEdBQVksQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBQztZQUNaLE1BQU0sSUFBSSxzQkFBUSxDQUFDLEtBQUssQ0FBQztTQUMxQjthQUFNO1lBQ0wsTUFBTSxJQUFJLHNCQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFDO1lBQ1osTUFBTSxJQUFJLHNCQUFRLENBQUMsTUFBTSxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNLElBQUksc0JBQVEsQ0FBQyxHQUFHLENBQUM7U0FDeEI7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtRQUVELElBQU0sU0FBUyxHQUFHLENBQUMseUNBQXVCLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0NBQWUsR0FBZjtRQUNFLDZCQUFhLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHlDQUF1QixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELDBDQUFtQixHQUFuQjtRQUNFLDZCQUFhLEVBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyw2Q0FBMkIsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCwwQ0FBbUIsR0FBbkI7UUFDRSw4QkFBYyxFQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsOENBQXVCLEdBQXZCO1FBQ0UsOEJBQWMsRUFBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxRQUEwQjtRQUNwQyxJQUFNLFFBQVEsR0FBRyxVQUFDLENBQW1CLEVBQUUsQ0FBbUIsSUFBSyxRQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTlCLENBQThCLENBQUM7UUFFOUYsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFDO1lBQ2xELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRU8sMkNBQW9CLEdBQTVCO1FBQ0UsSUFBTSxJQUFJLEdBQUcsQ0FBQyxzQkFBUSxDQUFDLEdBQUcsRUFBRSxzQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLElBQU0sUUFBUSxHQUFHLENBQUMsc0JBQVEsQ0FBQyxHQUFHLEVBQUUsc0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVoRixJQUFNLEdBQUcsR0FBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVPLHVDQUFnQixHQUF4QjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHlDQUF1QixFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQVUsSUFBSSxDQUFDLFFBQVEsU0FBTSxDQUFDO1FBRXhELElBQUksQ0FBQyxXQUFXLE9BQWhCLElBQUksRUFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7SUFDM0MsQ0FBQztJQUVPLGtDQUFXLEdBQW5CLFVBQW9CLENBQVMsRUFBRSxDQUFTO1FBQ3RDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBRyxDQUFDO1FBQ2hELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBRyxDQUFDO0lBQ25ELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUM7QUEzSFksb0NBQVk7Ozs7Ozs7Ozs7Ozs7O0FDTnpCLGlHQUEwQztBQUMxQyxzSEFBOEU7QUFFOUU7SUFJRSx1QkFBbUIsTUFBYyxFQUFFLE9BQWUsRUFBVSxNQUFjO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBMkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4RSxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSw0QkFBaUIsRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQUcsT0FBTyxHQUFHLEdBQUcsTUFBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFHLE9BQU8sR0FBRyxHQUFHLE1BQUcsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFHLDZCQUFXLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBVSxJQUFJLENBQUMsUUFBUSxTQUFNLENBQUM7UUFFeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLG1DQUFXLEdBQW5CLFVBQW9CLEdBQVcsRUFBRSxTQUFtQjtRQUNsRCxRQUFRLFNBQVMsRUFBRTtZQUNqQixLQUFLLHNCQUFRLENBQUMsSUFBSTtnQkFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxNQUFHLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN2RCxNQUFNO1lBQ1IsS0FBSyxzQkFBUSxDQUFDLE1BQU07Z0JBQ2xCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBRyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztnQkFDcEQsTUFBTTtZQUNSLEtBQUssc0JBQVEsQ0FBQyxLQUFLO2dCQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLE1BQUcsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ3RELE1BQU07WUFDUixLQUFLLHNCQUFRLENBQUMsR0FBRztnQkFDZixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLE1BQUcsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ3ZELE1BQU07WUFDUjtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUF5QixTQUFTLENBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQztBQWxEWSxzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7QUNKMUIsZ0lBQStDO0FBRS9DLHFIQUFzRDtBQUN0RCxtSUFBaUQ7QUFDakQsc0lBQW1EO0FBRW5EO0lBQ0Usa0JBQVksYUFBcUIsRUFBRSxjQUFzQjtRQUF6RCxpQkFHQztRQUtPLFVBQUssR0FBb0IsRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBbUIsRUFBRSxDQUFDO1FBQzVCLFlBQU8sR0FBb0IsRUFBRSxDQUFDO1FBSXRDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFrRGhCLGtCQUFhLEdBQUcsVUFBQyxRQUEwQixFQUFFLFNBQWtCO1lBQ3RELEtBQUMsR0FBTyxRQUFRLEdBQWYsRUFBRSxDQUFDLEdBQUksUUFBUSxHQUFaLENBQWE7WUFFeEIsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBRXBCLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUV4RixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN4RSxDQUFDLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2dCQUVoRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ2hGLENBQUMsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQWpGQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBYUQsNkJBQVUsR0FBVixVQUFXLEtBQVk7UUFBdkIsaUJBOENDO1FBN0NDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVoQyw2REFBNkQ7UUFDN0QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFnQixVQUFXLEVBQVgsVUFBSyxDQUFDLEtBQUssRUFBWCxjQUFXLEVBQVgsSUFBVyxFQUFFO1lBQXhCLElBQUksR0FBRztZQUNWLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixLQUFpQixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRyxFQUFFO2dCQUFqQixJQUFJLElBQUk7Z0JBQ1gsSUFBTSxHQUFHLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVqQyxFQUFFLENBQUMsQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDO1NBQ0w7UUFHRCxLQUFrQixVQUFZLEVBQVosVUFBSyxDQUFDLE1BQU0sRUFBWixjQUFZLEVBQVosSUFBWSxFQUFFO1lBQTNCLElBQUksS0FBSztZQUNaLElBQU0sR0FBRyxHQUFHLElBQUksNEJBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFCLEtBQWtCLFVBQVcsRUFBWCxVQUFJLENBQUMsTUFBTSxFQUFYLGNBQVcsRUFBWCxJQUFXLEVBQUU7Z0JBQTFCLElBQUksS0FBSztnQkFDWixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUM7UUFFRCxLQUFtQixVQUFhLEVBQWIsVUFBSyxDQUFDLE9BQU8sRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO1lBQTdCLElBQUksTUFBTTtZQUNiLElBQU0sR0FBRyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFzQkQsOEJBQVcsR0FBWCxVQUFZLENBQVMsRUFBRSxDQUFTO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQiw2REFBNkQ7UUFDN0QsSUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixLQUFLLElBQUksR0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBQyxFQUFFO1lBQzFCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztvQ0FDVCxHQUFDO2dCQUNSLElBQU0sR0FBRyxHQUFHLElBQUksMEJBQVcsQ0FBQyxzQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFakIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQy9CLEdBQUcsQ0FBQyxjQUFjLENBQUMsK0JBQWEsRUFBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsVUFBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsY0FBYyxDQUFDLCtCQUFhLEVBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7OztZQVpuQyxLQUFLLElBQUksR0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBQzt3QkFBakIsR0FBQzthQWNUO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FFekI7SUFDSCxDQUFDO0lBRU8sNEJBQVMsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLENBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsc0JBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0QsT0FBTyxLQUFLLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxzQkFBUSxDQUFDLEdBQUcsQ0FBQztZQUM5RSxPQUFPLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLHNCQUFRLENBQUMsS0FBSyxDQUFDO1lBQzVELE9BQU8sS0FBSyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsc0JBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEYsT0FBTyxLQUFLLENBQUM7UUFFZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyw2QkFBVSxHQUFsQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQyxLQUFnQixVQUFVLEVBQVYsU0FBSSxDQUFDLEtBQUssRUFBVixjQUFVLEVBQVYsSUFBVSxFQUFFO1lBQXZCLElBQUksR0FBRztZQUNWLEtBQWlCLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHLEVBQUU7Z0JBQWpCLElBQUksSUFBSTtnQkFDWCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7U0FDRjtRQUVELEtBQWtCLFVBQVcsRUFBWCxTQUFJLENBQUMsTUFBTSxFQUFYLGNBQVcsRUFBWCxJQUFXLEVBQUU7WUFBMUIsSUFBSSxLQUFLO1lBQ1osS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsS0FBbUIsVUFBWSxFQUFaLFNBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVksRUFBRTtZQUE1QixJQUFJLE1BQU07WUFDYixNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUM7QUF4SlksNEJBQVE7Ozs7Ozs7Ozs7Ozs7O0FDTnJCLHNHQUEwRDtBQUcxRDtJQUNFLHVCQUFZLGNBQXNCLEVBQUUsY0FBc0I7UUFTMUQsY0FBUyxHQUFrQixFQUFFLENBQUM7UUFFOUIsbUJBQWMsR0FBb0U7WUFDaEYsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxJQUFJO1NBQ2I7UUFkQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQWFELGtDQUFVLEdBQVYsVUFBVyxRQUFrQixFQUFFLE1BQTBCO1FBQ3ZELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8sZ0RBQXdCLEdBQWhDLFVBQWlDLFFBQWtCLEVBQUUsTUFBMEI7UUFBL0UsaUJBaUJDO1FBaEJDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dDQUVYLENBQUM7WUFDUixJQUFNLFdBQVcsR0FBRyxPQUFLLFdBQVcsQ0FBQyxPQUFLLFFBQVEsRUFBRSxhQUFNLENBQUMsR0FBQyxDQUFDLENBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFN0csV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyw0Q0FBNEMsQ0FBQyxFQUFDO29CQUM3RSxRQUFRLENBQUMsVUFBVSxDQUFDLDJCQUFjLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzNELEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQ3RDO3FCQUFLO29CQUNKLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQUssU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O1FBWm5DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFBN0IsQ0FBQztTQWFUO0lBQ0gsQ0FBQztJQUVPLHFEQUE2QixHQUFyQyxVQUFzQyxRQUFrQjtRQUF4RCxpQkFZQztRQVhDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVuRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLO1lBQ3pELElBQUksT0FBTyxDQUFDLG9DQUFvQyxDQUFDLEVBQUU7Z0JBQ2pELFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNuQztpQkFBTTtnQkFDTCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxxREFBNkIsR0FBckMsVUFBc0MsUUFBa0I7UUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7WUFDekQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNyQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLO1lBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDcEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sbUNBQVcsR0FBbkIsVUFBb0IsRUFBZSxFQUFFLEVBQVUsRUFBRSxJQUFZLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1FBQzlGLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFFdEIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFOUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUM7QUEzRlksc0NBQWE7Ozs7Ozs7Ozs7Ozs7O0FDSDFCLHFIQUErQztBQW9CL0MsU0FBZ0IsY0FBYyxDQUFDLElBQVk7SUFDbkMsU0FBMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBekMsS0FBSyxVQUFFLE1BQU0sVUFBRSxPQUFPLFFBQW1CLENBQUM7SUFFakQsSUFBTSxLQUFLLEdBQVU7UUFDbkIsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtRQUNWLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFFRCxJQUFNLFNBQVMsR0FBRyxVQUFDLENBQVM7UUFDMUIsSUFBSSxPQUFPLEdBQWEsc0JBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxzQkFBUSxDQUFDLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLHNCQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2hELElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksc0JBQVEsQ0FBQyxHQUFHLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxzQkFBUSxDQUFDLElBQUksQ0FBQztRQUU5QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsS0FBZ0IsVUFBZ0IsRUFBaEIsVUFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBRTtRQUE3QixJQUFJLEdBQUc7UUFDVixJQUFNLE1BQU0sR0FBZSxFQUFFLENBQUM7UUFDOUIsS0FBaUIsVUFBYyxFQUFkLFFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWQsY0FBYyxFQUFkLElBQWMsRUFBRTtZQUE1QixJQUFJLElBQUk7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUI7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFVixLQUFrQixVQUFpQixFQUFqQixXQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixjQUFpQixFQUFqQixJQUFpQixFQUFFO1FBQWhDLElBQUksS0FBSztRQUNOLFNBQVksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBQyxVQUFFLENBQUMsVUFBRSxDQUFDLFFBQW9CLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDO0tBQ0w7SUFFRCxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ04sS0FBbUIsVUFBa0IsRUFBbEIsWUFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0IsRUFBRTtRQUFsQyxJQUFJLE1BQU07UUFDUCxTQUFTLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXpCLENBQUMsVUFBRSxDQUFDLFFBQXFCLENBQUM7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDakIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUM7S0FDTDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQXJERCx3Q0FxREM7QUFPWSxjQUFNLEdBQXVCO0lBQ3hDLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsc0NBQXNDLEVBQUM7SUFDNUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxzQ0FBc0MsRUFBQztJQUM1RSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG9FQUFvRSxFQUFDO0lBQzFHLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsMERBQTBELEVBQUM7SUFDL0YsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxnREFBZ0QsRUFBQztJQUNyRixFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLG9FQUFvRSxFQUFDLEVBQUUsSUFBSTtDQUNoSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGRCxxSEFBa0Y7QUFFbEYsSUFBTSxTQUFTLEdBQUcsVUFBQyxJQUFJLElBQUssOEJBQWdCLElBQUksU0FBTSxFQUExQixDQUEwQixDQUFDO0FBQ3ZELElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBSyxJQUFLLCtCQUFpQixLQUFLLFNBQU0sRUFBNUIsQ0FBNEIsQ0FBQztBQUMzRCxJQUFNLFdBQVcsR0FBRyxVQUFDLEtBQUssSUFBSyxnQ0FBa0IsS0FBSyxTQUFNLEVBQTdCLENBQTZCLENBQUM7QUFFN0Q7SUFBQTtJQUlBLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FBQztBQUpZLDRCQUFRO0FBTXJCO0lBQUE7SUFJQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDO0FBSlksOEJBQVM7QUFNVCxXQUFHLEdBQWE7SUFDM0IsUUFBUSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDMUIsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRyxHQUFHLHNCQUFRLENBQUMsTUFBTTtDQUNoRCxDQUFDO0FBRVcsY0FBTSxHQUFhO0lBQzlCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdCLGVBQWUsRUFBRSxzQkFBUSxDQUFDLEdBQUcsR0FBRyxzQkFBUSxDQUFDLEtBQUs7Q0FDL0MsQ0FBQztBQUVXLFlBQUksR0FBYTtJQUM1QixRQUFRLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUMzQixlQUFlLEVBQUUsc0JBQVEsQ0FBQyxJQUFJO0NBQy9CLENBQUM7QUFFVyxZQUFJLEdBQWE7SUFDNUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDM0IsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRztDQUM5QixDQUFDO0FBRVcsY0FBTSxHQUFhO0lBQzlCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzdCLGVBQWUsRUFBRSxzQkFBUSxDQUFDLEdBQUcsR0FBRyxzQkFBUSxDQUFDLEtBQUssR0FBRyxzQkFBUSxDQUFDLE1BQU07Q0FDakUsQ0FBQztBQUVXLGdCQUFRLEdBQWE7SUFDaEMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDL0IsZUFBZSxFQUFFLHNCQUFRLENBQUMsR0FBRyxHQUFHLHNCQUFRLENBQUMsS0FBSyxHQUFHLHNCQUFRLENBQUMsTUFBTSxHQUFHLHNCQUFRLENBQUMsSUFBSTtDQUNqRixDQUFDO0FBRVcsYUFBSyxHQUFHLENBQUMsV0FBRyxFQUFFLGNBQU0sRUFBRSxZQUFJLEVBQUUsWUFBSSxFQUFFLGNBQU0sRUFBRSxnQkFBUSxDQUFDLENBQUM7QUFFakUsU0FBZ0IsV0FBVyxDQUFDLFFBQWtCO0lBQzVDLElBQU0sU0FBUyxHQUFlLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFaEQsS0FBb0IsVUFBUyxFQUFULHVCQUFTLEVBQVQsdUJBQVMsRUFBVCxJQUFTLEVBQUM7UUFBMUIsSUFBSSxRQUFRO1FBQ2QsS0FBZ0IsVUFBSyxFQUFMLHVCQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQUM7WUFBbEIsSUFBSSxJQUFJO1lBQ1YsSUFBSSxRQUFRLEtBQUsseUNBQXVCLEVBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUM7Z0JBQzVFLDZCQUNLLElBQUksS0FDUCxRQUFRLEVBQUUsUUFBUSxJQUNuQjthQUNGO1NBQ0Y7S0FDRjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQTJCLFFBQVEsQ0FBRSxDQUFDLENBQUM7QUFDekQsQ0FBQztBQWRELGtDQWNDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsS0FBYTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCw4Q0FFQzs7Ozs7OztVQ3hFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsK0dBQXFDO0FBQ3JDLDhIQUErQztBQUMvQyxzR0FBZ0M7QUFFaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBUSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7QUFDekUsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFLLElBQUssZUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO0FBQ2pHLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBSyxJQUFLLFlBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFySCxDQUFxSCxDQUFDLENBQUM7QUFFN0ssSUFBTSxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFFaEYsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsZUFBTSxDQUFDLENBQUM7QUFDM0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kZWZpbml0aW9ucy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL2NlbGxfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL3BpZWNlX2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RvbS90YXJnZXRfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZ2FtZV9hcmVhLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9sZXZlbF9jb250cm9scy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvbGV2ZWxzLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9zdmdzLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBPcGVuaW5ncyB7XHJcbiAgTk9ORSA9IDAsXHJcbiAgQk9UVE9NID0gMSxcclxuICBSSUdIVCA9IDIsXHJcbiAgVE9QID0gNCxcclxuICBMRUZUID0gOCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29sb3JzIHtcclxuICBibHVlID0gJ2JsdWUnLFxyXG4gIGN5YW4gPSAnY3lhbicsXHJcbiAgZ3JlZW4gPSAnZ3JlZW4nLFxyXG4gIHJlZCA9ICdyZWQnLFxyXG4gIHZpb2xldCA9ICd2aW9sZXQnLFxyXG4gIHllbGxvdyA9ICd5ZWxsb3cnLFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSb3RhdGlvbiA9IDB8OTB8MTgwfDI3MDtcclxuXHJcbmV4cG9ydCBlbnVtIENvcm5lcnMge1xyXG4gIFRPUF9MRUZUID0gT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuTEVGVCxcclxuICBUT1BfUklHSFQgPSBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCxcclxuICBCT1RUT01fTEVGVCA9IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLkxFRlQsXHJcbiAgQk9UVE9NX1JJR0hUID0gT3BlbmluZ3MuQk9UVE9NIHwgT3BlbmluZ3MuUklHSFQsXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2Uob3BlbmluZ3M6IE9wZW5pbmdzLCBuID0gMSk6IE9wZW5pbmdzIHtcclxuICByZXR1cm4gKChvcGVuaW5ncyA8PCAoNC1uKSkgfCAob3BlbmluZ3MgPj4gbikpICYgMGIxMTExO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlKG9wZW5pbmdzOiBPcGVuaW5ncywgbiA9IDEpOiBPcGVuaW5ncyB7XHJcbiAgcmV0dXJuICgob3BlbmluZ3MgPj4gKDQtbikpIHwgKG9wZW5pbmdzIDw8IG4pKSAmIDBiMTExMTtcclxufVxyXG5cclxuY29uc3Qgb3BlbmluZ3NDeWNsZTogT3BlbmluZ3NbXSA9IFtcclxuICAwYjAwMDAsXHJcbiAgMGIxMTAwLFxyXG4gIDBiMDExMCxcclxuICAwYjAwMTEsXHJcbiAgMGIxMDAxLFxyXG4gIDBiMTAxMCxcclxuICAwYjAxMDEsXHJcbiAgMGIxMTEwLFxyXG4gIDBiMDExMSxcclxuICAwYjEwMTEsXHJcbiAgMGIxMTAxLFxyXG4gIDBiMTAwMCxcclxuICAwYjAxMDAsXHJcbiAgMGIwMDEwLFxyXG4gIDBiMDAwMSxcclxuICAwYjExMTEsXHJcbl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3ljbGVPcGVuaW5ncyhvcGVuaW5nczogT3BlbmluZ3MsIGJhY2t3YXJkcyA9IGZhbHNlKTogT3BlbmluZ3Mge1xyXG4gIGNvbnN0IGlkeCA9IG9wZW5pbmdzQ3ljbGUuZmluZEluZGV4KCh2KSA9PiB2ID09PSBvcGVuaW5ncyk7XHJcbiAgY29uc3Qgbnh0ID0gKGlkeCArIChiYWNrd2FyZHMgPyAxNSA6IDEpKSAlIDE2O1xyXG4gIHJldHVybiBvcGVuaW5nc0N5Y2xlW254dF07XHJcbn1cclxuLyoqIEFzc3VtZXMgTGVmdCBpcyAwLCByZXR1cm5zIGNsb2Nrd2lzZSBhbmdsZS4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdGF0aW9uKG9wZW5pbmc6IE9wZW5pbmdzKTogUm90YXRpb24ge1xyXG4gIHN3aXRjaChvcGVuaW5nKXtcclxuICAgIGNhc2UgT3BlbmluZ3MuTEVGVDpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICBjYXNlIE9wZW5pbmdzLlRPUDpcclxuICAgICAgcmV0dXJuIDkwO1xyXG4gICAgY2FzZSBPcGVuaW5ncy5SSUdIVDpcclxuICAgICAgcmV0dXJuIDE4MDtcclxuICAgIGNhc2UgT3BlbmluZ3MuQk9UVE9NOlxyXG4gICAgICByZXR1cm4gMjcwO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG9wZW5pbmcgYXJndW1lbnQ6ICR7b3BlbmluZ30uYCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVSb3RhdGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcblxyXG4gIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2VuZH1kZWcpYFxyXG5cclxuICBlbGVtZW50LmFuaW1hdGUoW1xyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHtzdGFydH1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHtlbmR9ZGVnKWAgfSxcclxuICBdLCB7XHJcbiAgICBkdXJhdGlvbjogNDAwLFxyXG4gICAgZWFzaW5nOiAnZWFzZScsXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVGYWlsdXJlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbmdsZTogbnVtYmVyLCBjbG9ja3dpc2U6IGJvb2xlYW4pIHtcclxuXHJcbiAgY29uc3QgZGVsdGEgPSBjbG9ja3dpc2UgPyAzIDogLTM7XHJcblxyXG4gIGVsZW1lbnQuYW5pbWF0ZShbXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlK2RlbHRhfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlLWRlbHRhfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgXSwge1xyXG4gICAgZHVyYXRpb246IDEwMCxcclxuICAgIGl0ZXJhdGlvbnM6IDMsXHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQge09wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtnZXRDZWxsSW5mb30gZnJvbSBcIi4uL3N2Z3NcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcbiAgcHVibGljIG9wZW5pbmdzOiBPcGVuaW5ncztcclxuXHJcbiAgY29uc3RydWN0b3Iob3BlbmluZ3M6IE9wZW5pbmdzLCBzY2FsaW5nOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlT3BlbmluZ3Mob3BlbmluZ3MpO1xyXG5cclxuICAgIHRoaXMuYWRqdXN0KHNjYWxpbmcsIG9mZnNldCwgaSwgaik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPcGVuaW5ncyhvcGVuaW5nczogT3BlbmluZ3MpIHtcclxuICAgIHRoaXMub3BlbmluZ3MgPSBvcGVuaW5ncztcclxuXHJcbiAgICBjb25zdCBjZWxsSW5mbyA9IGdldENlbGxJbmZvKG9wZW5pbmdzKTtcclxuICAgIHRoaXMucm90YXRpb24gPSBjZWxsSW5mby5yb3RhdGlvbjtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2NlbGxJbmZvLnJvdGF0aW9ufWRlZylgO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGNlbGxJbmZvLmZpbGVOYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5vcGVuaW5ncyA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMub3BlbmluZ3MpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiAtIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDM2MCAtIDkwKSAlIDM2MDtcclxuICAgIHRoaXMub3BlbmluZ3MgPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5vcGVuaW5ncyk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGFkanVzdChlZGdlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke2VkZ2UqMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHtlZGdlKjEwMH0lYDtcclxuICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke29mZnNldCAqIGogKiAxMDB9JWA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke29mZnNldCAqIGkgKiAxMDB9JWA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtDb3JuZXJzLCBnZXRSb3RhdGlvbiwgT3BlbmluZ3MsIHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZSwgcm90YXRlT3BlbmluZ3NDbG9ja3dpc2V9IGZyb20gXCIuLi9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQge2FuaW1hdGVGYWlsdXJlLCBhbmltYXRlUm90YXRlfSBmcm9tIFwiLi9hbmltYXRpb25cIjtcclxuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4uL2xldmVsc1wiO1xyXG5pbXBvcnQge2dldFBpZWNlRmlsZU5hbWV9IGZyb20gXCIuLi9zdmdzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBNb3ZlQXR0ZW1wdENhbGxCYWNrID0gKGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdLCBjbG9ja3dpc2U6IGJvb2xlYW4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgUGllY2VFbGVtZW50IHtcclxuICBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIG1vdXNlRG93bj86IFtudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwaWVjZTogUGllY2UsIHNjYWxpbmc6IG51bWJlciwgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlciwgcHJpdmF0ZSBtb3ZlQXR0ZW1wdENhbGxiYWNrOiBNb3ZlQXR0ZW1wdENhbGxCYWNrKSB7XHJcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGdldFBpZWNlRmlsZU5hbWUocGllY2UuY29sb3IpKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWVjZScpO1xyXG5cclxuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtzY2FsaW5nICogMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHtzY2FsaW5nICogMTAwfSVgO1xyXG5cclxuICAgIHRoaXMucm90YXRpb24gPSBnZXRSb3RhdGlvbihwaWVjZS5kaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKC4uLnBpZWNlLmxvY2F0aW9uKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlRG93biA9IFtldmVudC54LCBldmVudC55XTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChldmVudDogVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBpZihldmVudC50b3VjaGVzWzBdKSB7XHJcbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBbZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLCBldmVudC50b3VjaGVzWzBdLmNsaWVudFldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VVcCh4LCB5KSB7XHJcbiAgICBpZiAodGhpcy5tb3VzZURvd24gPT0gbnVsbCl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbeGxhc3QsIHlsYXN0XSA9IHRoaXMubW91c2VEb3duO1xyXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xyXG5cclxuICAgIGxldCBjb3JuZXI6IENvcm5lcnMgPSAwO1xyXG5cclxuICAgIGlmICh4ID4geGxhc3Qpe1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuUklHSFQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuTEVGVDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeSA+IHlsYXN0KXtcclxuICAgICAgY29ybmVyIHw9IE9wZW5pbmdzLkJPVFRPTTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvcm5lciB8PSBPcGVuaW5ncy5UT1A7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGllY2UuZGlyZWN0aW9uICYgY29ybmVyKSB7XHJcbiAgICAgIHRoaXMuc3dpdGNoQXR0YWNobWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb2Nrd2lzZSA9IChyb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbikgJiBjb3JuZXIpICE9PSAwO1xyXG5cclxuICAgIHRoaXMubW92ZUF0dGVtcHRDYWxsYmFjayh0aGlzLnBpZWNlLmxvY2F0aW9uLCBjbG9ja3dpc2UpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRWxlbWVudCgpIHtcclxuICAgIHRoaXMuZWwucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGVDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlUm90YXRlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRoaXMucm90YXRpb24gKyA5MCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyA5MCkgJSAzNjA7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUFudGlDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlUm90YXRlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIHRoaXMucm90YXRpb24gLSA5MCk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAzNjAgLSA5MCkgJSAzNjA7XHJcbiAgICB0aGlzLnBpZWNlLmRpcmVjdGlvbiA9IHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGlzTG9jYXRlZEF0KGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdKXtcclxuICAgIGNvbnN0IGFyZUVxdWFsID0gKGE6IFtudW1iZXIsIG51bWJlcl0sIGI6IFtudW1iZXIsIG51bWJlcl0pID0+IGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcclxuXHJcbiAgICBpZiAoYXJlRXF1YWwobG9jYXRpb24sIHRoaXMucGllY2UubG9jYXRpb24pKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFyZUVxdWFsKGxvY2F0aW9uLCB0aGlzLmdldFBvdGVudGlhbExvY2F0aW9uKCkpKXtcclxuICAgICAgdGhpcy5zd2l0Y2hBdHRhY2htZW50KCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQb3RlbnRpYWxMb2NhdGlvbigpIDogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBjb25zdCBiYWNrID0gW09wZW5pbmdzLlRPUCwgT3BlbmluZ3MuTEVGVF0uaW5jbHVkZXModGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgdmVydGljYWwgPSBbT3BlbmluZ3MuVE9QLCBPcGVuaW5ncy5CT1RUT01dLmluY2x1ZGVzKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuXHJcbiAgICBjb25zdCBsb2M6IFtudW1iZXIsIG51bWJlcl0gPSBbdGhpcy5waWVjZS5sb2NhdGlvblswXSwgdGhpcy5waWVjZS5sb2NhdGlvblsxXV07XHJcbiAgICBsb2NbdmVydGljYWwgPyAwIDogMV0gKz0gYmFjayA/IC0xIDogMTtcclxuXHJcbiAgICByZXR1cm4gbG9jO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzd2l0Y2hBdHRhY2htZW50KCkge1xyXG4gICAgdGhpcy5waWVjZS5sb2NhdGlvbiA9IHRoaXMuZ2V0UG90ZW50aWFsTG9jYXRpb24oKTtcclxuICAgIHRoaXMucGllY2UuZGlyZWN0aW9uID0gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24sIDIpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMTgwKSAlIDM2MDtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb259ZGVnKWA7XHJcblxyXG4gICAgdGhpcy5zZXRQb3NpdGlvbiguLi50aGlzLnBpZWNlLmxvY2F0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7eCAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7eSAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gIH1cclxufSIsImltcG9ydCB7VGFyZ2V0fSBmcm9tIFwiLi4vbGV2ZWxzXCI7XHJcbmltcG9ydCB7Z2V0VGFyZ2V0RmlsZU5hbWV9IGZyb20gXCIuLi9zdmdzXCI7XHJcbmltcG9ydCB7Z2V0Um90YXRpb24sIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZX0gZnJvbSBcIi4uL2RlZmluaXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFyZ2V0RWxlbWVudCB7XHJcbiAgZWw6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgcm90YXRpb246IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRhcmdldDogVGFyZ2V0LCBzY2FsaW5nOiBudW1iZXIsIHByaXZhdGUgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnc3JjJywgZ2V0VGFyZ2V0RmlsZU5hbWUodGFyZ2V0LmNvbG9yKSk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFyZ2V0Jyk7XHJcblxyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3NjYWxpbmcgKiAxMDB9JWA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke3NjYWxpbmcgKiAxMDB9JWA7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvbiA9IGdldFJvdGF0aW9uKHRhcmdldC5kaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKHRhcmdldC5sb2NhdGlvbiwgdGFyZ2V0LmRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVFbGVtZW50KCkge1xyXG4gICAgdGhpcy5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0UG9zaXRpb24obG9jOiBudW1iZXIsIGRpcmVjdGlvbjogT3BlbmluZ3MpIHtcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgT3BlbmluZ3MuTEVGVDpcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke2xvYyAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAtMjAlYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnJpZ2h0ID0gdGhpcy5lbC5zdHlsZS5ib3R0b20gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgT3BlbmluZ3MuQk9UVE9NOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke2xvYyAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYm90dG9tID0gYC0yMCVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSB0aGlzLmVsLnN0eWxlLnRvcCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBPcGVuaW5ncy5SSUdIVDpcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke2xvYyAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gdGhpcy5lbC5zdHlsZS5ib3R0b20gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgT3BlbmluZ3MuVE9QOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke2xvYyAqIHRoaXMub2Zmc2V0ICogMTAwfSVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYC0yMCVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgZGlyZWN0aW9uOiAke2RpcmVjdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge0NlbGxFbGVtZW50fSBmcm9tIFwiLi9kb20vY2VsbF9lbGVtZW50XCI7XHJcbmltcG9ydCB7TGV2ZWx9IGZyb20gJy4vbGV2ZWxzJztcclxuaW1wb3J0IHtPcGVuaW5ncywgY3ljbGVPcGVuaW5nc30gZnJvbSBcIi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtQaWVjZUVsZW1lbnR9IGZyb20gXCIuL2RvbS9waWVjZV9lbGVtZW50XCI7XHJcbmltcG9ydCB7VGFyZ2V0RWxlbWVudH0gZnJvbSBcIi4vZG9tL3RhcmdldF9lbGVtZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUFyZWEge1xyXG4gIGNvbnN0cnVjdG9yKGNlbGxzU2VsZWN0b3I6IHN0cmluZywgcGllY2VzU2VsZWN0b3I6IHN0cmluZykge1xyXG4gICAgdGhpcy5jZWxsc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZ2FtZS1hcmVhID4gY2VsbHMnKTtcclxuICAgIHRoaXMucGllY2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBwaWVjZXMnKTtcclxuICB9XHJcblxyXG4gIGNlbGxzRWw6IEhUTUxFbGVtZW50O1xyXG4gIHBpZWNlc0VsOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBjZWxsczogQ2VsbEVsZW1lbnRbXVtdID0gW107XHJcbiAgcHJpdmF0ZSBwaWVjZXM6IFBpZWNlRWxlbWVudFtdID0gW107XHJcbiAgcHJpdmF0ZSB0YXJnZXRzOiBUYXJnZXRFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgcGllY2VzRWxNb3VzZVVwOiAoeCwgeSkgPT4gdm9pZDtcclxuXHJcbiAgaXNEaXJ0eSA9IGZhbHNlO1xyXG5cclxuICBpbml0aWFsaXplKGxldmVsOiBMZXZlbCkge1xyXG4gICAgdGhpcy5jbGVhckJvYXJkKCk7XHJcblxyXG4gICAgY29uc3QgbiA9IGxldmVsLmNlbGxzLmxlbmd0aDtcclxuICAgIGNvbnN0IG0gPSBsZXZlbC5jZWxsc1swXS5sZW5ndGg7XHJcblxyXG4gICAgLy8gVE9ETzogYXNzdW1lcyBuIGlzIHNhbWUgYXMgbSwgYW5kIHNoYXBlIGlzIHBlcmZlY3Qgc3F1YXJlLlxyXG4gICAgY29uc3Qgc2NhbGluZyA9IDIgLyAoMiArIChuIC0gMSkgKiBNYXRoLnNxcnQoMikpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKDEgLSBzY2FsaW5nKSAvIChuIC0gMSk7XHJcblxyXG4gICAgbGV0IGkgPSAwLCBqID0gMDtcclxuICAgIGZvciAobGV0IHJvdyBvZiBsZXZlbC5jZWxscykge1xyXG4gICAgICBjb25zdCBjdXJSb3cgPSBbXTtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjb25zdCBjdXIgPSBuZXcgQ2VsbEVsZW1lbnQoY2VsbCwgc2NhbGluZywgb2Zmc2V0LCBpLCBqKTtcclxuXHJcbiAgICAgICAgY3VyUm93LnB1c2goY3VyKTtcclxuICAgICAgICB0aGlzLmNlbGxzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuXHJcbiAgICAgICAgKytqO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjdXJSb3cpO1xyXG4gICAgICBqID0gMDtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3IgKGxldCBwaWVjZSBvZiBsZXZlbC5waWVjZXMpIHtcclxuICAgICAgY29uc3QgY3VyID0gbmV3IFBpZWNlRWxlbWVudChwaWVjZSwgc2NhbGluZywgb2Zmc2V0LCB0aGlzLmF0dGVtcHRUb01vdmUpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG4gICAgICB0aGlzLnBpZWNlcy5wdXNoKGN1cik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5waWVjZXNFbE1vdXNlVXAgPSAoeCwgeSkgPT4ge1xyXG4gICAgICBmb3IgKGxldCBwaWVjZSBvZiB0aGlzLnBpZWNlcykge1xyXG4gICAgICAgIHBpZWNlLm9uTW91c2VVcCh4LCB5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhcmdldCBvZiBsZXZlbC50YXJnZXRzKSB7XHJcbiAgICAgIGNvbnN0IGN1ciA9IG5ldyBUYXJnZXRFbGVtZW50KHRhcmdldCwgc2NhbGluZywgb2Zmc2V0KTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuICAgICAgdGhpcy50YXJnZXRzLnB1c2goY3VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGVtcHRUb01vdmUgPSAobG9jYXRpb246IFtudW1iZXIsIG51bWJlcl0sIGNsb2Nrd2lzZTogYm9vbGVhbikgPT4ge1xyXG4gICAgY29uc3QgW2ksIGpdID0gbG9jYXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMuY2FuUm90YXRlKGksIGopKSB7XHJcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICBjbG9ja3dpc2UgPyB0aGlzLmNlbGxzW2ldW2pdLnJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcblxyXG4gICAgICB0aGlzLnBpZWNlcy5maWx0ZXIoKHBpZWNlKSA9PiBwaWVjZS5pc0xvY2F0ZWRBdChsb2NhdGlvbikpLmZvckVhY2goKHBpZWNlRWwpID0+IHtcclxuICAgICAgICBjbG9ja3dpc2UgPyBwaWVjZUVsLnJvdGF0ZUNsb2Nrd2lzZSgpIDogcGllY2VFbC5yb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbG9ja3dpc2UgPyB0aGlzLmNlbGxzW2ldW2pdLmZhaWxSb3RhdGVDbG9ja3dpc2UoKSA6IHRoaXMuY2VsbHNbaV1bal0uZmFpbFJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzLmZpbHRlcigocGllY2UpID0+IHBpZWNlLmlzTG9jYXRlZEF0KGxvY2F0aW9uKSkuZm9yRWFjaCgocGllY2VFbCkgPT4ge1xyXG4gICAgICAgIGNsb2Nrd2lzZSA/IHBpZWNlRWwuZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIDogcGllY2VFbC5mYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV2ZWxFZGl0b3IobjogbnVtYmVyLCBtOiBudW1iZXIpIHtcclxuICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgIC8vIFRPRE86IGFzc3VtZXMgbiBpcyBzYW1lIGFzIG0sIGFuZCBzaGFwZSBpcyBwZXJmZWN0IHNxdWFyZS5cclxuICAgIGNvbnN0IHNjYWxpbmcgPSAyIC8gKDIgKyAobiAtIDEpICogTWF0aC5zcXJ0KDIpKTtcclxuICAgIGNvbnN0IG9mZnNldCA9ICgxIC0gc2NhbGluZykgLyAobiAtIDEpO1xyXG5cclxuICAgIGxldCBpID0gMCwgaiA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xyXG4gICAgICBjb25zdCBjdXJSb3cgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtOyArK2opIHtcclxuICAgICAgICBjb25zdCBjdXIgPSBuZXcgQ2VsbEVsZW1lbnQoT3BlbmluZ3MuTk9ORSwgc2NhbGluZywgb2Zmc2V0LCBpLCBqKTtcclxuICAgICAgICBjdXJSb3cucHVzaChjdXIpO1xyXG5cclxuICAgICAgICBjdXIuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICBjdXIudXBkYXRlT3BlbmluZ3MoY3ljbGVPcGVuaW5ncyhjdXIub3BlbmluZ3MpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXIuZWwuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgY3VyLnVwZGF0ZU9wZW5pbmdzKGN5Y2xlT3BlbmluZ3MoY3VyLm9wZW5pbmdzLCB0cnVlKSk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2VsbHNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNlbGxzLnB1c2goY3VyUm93KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhblJvdGF0ZShpOiBudW1iZXIsIGo6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGkgPiAwICYmICEodGhpcy5jZWxsc1tpIC0gMV1bal0ub3BlbmluZ3MgJiBPcGVuaW5ncy5CT1RUT00pKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaSA8IHRoaXMuY2VsbHMubGVuZ3RoIC0gMSAmJiAhKHRoaXMuY2VsbHNbaSArIDFdW2pdLm9wZW5pbmdzICYgT3BlbmluZ3MuVE9QKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGogPiAwICYmICEodGhpcy5jZWxsc1tpXVtqIC0gMV0ub3BlbmluZ3MgJiBPcGVuaW5ncy5SSUdIVCkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChqIDwgdGhpcy5jZWxsc1tpXS5sZW5ndGggLSAxICYmICEodGhpcy5jZWxsc1tpXVtqICsgMV0ub3BlbmluZ3MgJiBPcGVuaW5ncy5MRUZUKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhckJvYXJkKCkge1xyXG4gICAgdGhpcy5jZWxsc0VsLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICB0aGlzLnBpZWNlc0VsLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcblxyXG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuY2VsbHMpIHtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjZWxsLmRlbGV0ZUVsZW1lbnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHBpZWNlIG9mIHRoaXMucGllY2VzKSB7XHJcbiAgICAgIHBpZWNlLmRlbGV0ZUVsZW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGhpcy50YXJnZXRzKSB7XHJcbiAgICAgIHRhcmdldC5kZWxldGVFbGVtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jZWxscyA9IFtdO1xyXG4gICAgdGhpcy5waWVjZXMgPSBbXTtcclxuICAgIHRoaXMudGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlO1xyXG4gIH1cclxufSIsImltcG9ydCB7Y29uc3RydWN0TGV2ZWwsIExldmVsRGVzY3JpcHRpb259IGZyb20gXCIuL2xldmVsc1wiO1xyXG5pbXBvcnQge0dhbWVBcmVhfSBmcm9tIFwiLi9nYW1lX2FyZWFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMZXZlbENvbnRyb2xzIHtcclxuICBjb25zdHJ1Y3RvcihsZXZlbHNTZWxlY3Rvcjogc3RyaW5nLCBlZGl0b3JTZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmxldmVsc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihsZXZlbHNTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmVkaXRvckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlZGl0b3JTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmVkaXRvckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcblxyXG4gIGxldmVsc0VsOiBIVE1MRWxlbWVudDtcclxuICBlZGl0b3JFbDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGxldmVsc0VsczogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG5cclxuICBlZGl0b3JDb250cm9scyA6IHtwaWVjZXM6IEhUTUxFbGVtZW50LCBjZWxsczogSFRNTEVsZW1lbnQsIGVkaXRvcjogSFRNTEVsZW1lbnR9ID0ge1xyXG4gICAgcGllY2VzOiBudWxsLFxyXG4gICAgY2VsbHM6IG51bGwsXHJcbiAgICBlZGl0b3I6IG51bGwsXHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKGdhbWVBcmVhOiBHYW1lQXJlYSwgbGV2ZWxzOiBMZXZlbERlc2NyaXB0aW9uW10pIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUxldmVsU2VsZWN0b3JzKGdhbWVBcmVhLCBsZXZlbHMpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTGV2ZWxFZGl0b3JTZWxlY3RvcihnYW1lQXJlYSk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVMZXZlbEVkaXRvckNvbnRyb2xzKGdhbWVBcmVhKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxldmVsU2VsZWN0b3JzKGdhbWVBcmVhOiBHYW1lQXJlYSwgbGV2ZWxzOiBMZXZlbERlc2NyaXB0aW9uW10pIHtcclxuICAgIHRoaXMubGV2ZWxzRWxzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXZlbHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgY29uc3QgbGV2ZWxCdXR0b24gPSB0aGlzLmNyZWF0ZVJhZGlvKHRoaXMubGV2ZWxzRWwsIGBsdmwke2krMX1gLCBTdHJpbmcoaSsxKSwgbGV2ZWxzW2ldLmRpZmZpY3VsdHksICdsZXZlbCcpO1xyXG5cclxuICAgICAgbGV2ZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIWdhbWVBcmVhLmlzRGlydHkgfHwgY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgdGhlIGxldmVsP1wiKSl7XHJcbiAgICAgICAgICBnYW1lQXJlYS5pbml0aWFsaXplKGNvbnN0cnVjdExldmVsKGxldmVsc1tpXS5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMubGV2ZWxzRWxzLnB1c2gobGV2ZWxCdXR0b24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplTGV2ZWxFZGl0b3JTZWxlY3RvcihnYW1lQXJlYTogR2FtZUFyZWEpIHtcclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMuZWRpdG9yID0gdGhpcy5jcmVhdGVSYWRpbyh0aGlzLmxldmVsc0VsLGBjdXN0b21gLCAnZWRpdG9yJywgJ21hc3RlcicsICdsZXZlbCcpO1xyXG5cclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChjb25maXJtKFwiR28gdG8gbGV2ZWwgZWRpdG9yIChleHBlcmltZW50YWwpP1wiKSkge1xyXG4gICAgICAgIGdhbWVBcmVhLmxldmVsRWRpdG9yKDMsIDMpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yRWwuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lZGl0b3JDb250cm9scy5jZWxscy5jbGljaygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplTGV2ZWxFZGl0b3JDb250cm9scyhnYW1lQXJlYTogR2FtZUFyZWEpIHtcclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMucGllY2VzID0gdGhpcy5jcmVhdGVSYWRpbyh0aGlzLmVkaXRvckVsLCAncGllY2VzJywgJ3BpZWNlcycsICdtYXN0ZXInLCAnY29udHJvbHMnKTtcclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMucGllY2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGdhbWVBcmVhLnBpZWNlc0VsLnN0eWxlLnpJbmRleCA9ICcxJztcclxuICAgICAgZ2FtZUFyZWEuY2VsbHNFbC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmVkaXRvckNvbnRyb2xzLmNlbGxzID0gdGhpcy5jcmVhdGVSYWRpbyh0aGlzLmVkaXRvckVsLCAnY2VsbHMnLCAnY2VsbHMnLCAnbWFzdGVyJywgJ2NvbnRyb2xzJyk7XHJcbiAgICB0aGlzLmVkaXRvckNvbnRyb2xzLmNlbGxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGdhbWVBcmVhLmNlbGxzRWwuc3R5bGUuekluZGV4ID0gJzEnO1xyXG4gICAgICBnYW1lQXJlYS5waWVjZXNFbC5zdHlsZS56SW5kZXggPSBudWxsO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUmFkaW8oZWw6IEhUTUxFbGVtZW50LCBpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBmYW1pbHk6IHN0cmluZykgOiBIVE1MRWxlbWVudCB7XHJcbiAgICBjb25zdCByYWRpb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgcmFkaW9FbC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicmFkaW9cIik7XHJcbiAgICByYWRpb0VsLmlkID0gaWQ7XHJcbiAgICByYWRpb0VsLm5hbWUgPSBmYW1pbHk7XHJcblxyXG4gICAgY29uc3QgbGFiZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgIGxhYmVsRWwuaHRtbEZvciA9IHJhZGlvRWwuaWQ7XHJcbiAgICBsYWJlbEVsLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICBsYWJlbEVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBlbC5hcHBlbmRDaGlsZChyYWRpb0VsKTtcclxuICAgIGVsLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xyXG5cclxuICAgIHJldHVybiByYWRpb0VsO1xyXG4gIH1cclxuXHJcbiAgc2V0TGV2ZWwoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5sZXZlbHNFbHNbaW5kZXhdLmNsaWNrKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtDb2xvcnMsIE9wZW5pbmdzfSBmcm9tIFwiLi9kZWZpbml0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQaWVjZSB7XHJcbiAgZGlyZWN0aW9uOiBPcGVuaW5ncztcclxuICBsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXTtcclxuICBjb2xvcjogQ29sb3JzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldCB7XHJcbiAgZGlyZWN0aW9uOiBPcGVuaW5ncztcclxuICBsb2NhdGlvbjogbnVtYmVyO1xyXG4gIGNvbG9yOiBDb2xvcnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGV2ZWwge1xyXG4gIGNlbGxzOiBPcGVuaW5nc1tdW107XHJcbiAgcGllY2VzOiBQaWVjZVtdO1xyXG4gIHRhcmdldHM6IFRhcmdldFtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0TGV2ZWwoY29kZTogc3RyaW5nKTogTGV2ZWwge1xyXG4gIGNvbnN0IFtjZWxscywgcGllY2VzLCB0YXJnZXRzXSA9IGNvZGUuc3BsaXQoJ3wnKTtcclxuXHJcbiAgY29uc3QgbGV2ZWw6IExldmVsID0ge1xyXG4gICAgY2VsbHM6IFtdLFxyXG4gICAgcGllY2VzOiBbXSxcclxuICAgIHRhcmdldHM6IFtdLFxyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9PcGVuaW5nID0gKHM6IHN0cmluZyk6IE9wZW5pbmdzID0+IHtcclxuICAgIGxldCBvcGVuaW5nOiBPcGVuaW5ncyA9IE9wZW5pbmdzLk5PTkU7XHJcbiAgICBpZiAocy5pbmNsdWRlcygncicpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLlJJR0hUO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ2InKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5CT1RUT007XHJcbiAgICBpZiAocy5pbmNsdWRlcygndCcpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLlRPUDtcclxuICAgIGlmIChzLmluY2x1ZGVzKCdsJykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuTEVGVDtcclxuXHJcbiAgICByZXR1cm4gb3BlbmluZztcclxuICB9XHJcblxyXG4gIGZvciAobGV0IHJvdyBvZiBjZWxscy5zcGxpdCgnOycpKSB7XHJcbiAgICBjb25zdCBjdXJSb3c6IE9wZW5pbmdzW10gPSBbXTtcclxuICAgIGZvciAobGV0IGNlbGwgb2Ygcm93LnNwbGl0KCcsJykpIHtcclxuICAgICAgY3VyUm93LnB1c2godG9PcGVuaW5nKGNlbGwpKTtcclxuICAgIH1cclxuICAgIGxldmVsLmNlbGxzLnB1c2goY3VyUm93KTtcclxuICB9XHJcblxyXG4gIGxldCBpID0gMDtcclxuXHJcbiAgZm9yIChsZXQgcGllY2Ugb2YgcGllY2VzLnNwbGl0KCc7JykpIHtcclxuICAgIGNvbnN0IFtvLCB4LCB5XSA9IHBpZWNlLnNwbGl0KCcsJyk7XHJcbiAgICBsZXZlbC5waWVjZXMucHVzaCh7XHJcbiAgICAgIGRpcmVjdGlvbjogdG9PcGVuaW5nKG8pLFxyXG4gICAgICBsb2NhdGlvbjogW051bWJlcih4KSwgTnVtYmVyKHkpXSxcclxuICAgICAgY29sb3I6IE9iamVjdC52YWx1ZXMoQ29sb3JzKVtpXSxcclxuICAgIH0pO1xyXG5cclxuICAgICsraTtcclxuICB9XHJcblxyXG4gIGkgPSAwO1xyXG4gIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzLnNwbGl0KCc7JykpIHtcclxuICAgIGNvbnN0IFtkLCBsXSA9IHRhcmdldC5zcGxpdCgnLCcpO1xyXG4gICAgbGV2ZWwudGFyZ2V0cy5wdXNoKHtcclxuICAgICAgZGlyZWN0aW9uOiB0b09wZW5pbmcoZCksXHJcbiAgICAgIGxvY2F0aW9uOiBOdW1iZXIobCksXHJcbiAgICAgIGNvbG9yOiBPYmplY3QudmFsdWVzKENvbG9ycylbaV0sXHJcbiAgICB9KVxyXG5cclxuICAgICsraTtcclxuICB9XHJcblxyXG4gIHJldHVybiBsZXZlbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMZXZlbERlc2NyaXB0aW9uIHtcclxuICBkaWZmaWN1bHR5OiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IExFVkVMUzogTGV2ZWxEZXNjcmlwdGlvbltdID0gW1xyXG4gIHtkaWZmaWN1bHR5OiAnc3RhcnRlcicsIGRlc2NyaXB0aW9uOiAncmIsdGIsbGI7cmIsbHIsdGI7cmIsdHIsbGJ8bCwyLDJ8YiwwJ30sXHJcbiAge2RpZmZpY3VsdHk6ICdzdGFydGVyJywgZGVzY3JpcHRpb246ICdscix0Yixscjt0cixibCx0bDt0cix0bCx0bHxyLDIsMHxyLDInfSxcclxuICB7ZGlmZmljdWx0eTogJ3N0YXJ0ZXInLCBkZXNjcmlwdGlvbjogJ3RyLHRiLGxiO3RyLHRyLGxyO3RyLHRiLHRsfHQsMCwwO3QsMCwxO3IsMSwxO3IsMSwyfGwsMTtyLDE7dCwxO2IsMSd9LCAvLzE1XHJcbiAge2RpZmZpY3VsdHk6ICdqdW5pb3InLCBkZXNjcmlwdGlvbjogJ3RiLGxyLGxyO3RyLHRyLHRyO3RsLHRsLHRsfHQsMCwwO2IsMCwwO2wsMiwwfHIsMDtsLDE7ciwyJ30sIC8vMzBcclxuICB7ZGlmZmljdWx0eTogJ2V4cGVydCcsIGRlc2NyaXB0aW9uOiAnbHIsbHIsbGI7dGwsdGwsdGw7dGIsdGwsdGx8YiwwLDI7YiwyLDB8YiwwO3IsMSd9LCAvLzQ1XHJcbiAge2RpZmZpY3VsdHk6ICdtYXN0ZXInLCBkZXNjcmlwdGlvbjogJ3RiLGxyLHRiO3RyLHRyLHRsO3RsLHRsLHRsfHQsMCwwO2IsMCwwO3IsMSwxO2wsMiwwfHIsMDt0LDE7bCwxO3IsMid9LCAvLzU5XHJcbl1cclxuXHJcbiIsImltcG9ydCB7Q29sb3JzLCBPcGVuaW5ncywgcm90YXRlT3BlbmluZ3NDbG9ja3dpc2UsIFJvdGF0aW9ufSBmcm9tIFwiLi9kZWZpbml0aW9uc1wiO1xyXG5cclxuY29uc3QgY2VsbHNQYXRoID0gKGNlbGwpID0+IGBhc3NldHMvY2VsbHMvJHtjZWxsfS5zdmdgO1xyXG5jb25zdCBwaWVjZXNQYXRoID0gKHBpZWNlKSA9PiBgYXNzZXRzL3BpZWNlcy8ke3BpZWNlfS5zdmdgO1xyXG5jb25zdCB0YXJnZXRzUGF0aCA9IChwaWVjZSkgPT4gYGFzc2V0cy90YXJnZXRzLyR7cGllY2V9LnN2Z2A7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEluZm8ge1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncztcclxuICByb3RhdGlvbj86IFJvdGF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGllY2VJbmZvIHtcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIGNvbG9yOiBDb2xvcnM7XHJcbiAgcm90YXRpb24/OiBSb3RhdGlvblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYmFyOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdiYXInKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLkJPVFRPTSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb3JuZXI6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2Nvcm5lcicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZnVsbDogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnZnVsbCcpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuTk9ORSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb25lOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdsb25lJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvdmVsOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdzaG92ZWwnKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCB8IE9wZW5pbmdzLlJJR0hUIHwgT3BlbmluZ3MuQk9UVE9NLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNodXJpa2VuOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdzaHVyaWtlbicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQgfCBPcGVuaW5ncy5CT1RUT00gfCBPcGVuaW5ncy5MRUZULFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENFTExTID0gW2JhciwgY29ybmVyLCBmdWxsLCBsb25lLCBzaG92ZWwsIHNodXJpa2VuXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDZWxsSW5mbyhvcGVuaW5nczogT3BlbmluZ3MpOiBDZWxsSW5mb3tcclxuICBjb25zdCByb3RhdGlvbnM6IFJvdGF0aW9uW10gPSBbMCwgOTAsIDE4MCwgMjcwXTtcclxuXHJcbiAgZm9yKGxldCByb3RhdGlvbiBvZiByb3RhdGlvbnMpe1xyXG4gICAgZm9yKGxldCBjZWxsIG9mIENFTExTKXtcclxuICAgICAgaWYgKG9wZW5pbmdzID09PSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZShjZWxsLmluaXRpYWxPcGVuaW5ncywgcm90YXRpb24gLyA5MCkpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5jZWxsLFxyXG4gICAgICAgICAgcm90YXRpb246IHJvdGF0aW9uLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoYHVuYWJsZSB0byBmaW5kIGluZm8gZm9yICR7b3BlbmluZ3N9YCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQaWVjZUZpbGVOYW1lKHBpZWNlOiBDb2xvcnMpOiBzdHJpbmd7XHJcbiAgcmV0dXJuIHBpZWNlc1BhdGgocGllY2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0RmlsZU5hbWUodGFyZ2V0OiBDb2xvcnMpOiBzdHJpbmd7XHJcbiAgcmV0dXJuIHRhcmdldHNQYXRoKHRhcmdldCk7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHtHYW1lQXJlYX0gZnJvbSBcIi4vZ2FtZV9hcmVhXCI7XHJcbmltcG9ydCB7TGV2ZWxDb250cm9sc30gZnJvbSAnLi9sZXZlbF9jb250cm9scyc7XHJcbmltcG9ydCB7TEVWRUxTfSBmcm9tICcuL2xldmVscyc7XHJcblxyXG5jb25zdCBnYW1lQXJlYSA9IG5ldyBHYW1lQXJlYSgnZ2FtZS1hcmVhID4gY2VsbHMnLCAnZ2FtZS1hcmVhID4gcGllY2VzJyk7XHJcbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4gZ2FtZUFyZWEucGllY2VzRWxNb3VzZVVwKGV2ZW50LngsIGV2ZW50LnkpKTtcclxuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChldmVudCkgPT4gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gJiYgZ2FtZUFyZWEucGllY2VzRWxNb3VzZVVwKGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkpKTtcclxuXHJcbmNvbnN0IGxldmVsQ29udHJvbHMgPSBuZXcgTGV2ZWxDb250cm9scygnY29udHJvbHNbbGV2ZWxzXScsICdjb250cm9sc1tlZGl0b3JdJyk7XHJcblxyXG5sZXZlbENvbnRyb2xzLmluaXRpYWxpemUoZ2FtZUFyZWEsIExFVkVMUyk7XHJcbmxldmVsQ29udHJvbHMuc2V0TGV2ZWwoMCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==