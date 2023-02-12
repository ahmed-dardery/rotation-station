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
        this.piecesEl.addEventListener('mouseup', function (event) { return _this.piecesElMouseUp(event); });
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
        this.piecesElMouseUp = function (event) {
            for (var _i = 0, _a = _this.pieces; _i < _a.length; _i++) {
                var piece = _a[_i];
                piece.onMouseUp(event);
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
var levelControls = new level_controls_1.LevelControls('controls[levels]', 'controls[editor]');
levelControls.initialize(gameArea, levels_1.LEVELS);
levelControls.setLevel(0);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBZ0IsZ0JBQWdCLENBQUMsS0FBYTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCw4Q0FFQzs7Ozs7OztVQ3hFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsK0dBQXFDO0FBQ3JDLDhIQUErQztBQUMvQyxzR0FBZ0M7QUFFaEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBUSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7QUFDekUsSUFBTSxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFFaEYsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsZUFBTSxDQUFDLENBQUM7QUFDM0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9kZWZpbml0aW9ucy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL2FuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL2NlbGxfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZG9tL3BpZWNlX2VsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2RvbS90YXJnZXRfZWxlbWVudC50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvZ2FtZV9hcmVhLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9sZXZlbF9jb250cm9scy50cyIsIndlYnBhY2s6Ly9yb3RhdGlvbi1zdGF0aW9uLy4uLy4uL1x1MDAwMCNXZWIvcm90YXRpb24tc3RhdGlvbi9zcmMvbGV2ZWxzLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vLi4vLi4vXHUwMDAwI1dlYi9yb3RhdGlvbi1zdGF0aW9uL3NyYy9zdmdzLnRzIiwid2VicGFjazovL3JvdGF0aW9uLXN0YXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm90YXRpb24tc3RhdGlvbi8uLi8uLi9cdTAwMDAjV2ViL3JvdGF0aW9uLXN0YXRpb24vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBPcGVuaW5ncyB7XHJcbiAgTk9ORSA9IDAsXHJcbiAgQk9UVE9NID0gMSxcclxuICBSSUdIVCA9IDIsXHJcbiAgVE9QID0gNCxcclxuICBMRUZUID0gOCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29sb3JzIHtcclxuICBibHVlID0gJ2JsdWUnLFxyXG4gIGN5YW4gPSAnY3lhbicsXHJcbiAgZ3JlZW4gPSAnZ3JlZW4nLFxyXG4gIHJlZCA9ICdyZWQnLFxyXG4gIHZpb2xldCA9ICd2aW9sZXQnLFxyXG4gIHllbGxvdyA9ICd5ZWxsb3cnLFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSb3RhdGlvbiA9IDB8OTB8MTgwfDI3MDtcclxuXHJcbmV4cG9ydCBlbnVtIENvcm5lcnMge1xyXG4gIFRPUF9MRUZUID0gT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuTEVGVCxcclxuICBUT1BfUklHSFQgPSBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCxcclxuICBCT1RUT01fTEVGVCA9IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLkxFRlQsXHJcbiAgQk9UVE9NX1JJR0hUID0gT3BlbmluZ3MuQk9UVE9NIHwgT3BlbmluZ3MuUklHSFQsXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2Uob3BlbmluZ3M6IE9wZW5pbmdzLCBuID0gMSk6IE9wZW5pbmdzIHtcclxuICByZXR1cm4gKChvcGVuaW5ncyA8PCAoNC1uKSkgfCAob3BlbmluZ3MgPj4gbikpICYgMGIxMTExO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlKG9wZW5pbmdzOiBPcGVuaW5ncywgbiA9IDEpOiBPcGVuaW5ncyB7XHJcbiAgcmV0dXJuICgob3BlbmluZ3MgPj4gKDQtbikpIHwgKG9wZW5pbmdzIDw8IG4pKSAmIDBiMTExMTtcclxufVxyXG5cclxuY29uc3Qgb3BlbmluZ3NDeWNsZTogT3BlbmluZ3NbXSA9IFtcclxuICAwYjAwMDAsXHJcbiAgMGIxMTAwLFxyXG4gIDBiMDExMCxcclxuICAwYjAwMTEsXHJcbiAgMGIxMDAxLFxyXG4gIDBiMTAxMCxcclxuICAwYjAxMDEsXHJcbiAgMGIxMTEwLFxyXG4gIDBiMDExMSxcclxuICAwYjEwMTEsXHJcbiAgMGIxMTAxLFxyXG4gIDBiMTAwMCxcclxuICAwYjAxMDAsXHJcbiAgMGIwMDEwLFxyXG4gIDBiMDAwMSxcclxuICAwYjExMTEsXHJcbl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3ljbGVPcGVuaW5ncyhvcGVuaW5nczogT3BlbmluZ3MsIGJhY2t3YXJkcyA9IGZhbHNlKTogT3BlbmluZ3Mge1xyXG4gIGNvbnN0IGlkeCA9IG9wZW5pbmdzQ3ljbGUuZmluZEluZGV4KCh2KSA9PiB2ID09PSBvcGVuaW5ncyk7XHJcbiAgY29uc3Qgbnh0ID0gKGlkeCArIChiYWNrd2FyZHMgPyAxNSA6IDEpKSAlIDE2O1xyXG4gIHJldHVybiBvcGVuaW5nc0N5Y2xlW254dF07XHJcbn1cclxuLyoqIEFzc3VtZXMgTGVmdCBpcyAwLCByZXR1cm5zIGNsb2Nrd2lzZSBhbmdsZS4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdGF0aW9uKG9wZW5pbmc6IE9wZW5pbmdzKTogUm90YXRpb24ge1xyXG4gIHN3aXRjaChvcGVuaW5nKXtcclxuICAgIGNhc2UgT3BlbmluZ3MuTEVGVDpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICBjYXNlIE9wZW5pbmdzLlRPUDpcclxuICAgICAgcmV0dXJuIDkwO1xyXG4gICAgY2FzZSBPcGVuaW5ncy5SSUdIVDpcclxuICAgICAgcmV0dXJuIDE4MDtcclxuICAgIGNhc2UgT3BlbmluZ3MuQk9UVE9NOlxyXG4gICAgICByZXR1cm4gMjcwO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIG9wZW5pbmcgYXJndW1lbnQ6ICR7b3BlbmluZ30uYCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVSb3RhdGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcblxyXG4gIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2VuZH1kZWcpYFxyXG5cclxuICBlbGVtZW50LmFuaW1hdGUoW1xyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHtzdGFydH1kZWcpYCB9LFxyXG4gICAgeyB0cmFuc2Zvcm06IGByb3RhdGUoJHtlbmR9ZGVnKWAgfSxcclxuICBdLCB7XHJcbiAgICBkdXJhdGlvbjogNDAwLFxyXG4gICAgZWFzaW5nOiAnZWFzZScsXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVGYWlsdXJlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbmdsZTogbnVtYmVyLCBjbG9ja3dpc2U6IGJvb2xlYW4pIHtcclxuXHJcbiAgY29uc3QgZGVsdGEgPSBjbG9ja3dpc2UgPyAzIDogLTM7XHJcblxyXG4gIGVsZW1lbnQuYW5pbWF0ZShbXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlK2RlbHRhfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlLWRlbHRhfWRlZylgIH0sXHJcbiAgICB7IHRyYW5zZm9ybTogYHJvdGF0ZSgke2FuZ2xlfWRlZylgIH0sXHJcbiAgXSwge1xyXG4gICAgZHVyYXRpb246IDEwMCxcclxuICAgIGl0ZXJhdGlvbnM6IDMsXHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQge09wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtnZXRDZWxsSW5mb30gZnJvbSBcIi4uL3N2Z3NcIjtcclxuaW1wb3J0IHthbmltYXRlRmFpbHVyZSwgYW5pbWF0ZVJvdGF0ZX0gZnJvbSBcIi4vYW5pbWF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2VsbEVsZW1lbnQge1xyXG4gIGVsOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHJvdGF0aW9uOiBudW1iZXI7XHJcbiAgcHVibGljIG9wZW5pbmdzOiBPcGVuaW5ncztcclxuXHJcbiAgY29uc3RydWN0b3Iob3BlbmluZ3M6IE9wZW5pbmdzLCBzY2FsaW5nOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlT3BlbmluZ3Mob3BlbmluZ3MpO1xyXG5cclxuICAgIHRoaXMuYWRqdXN0KHNjYWxpbmcsIG9mZnNldCwgaSwgaik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPcGVuaW5ncyhvcGVuaW5nczogT3BlbmluZ3MpIHtcclxuICAgIHRoaXMub3BlbmluZ3MgPSBvcGVuaW5ncztcclxuXHJcbiAgICBjb25zdCBjZWxsSW5mbyA9IGdldENlbGxJbmZvKG9wZW5pbmdzKTtcclxuICAgIHRoaXMucm90YXRpb24gPSBjZWxsSW5mby5yb3RhdGlvbjtcclxuICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2NlbGxJbmZvLnJvdGF0aW9ufWRlZylgO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGNlbGxJbmZvLmZpbGVOYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZVJvdGF0ZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0aGlzLnJvdGF0aW9uICsgOTApO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgOTApICUgMzYwO1xyXG4gICAgdGhpcy5vcGVuaW5ncyA9IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMub3BlbmluZ3MpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiAtIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDM2MCAtIDkwKSAlIDM2MDtcclxuICAgIHRoaXMub3BlbmluZ3MgPSByb3RhdGVPcGVuaW5nc0FudGlDbG9ja3dpc2UodGhpcy5vcGVuaW5ncyk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVGYWlsdXJlKHRoaXMuZWwsIHRoaXMucm90YXRpb24sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGFkanVzdChlZGdlOiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke2VkZ2UqMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHtlZGdlKjEwMH0lYDtcclxuICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IGAke29mZnNldCAqIGogKiAxMDB9JWA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke29mZnNldCAqIGkgKiAxMDB9JWA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtDb3JuZXJzLCBnZXRSb3RhdGlvbiwgT3BlbmluZ3MsIHJvdGF0ZU9wZW5pbmdzQW50aUNsb2Nrd2lzZSwgcm90YXRlT3BlbmluZ3NDbG9ja3dpc2V9IGZyb20gXCIuLi9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQge2FuaW1hdGVGYWlsdXJlLCBhbmltYXRlUm90YXRlfSBmcm9tIFwiLi9hbmltYXRpb25cIjtcclxuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4uL2xldmVsc1wiO1xyXG5pbXBvcnQge2dldFBpZWNlRmlsZU5hbWV9IGZyb20gXCIuLi9zdmdzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBNb3ZlQXR0ZW1wdENhbGxCYWNrID0gKGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdLCBjbG9ja3dpc2U6IGJvb2xlYW4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgUGllY2VFbGVtZW50IHtcclxuICBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIG1vdXNlRG93bj86IFtudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwaWVjZTogUGllY2UsIHNjYWxpbmc6IG51bWJlciwgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlciwgcHJpdmF0ZSBtb3ZlQXR0ZW1wdENhbGxiYWNrOiBNb3ZlQXR0ZW1wdENhbGxCYWNrKSB7XHJcbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGdldFBpZWNlRmlsZU5hbWUocGllY2UuY29sb3IpKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwaWVjZScpO1xyXG5cclxuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtzY2FsaW5nICogMTAwfSVgO1xyXG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHtzY2FsaW5nICogMTAwfSVgO1xyXG5cclxuICAgIHRoaXMucm90YXRpb24gPSBnZXRSb3RhdGlvbihwaWVjZS5kaXJlY3Rpb24pO1xyXG4gICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKC4uLnBpZWNlLmxvY2F0aW9uKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm1vdXNlRG93biA9IFtldmVudC54LCBldmVudC55XTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Nb3VzZVVwKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5tb3VzZURvd24gPT0gbnVsbCl7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbeCwgeV0gPSB0aGlzLm1vdXNlRG93bjtcclxuICAgIHRoaXMubW91c2VEb3duID0gbnVsbDtcclxuXHJcbiAgICBsZXQgY29ybmVyOiBDb3JuZXJzID0gMDtcclxuXHJcbiAgICBpZiAoZXZlbnQueCA+IHgpe1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuUklHSFQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuTEVGVDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQueSA+IHkpe1xyXG4gICAgICBjb3JuZXIgfD0gT3BlbmluZ3MuQk9UVE9NO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29ybmVyIHw9IE9wZW5pbmdzLlRPUDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5waWVjZS5kaXJlY3Rpb24gJiBjb3JuZXIpIHtcclxuICAgICAgdGhpcy5zd2l0Y2hBdHRhY2htZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvY2t3aXNlID0gKHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uKSAmIGNvcm5lcikgIT09IDA7XHJcblxyXG4gICAgdGhpcy5tb3ZlQXR0ZW1wdENhbGxiYWNrKHRoaXMucGllY2UubG9jYXRpb24sIGNsb2Nrd2lzZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVFbGVtZW50KCkge1xyXG4gICAgdGhpcy5lbC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiArIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDkwKSAlIDM2MDtcclxuICAgIHRoaXMucGllY2UuZGlyZWN0aW9uID0gcm90YXRlT3BlbmluZ3NDbG9ja3dpc2UodGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlQW50aUNsb2Nrd2lzZSgpIHtcclxuICAgIGFuaW1hdGVSb3RhdGUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgdGhpcy5yb3RhdGlvbiAtIDkwKTtcclxuICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDM2MCAtIDkwKSAlIDM2MDtcclxuICAgIHRoaXMucGllY2UuZGlyZWN0aW9uID0gcm90YXRlT3BlbmluZ3NBbnRpQ2xvY2t3aXNlKHRoaXMucGllY2UuZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZhaWxSb3RhdGVDbG9ja3dpc2UoKSB7XHJcbiAgICBhbmltYXRlRmFpbHVyZSh0aGlzLmVsLCB0aGlzLnJvdGF0aW9uLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGZhaWxSb3RhdGVBbnRpQ2xvY2t3aXNlKCkge1xyXG4gICAgYW5pbWF0ZUZhaWx1cmUodGhpcy5lbCwgdGhpcy5yb3RhdGlvbiwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgaXNMb2NhdGVkQXQobG9jYXRpb246IFtudW1iZXIsIG51bWJlcl0pe1xyXG4gICAgY29uc3QgYXJlRXF1YWwgPSAoYTogW251bWJlciwgbnVtYmVyXSwgYjogW251bWJlciwgbnVtYmVyXSkgPT4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdO1xyXG5cclxuICAgIGlmIChhcmVFcXVhbChsb2NhdGlvbiwgdGhpcy5waWVjZS5sb2NhdGlvbikpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXJlRXF1YWwobG9jYXRpb24sIHRoaXMuZ2V0UG90ZW50aWFsTG9jYXRpb24oKSkpe1xyXG4gICAgICB0aGlzLnN3aXRjaEF0dGFjaG1lbnQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBvdGVudGlhbExvY2F0aW9uKCkgOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGNvbnN0IGJhY2sgPSBbT3BlbmluZ3MuVE9QLCBPcGVuaW5ncy5MRUZUXS5pbmNsdWRlcyh0aGlzLnBpZWNlLmRpcmVjdGlvbik7XHJcbiAgICBjb25zdCB2ZXJ0aWNhbCA9IFtPcGVuaW5ncy5UT1AsIE9wZW5pbmdzLkJPVFRPTV0uaW5jbHVkZXModGhpcy5waWVjZS5kaXJlY3Rpb24pO1xyXG5cclxuICAgIGNvbnN0IGxvYzogW251bWJlciwgbnVtYmVyXSA9IFt0aGlzLnBpZWNlLmxvY2F0aW9uWzBdLCB0aGlzLnBpZWNlLmxvY2F0aW9uWzFdXTtcclxuICAgIGxvY1t2ZXJ0aWNhbCA/IDAgOiAxXSArPSBiYWNrID8gLTEgOiAxO1xyXG5cclxuICAgIHJldHVybiBsb2M7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN3aXRjaEF0dGFjaG1lbnQoKSB7XHJcbiAgICB0aGlzLnBpZWNlLmxvY2F0aW9uID0gdGhpcy5nZXRQb3RlbnRpYWxMb2NhdGlvbigpO1xyXG4gICAgdGhpcy5waWVjZS5kaXJlY3Rpb24gPSByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSh0aGlzLnBpZWNlLmRpcmVjdGlvbiwgMik7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAxODApICUgMzYwO1xyXG4gICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGlvbn1kZWcpYDtcclxuXHJcbiAgICB0aGlzLnNldFBvc2l0aW9uKC4uLnRoaXMucGllY2UubG9jYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbC5zdHlsZS50b3AgPSBgJHt4ICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSBgJHt5ICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtUYXJnZXR9IGZyb20gXCIuLi9sZXZlbHNcIjtcclxuaW1wb3J0IHtnZXRUYXJnZXRGaWxlTmFtZX0gZnJvbSBcIi4uL3N2Z3NcIjtcclxuaW1wb3J0IHtnZXRSb3RhdGlvbiwgT3BlbmluZ3MsIHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlfSBmcm9tIFwiLi4vZGVmaW5pdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYXJnZXRFbGVtZW50IHtcclxuICBlbDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByb3RhdGlvbjogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFyZ2V0OiBUYXJnZXQsIHNjYWxpbmc6IG51bWJlciwgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xyXG5cclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdzcmMnLCBnZXRUYXJnZXRGaWxlTmFtZSh0YXJnZXQuY29sb3IpKTtcclxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXJnZXQnKTtcclxuXHJcbiAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gYCR7c2NhbGluZyAqIDEwMH0lYDtcclxuICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c2NhbGluZyAqIDEwMH0lYDtcclxuXHJcbiAgICB0aGlzLnJvdGF0aW9uID0gZ2V0Um90YXRpb24odGFyZ2V0LmRpcmVjdGlvbik7XHJcbiAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0aW9ufWRlZylgO1xyXG5cclxuICAgIHRoaXMuc2V0UG9zaXRpb24odGFyZ2V0LmxvY2F0aW9uLCB0YXJnZXQuZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQb3NpdGlvbihsb2M6IG51bWJlciwgZGlyZWN0aW9uOiBPcGVuaW5ncykge1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBPcGVuaW5ncy5MRUZUOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYC0yMCVgO1xyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBPcGVuaW5ncy5CT1RUT006XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IHRoaXMuZWwuc3R5bGUudG9wID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE9wZW5pbmdzLlJJR0hUOlxyXG4gICAgICAgIHRoaXMuZWwuc3R5bGUudG9wID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IGAtMjAlYDtcclxuICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSB0aGlzLmVsLnN0eWxlLmJvdHRvbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBPcGVuaW5ncy5UT1A6XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7bG9jICogdGhpcy5vZmZzZXQgKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBgLTIwJWA7XHJcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IHRoaXMuZWwuc3R5bGUuYm90dG9tID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBkaXJlY3Rpb246ICR7ZGlyZWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7Q2VsbEVsZW1lbnR9IGZyb20gXCIuL2RvbS9jZWxsX2VsZW1lbnRcIjtcclxuaW1wb3J0IHtMZXZlbH0gZnJvbSAnLi9sZXZlbHMnO1xyXG5pbXBvcnQge09wZW5pbmdzLCBjeWNsZU9wZW5pbmdzfSBmcm9tIFwiLi9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQge1BpZWNlRWxlbWVudH0gZnJvbSBcIi4vZG9tL3BpZWNlX2VsZW1lbnRcIjtcclxuaW1wb3J0IHtUYXJnZXRFbGVtZW50fSBmcm9tIFwiLi9kb20vdGFyZ2V0X2VsZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQXJlYSB7XHJcbiAgY29uc3RydWN0b3IoY2VsbHNTZWxlY3Rvcjogc3RyaW5nLCBwaWVjZXNTZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNlbGxzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdnYW1lLWFyZWEgPiBjZWxscycpO1xyXG4gICAgdGhpcy5waWVjZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2dhbWUtYXJlYSA+IHBpZWNlcycpO1xyXG5cclxuICAgIHRoaXMucGllY2VzRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4gdGhpcy5waWVjZXNFbE1vdXNlVXAoZXZlbnQpKTtcclxuICB9XHJcblxyXG4gIGNlbGxzRWw6IEhUTUxFbGVtZW50O1xyXG4gIHBpZWNlc0VsOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBjZWxsczogQ2VsbEVsZW1lbnRbXVtdID0gW107XHJcbiAgcHJpdmF0ZSBwaWVjZXM6IFBpZWNlRWxlbWVudFtdID0gW107XHJcbiAgcHJpdmF0ZSB0YXJnZXRzOiBUYXJnZXRFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBwaWVjZXNFbE1vdXNlVXA6IChldmVudCkgPT4gdm9pZDtcclxuXHJcbiAgaXNEaXJ0eSA9IGZhbHNlO1xyXG5cclxuICBpbml0aWFsaXplKGxldmVsOiBMZXZlbCkge1xyXG4gICAgdGhpcy5jbGVhckJvYXJkKCk7XHJcblxyXG4gICAgY29uc3QgbiA9IGxldmVsLmNlbGxzLmxlbmd0aDtcclxuICAgIGNvbnN0IG0gPSBsZXZlbC5jZWxsc1swXS5sZW5ndGg7XHJcblxyXG4gICAgLy8gVE9ETzogYXNzdW1lcyBuIGlzIHNhbWUgYXMgbSwgYW5kIHNoYXBlIGlzIHBlcmZlY3Qgc3F1YXJlLlxyXG4gICAgY29uc3Qgc2NhbGluZyA9IDIgLyAoMiArIChuIC0gMSkgKiBNYXRoLnNxcnQoMikpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKDEgLSBzY2FsaW5nKSAvIChuIC0gMSk7XHJcblxyXG4gICAgbGV0IGkgPSAwLCBqID0gMDtcclxuICAgIGZvciAobGV0IHJvdyBvZiBsZXZlbC5jZWxscykge1xyXG4gICAgICBjb25zdCBjdXJSb3cgPSBbXTtcclxuICAgICAgZm9yIChsZXQgY2VsbCBvZiByb3cpIHtcclxuICAgICAgICBjb25zdCBjdXIgPSBuZXcgQ2VsbEVsZW1lbnQoY2VsbCwgc2NhbGluZywgb2Zmc2V0LCBpLCBqKTtcclxuXHJcbiAgICAgICAgY3VyUm93LnB1c2goY3VyKTtcclxuICAgICAgICB0aGlzLmNlbGxzRWwuYXBwZW5kQ2hpbGQoY3VyLmVsKTtcclxuXHJcbiAgICAgICAgKytqO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjdXJSb3cpO1xyXG4gICAgICBqID0gMDtcclxuICAgICAgKytpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3IgKGxldCBwaWVjZSBvZiBsZXZlbC5waWVjZXMpIHtcclxuICAgICAgY29uc3QgY3VyID0gbmV3IFBpZWNlRWxlbWVudChwaWVjZSwgc2NhbGluZywgb2Zmc2V0LCB0aGlzLmF0dGVtcHRUb01vdmUpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG4gICAgICB0aGlzLnBpZWNlcy5wdXNoKGN1cik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5waWVjZXNFbE1vdXNlVXAgPSAoZXZlbnQpID0+IHtcclxuICAgICAgZm9yIChsZXQgcGllY2Ugb2YgdGhpcy5waWVjZXMpIHtcclxuICAgICAgICBwaWVjZS5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgdGFyZ2V0IG9mIGxldmVsLnRhcmdldHMpIHtcclxuICAgICAgY29uc3QgY3VyID0gbmV3IFRhcmdldEVsZW1lbnQodGFyZ2V0LCBzY2FsaW5nLCBvZmZzZXQpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXNFbC5hcHBlbmRDaGlsZChjdXIuZWwpO1xyXG4gICAgICB0aGlzLnRhcmdldHMucHVzaChjdXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0ZW1wdFRvTW92ZSA9IChsb2NhdGlvbjogW251bWJlciwgbnVtYmVyXSwgY2xvY2t3aXNlOiBib29sZWFuKSA9PiB7XHJcbiAgICBjb25zdCBbaSwgal0gPSBsb2NhdGlvbjtcclxuXHJcbiAgICBpZiAodGhpcy5jYW5Sb3RhdGUoaSwgaikpIHtcclxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNsb2Nrd2lzZSA/IHRoaXMuY2VsbHNbaV1bal0ucm90YXRlQ2xvY2t3aXNlKCkgOiB0aGlzLmNlbGxzW2ldW2pdLnJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuXHJcbiAgICAgIHRoaXMucGllY2VzLmZpbHRlcigocGllY2UpID0+IHBpZWNlLmlzTG9jYXRlZEF0KGxvY2F0aW9uKSkuZm9yRWFjaCgocGllY2VFbCkgPT4ge1xyXG4gICAgICAgIGNsb2Nrd2lzZSA/IHBpZWNlRWwucm90YXRlQ2xvY2t3aXNlKCkgOiBwaWVjZUVsLnJvdGF0ZUFudGlDbG9ja3dpc2UoKTtcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsb2Nrd2lzZSA/IHRoaXMuY2VsbHNbaV1bal0uZmFpbFJvdGF0ZUNsb2Nrd2lzZSgpIDogdGhpcy5jZWxsc1tpXVtqXS5mYWlsUm90YXRlQW50aUNsb2Nrd2lzZSgpO1xyXG5cclxuICAgICAgdGhpcy5waWVjZXMuZmlsdGVyKChwaWVjZSkgPT4gcGllY2UuaXNMb2NhdGVkQXQobG9jYXRpb24pKS5mb3JFYWNoKChwaWVjZUVsKSA9PiB7XHJcbiAgICAgICAgY2xvY2t3aXNlID8gcGllY2VFbC5mYWlsUm90YXRlQ2xvY2t3aXNlKCkgOiBwaWVjZUVsLmZhaWxSb3RhdGVBbnRpQ2xvY2t3aXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXZlbEVkaXRvcihuOiBudW1iZXIsIG06IG51bWJlcikge1xyXG4gICAgdGhpcy5jbGVhckJvYXJkKCk7XHJcblxyXG4gICAgLy8gVE9ETzogYXNzdW1lcyBuIGlzIHNhbWUgYXMgbSwgYW5kIHNoYXBlIGlzIHBlcmZlY3Qgc3F1YXJlLlxyXG4gICAgY29uc3Qgc2NhbGluZyA9IDIgLyAoMiArIChuIC0gMSkgKiBNYXRoLnNxcnQoMikpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKDEgLSBzY2FsaW5nKSAvIChuIC0gMSk7XHJcblxyXG4gICAgbGV0IGkgPSAwLCBqID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XHJcbiAgICAgIGNvbnN0IGN1clJvdyA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG07ICsraikge1xyXG4gICAgICAgIGNvbnN0IGN1ciA9IG5ldyBDZWxsRWxlbWVudChPcGVuaW5ncy5OT05FLCBzY2FsaW5nLCBvZmZzZXQsIGksIGopO1xyXG4gICAgICAgIGN1clJvdy5wdXNoKGN1cik7XHJcblxyXG4gICAgICAgIGN1ci5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIGN1ci51cGRhdGVPcGVuaW5ncyhjeWNsZU9wZW5pbmdzKGN1ci5vcGVuaW5ncykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1ci5lbC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XHJcbiAgICAgICAgICBjdXIudXBkYXRlT3BlbmluZ3MoY3ljbGVPcGVuaW5ncyhjdXIub3BlbmluZ3MsIHRydWUpKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jZWxsc0VsLmFwcGVuZENoaWxkKGN1ci5lbCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2VsbHMucHVzaChjdXJSb3cpO1xyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FuUm90YXRlKGk6IG51bWJlciwgajogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoaSA+IDAgJiYgISh0aGlzLmNlbGxzW2kgLSAxXVtqXS5vcGVuaW5ncyAmIE9wZW5pbmdzLkJPVFRPTSkpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpIDwgdGhpcy5jZWxscy5sZW5ndGggLSAxICYmICEodGhpcy5jZWxsc1tpICsgMV1bal0ub3BlbmluZ3MgJiBPcGVuaW5ncy5UT1ApKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaiA+IDAgJiYgISh0aGlzLmNlbGxzW2ldW2ogLSAxXS5vcGVuaW5ncyAmIE9wZW5pbmdzLlJJR0hUKSlcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGogPCB0aGlzLmNlbGxzW2ldLmxlbmd0aCAtIDEgJiYgISh0aGlzLmNlbGxzW2ldW2ogKyAxXS5vcGVuaW5ncyAmIE9wZW5pbmdzLkxFRlQpKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyQm9hcmQoKSB7XHJcbiAgICB0aGlzLmNlbGxzRWwuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMucGllY2VzRWwuc3R5bGUuekluZGV4ID0gbnVsbDtcclxuXHJcbiAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5jZWxscykge1xyXG4gICAgICBmb3IgKGxldCBjZWxsIG9mIHJvdykge1xyXG4gICAgICAgIGNlbGwuZGVsZXRlRWxlbWVudCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgcGllY2Ugb2YgdGhpcy5waWVjZXMpIHtcclxuICAgICAgcGllY2UuZGVsZXRlRWxlbWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHRhcmdldCBvZiB0aGlzLnRhcmdldHMpIHtcclxuICAgICAgdGFyZ2V0LmRlbGV0ZUVsZW1lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNlbGxzID0gW107XHJcbiAgICB0aGlzLnBpZWNlcyA9IFtdO1xyXG4gICAgdGhpcy50YXJnZXRzID0gW107XHJcblxyXG4gICAgdGhpcy5pc0RpcnR5ID0gZmFsc2U7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtjb25zdHJ1Y3RMZXZlbCwgTGV2ZWxEZXNjcmlwdGlvbn0gZnJvbSBcIi4vbGV2ZWxzXCI7XHJcbmltcG9ydCB7R2FtZUFyZWF9IGZyb20gXCIuL2dhbWVfYXJlYVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsQ29udHJvbHMge1xyXG4gIGNvbnN0cnVjdG9yKGxldmVsc1NlbGVjdG9yOiBzdHJpbmcsIGVkaXRvclNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubGV2ZWxzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxldmVsc1NlbGVjdG9yKTtcclxuICAgIHRoaXMuZWRpdG9yRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVkaXRvclNlbGVjdG9yKTtcclxuICAgIHRoaXMuZWRpdG9yRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH1cclxuXHJcbiAgbGV2ZWxzRWw6IEhUTUxFbGVtZW50O1xyXG4gIGVkaXRvckVsOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbGV2ZWxzRWxzOiBIVE1MRWxlbWVudFtdID0gW107XHJcblxyXG4gIGVkaXRvckNvbnRyb2xzIDoge3BpZWNlczogSFRNTEVsZW1lbnQsIGNlbGxzOiBIVE1MRWxlbWVudCwgZWRpdG9yOiBIVE1MRWxlbWVudH0gPSB7XHJcbiAgICBwaWVjZXM6IG51bGwsXHJcbiAgICBjZWxsczogbnVsbCxcclxuICAgIGVkaXRvcjogbnVsbCxcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoZ2FtZUFyZWE6IEdhbWVBcmVhLCBsZXZlbHM6IExldmVsRGVzY3JpcHRpb25bXSkge1xyXG4gICAgdGhpcy5pbml0aWFsaXplTGV2ZWxTZWxlY3RvcnMoZ2FtZUFyZWEsIGxldmVscyk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVMZXZlbEVkaXRvclNlbGVjdG9yKGdhbWVBcmVhKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUxldmVsRWRpdG9yQ29udHJvbHMoZ2FtZUFyZWEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplTGV2ZWxTZWxlY3RvcnMoZ2FtZUFyZWE6IEdhbWVBcmVhLCBsZXZlbHM6IExldmVsRGVzY3JpcHRpb25bXSkge1xyXG4gICAgdGhpcy5sZXZlbHNFbHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldmVscy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBjb25zdCBsZXZlbEJ1dHRvbiA9IHRoaXMuY3JlYXRlUmFkaW8odGhpcy5sZXZlbHNFbCwgYGx2bCR7aSsxfWAsIFN0cmluZyhpKzEpLCBsZXZlbHNbaV0uZGlmZmljdWx0eSwgJ2xldmVsJyk7XHJcblxyXG4gICAgICBsZXZlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICghZ2FtZUFyZWEuaXNEaXJ0eSB8fCBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSB0aGUgbGV2ZWw/XCIpKXtcclxuICAgICAgICAgIGdhbWVBcmVhLmluaXRpYWxpemUoY29uc3RydWN0TGV2ZWwobGV2ZWxzW2ldLmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5sZXZlbHNFbHMucHVzaChsZXZlbEJ1dHRvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVMZXZlbEVkaXRvclNlbGVjdG9yKGdhbWVBcmVhOiBHYW1lQXJlYSkge1xyXG4gICAgdGhpcy5lZGl0b3JDb250cm9scy5lZGl0b3IgPSB0aGlzLmNyZWF0ZVJhZGlvKHRoaXMubGV2ZWxzRWwsYGN1c3RvbWAsICdlZGl0b3InLCAnbWFzdGVyJywgJ2xldmVsJyk7XHJcblxyXG4gICAgdGhpcy5lZGl0b3JDb250cm9scy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGNvbmZpcm0oXCJHbyB0byBsZXZlbCBlZGl0b3IgKGV4cGVyaW1lbnRhbCk/XCIpKSB7XHJcbiAgICAgICAgZ2FtZUFyZWEubGV2ZWxFZGl0b3IoMywgMyk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3JFbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVkaXRvckNvbnRyb2xzLmNlbGxzLmNsaWNrKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVMZXZlbEVkaXRvckNvbnRyb2xzKGdhbWVBcmVhOiBHYW1lQXJlYSkge1xyXG4gICAgdGhpcy5lZGl0b3JDb250cm9scy5waWVjZXMgPSB0aGlzLmNyZWF0ZVJhZGlvKHRoaXMuZWRpdG9yRWwsICdwaWVjZXMnLCAncGllY2VzJywgJ21hc3RlcicsICdjb250cm9scycpO1xyXG4gICAgdGhpcy5lZGl0b3JDb250cm9scy5waWVjZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZ2FtZUFyZWEucGllY2VzRWwuc3R5bGUuekluZGV4ID0gJzEnO1xyXG4gICAgICBnYW1lQXJlYS5jZWxsc0VsLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMuY2VsbHMgPSB0aGlzLmNyZWF0ZVJhZGlvKHRoaXMuZWRpdG9yRWwsICdjZWxscycsICdjZWxscycsICdtYXN0ZXInLCAnY29udHJvbHMnKTtcclxuICAgIHRoaXMuZWRpdG9yQ29udHJvbHMuY2VsbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZ2FtZUFyZWEuY2VsbHNFbC5zdHlsZS56SW5kZXggPSAnMSc7XHJcbiAgICAgIGdhbWVBcmVhLnBpZWNlc0VsLnN0eWxlLnpJbmRleCA9IG51bGw7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVSYWRpbyhlbDogSFRNTEVsZW1lbnQsIGlkOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcsIGZhbWlseTogc3RyaW5nKSA6IEhUTUxFbGVtZW50IHtcclxuICAgIGNvbnN0IHJhZGlvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICByYWRpb0VsLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYWRpb1wiKTtcclxuICAgIHJhZGlvRWwuaWQgPSBpZDtcclxuICAgIHJhZGlvRWwubmFtZSA9IGZhbWlseTtcclxuXHJcbiAgICBjb25zdCBsYWJlbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgbGFiZWxFbC5odG1sRm9yID0gcmFkaW9FbC5pZDtcclxuICAgIGxhYmVsRWwuaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIGxhYmVsRWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG5cclxuICAgIGVsLmFwcGVuZENoaWxkKHJhZGlvRWwpO1xyXG4gICAgZWwuYXBwZW5kQ2hpbGQobGFiZWxFbCk7XHJcblxyXG4gICAgcmV0dXJuIHJhZGlvRWw7XHJcbiAgfVxyXG5cclxuICBzZXRMZXZlbChpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmxldmVsc0Vsc1tpbmRleF0uY2xpY2soKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge0NvbG9ycywgT3BlbmluZ3N9IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBpZWNlIHtcclxuICBkaXJlY3Rpb246IE9wZW5pbmdzO1xyXG4gIGxvY2F0aW9uOiBbbnVtYmVyLCBudW1iZXJdO1xyXG4gIGNvbG9yOiBDb2xvcnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFyZ2V0IHtcclxuICBkaXJlY3Rpb246IE9wZW5pbmdzO1xyXG4gIGxvY2F0aW9uOiBudW1iZXI7XHJcbiAgY29sb3I6IENvbG9ycztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMZXZlbCB7XHJcbiAgY2VsbHM6IE9wZW5pbmdzW11bXTtcclxuICBwaWVjZXM6IFBpZWNlW107XHJcbiAgdGFyZ2V0czogVGFyZ2V0W107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RMZXZlbChjb2RlOiBzdHJpbmcpOiBMZXZlbCB7XHJcbiAgY29uc3QgW2NlbGxzLCBwaWVjZXMsIHRhcmdldHNdID0gY29kZS5zcGxpdCgnfCcpO1xyXG5cclxuICBjb25zdCBsZXZlbDogTGV2ZWwgPSB7XHJcbiAgICBjZWxsczogW10sXHJcbiAgICBwaWVjZXM6IFtdLFxyXG4gICAgdGFyZ2V0czogW10sXHJcbiAgfVxyXG5cclxuICBjb25zdCB0b09wZW5pbmcgPSAoczogc3RyaW5nKTogT3BlbmluZ3MgPT4ge1xyXG4gICAgbGV0IG9wZW5pbmc6IE9wZW5pbmdzID0gT3BlbmluZ3MuTk9ORTtcclxuICAgIGlmIChzLmluY2x1ZGVzKCdyJykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuUklHSFQ7XHJcbiAgICBpZiAocy5pbmNsdWRlcygnYicpKSBvcGVuaW5nIHw9IE9wZW5pbmdzLkJPVFRPTTtcclxuICAgIGlmIChzLmluY2x1ZGVzKCd0JykpIG9wZW5pbmcgfD0gT3BlbmluZ3MuVE9QO1xyXG4gICAgaWYgKHMuaW5jbHVkZXMoJ2wnKSkgb3BlbmluZyB8PSBPcGVuaW5ncy5MRUZUO1xyXG5cclxuICAgIHJldHVybiBvcGVuaW5nO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgcm93IG9mIGNlbGxzLnNwbGl0KCc7JykpIHtcclxuICAgIGNvbnN0IGN1clJvdzogT3BlbmluZ3NbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgY2VsbCBvZiByb3cuc3BsaXQoJywnKSkge1xyXG4gICAgICBjdXJSb3cucHVzaCh0b09wZW5pbmcoY2VsbCkpO1xyXG4gICAgfVxyXG4gICAgbGV2ZWwuY2VsbHMucHVzaChjdXJSb3cpO1xyXG4gIH1cclxuXHJcbiAgbGV0IGkgPSAwO1xyXG5cclxuICBmb3IgKGxldCBwaWVjZSBvZiBwaWVjZXMuc3BsaXQoJzsnKSkge1xyXG4gICAgY29uc3QgW28sIHgsIHldID0gcGllY2Uuc3BsaXQoJywnKTtcclxuICAgIGxldmVsLnBpZWNlcy5wdXNoKHtcclxuICAgICAgZGlyZWN0aW9uOiB0b09wZW5pbmcobyksXHJcbiAgICAgIGxvY2F0aW9uOiBbTnVtYmVyKHgpLCBOdW1iZXIoeSldLFxyXG4gICAgICBjb2xvcjogT2JqZWN0LnZhbHVlcyhDb2xvcnMpW2ldLFxyXG4gICAgfSk7XHJcblxyXG4gICAgKytpO1xyXG4gIH1cclxuXHJcbiAgaSA9IDA7XHJcbiAgZm9yIChsZXQgdGFyZ2V0IG9mIHRhcmdldHMuc3BsaXQoJzsnKSkge1xyXG4gICAgY29uc3QgW2QsIGxdID0gdGFyZ2V0LnNwbGl0KCcsJyk7XHJcbiAgICBsZXZlbC50YXJnZXRzLnB1c2goe1xyXG4gICAgICBkaXJlY3Rpb246IHRvT3BlbmluZyhkKSxcclxuICAgICAgbG9jYXRpb246IE51bWJlcihsKSxcclxuICAgICAgY29sb3I6IE9iamVjdC52YWx1ZXMoQ29sb3JzKVtpXSxcclxuICAgIH0pXHJcblxyXG4gICAgKytpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxldmVsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExldmVsRGVzY3JpcHRpb24ge1xyXG4gIGRpZmZpY3VsdHk6IHN0cmluZyxcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTEVWRUxTOiBMZXZlbERlc2NyaXB0aW9uW10gPSBbXHJcbiAge2RpZmZpY3VsdHk6ICdzdGFydGVyJywgZGVzY3JpcHRpb246ICdyYix0YixsYjtyYixscix0YjtyYix0cixsYnxsLDIsMnxiLDAnfSxcclxuICB7ZGlmZmljdWx0eTogJ3N0YXJ0ZXInLCBkZXNjcmlwdGlvbjogJ2xyLHRiLGxyO3RyLGJsLHRsO3RyLHRsLHRsfHIsMiwwfHIsMid9LFxyXG4gIHtkaWZmaWN1bHR5OiAnc3RhcnRlcicsIGRlc2NyaXB0aW9uOiAndHIsdGIsbGI7dHIsdHIsbHI7dHIsdGIsdGx8dCwwLDA7dCwwLDE7ciwxLDE7ciwxLDJ8bCwxO3IsMTt0LDE7YiwxJ30sIC8vMTVcclxuICB7ZGlmZmljdWx0eTogJ2p1bmlvcicsIGRlc2NyaXB0aW9uOiAndGIsbHIsbHI7dHIsdHIsdHI7dGwsdGwsdGx8dCwwLDA7YiwwLDA7bCwyLDB8ciwwO2wsMTtyLDInfSwgLy8zMFxyXG4gIHtkaWZmaWN1bHR5OiAnZXhwZXJ0JywgZGVzY3JpcHRpb246ICdscixscixsYjt0bCx0bCx0bDt0Yix0bCx0bHxiLDAsMjtiLDIsMHxiLDA7ciwxJ30sIC8vNDVcclxuICB7ZGlmZmljdWx0eTogJ21hc3RlcicsIGRlc2NyaXB0aW9uOiAndGIsbHIsdGI7dHIsdHIsdGw7dGwsdGwsdGx8dCwwLDA7YiwwLDA7ciwxLDE7bCwyLDB8ciwwO3QsMTtsLDE7ciwyJ30sIC8vNTlcclxuXVxyXG5cclxuIiwiaW1wb3J0IHtDb2xvcnMsIE9wZW5pbmdzLCByb3RhdGVPcGVuaW5nc0Nsb2Nrd2lzZSwgUm90YXRpb259IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcblxyXG5jb25zdCBjZWxsc1BhdGggPSAoY2VsbCkgPT4gYGFzc2V0cy9jZWxscy8ke2NlbGx9LnN2Z2A7XHJcbmNvbnN0IHBpZWNlc1BhdGggPSAocGllY2UpID0+IGBhc3NldHMvcGllY2VzLyR7cGllY2V9LnN2Z2A7XHJcbmNvbnN0IHRhcmdldHNQYXRoID0gKHBpZWNlKSA9PiBgYXNzZXRzL3RhcmdldHMvJHtwaWVjZX0uc3ZnYDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDZWxsSW5mbyB7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzO1xyXG4gIHJvdGF0aW9uPzogUm90YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaWVjZUluZm8ge1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgY29sb3I6IENvbG9ycztcclxuICByb3RhdGlvbj86IFJvdGF0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBiYXI6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2JhcicpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuQk9UVE9NLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvcm5lcjogQ2VsbEluZm8gPSB7XHJcbiAgZmlsZU5hbWU6IGNlbGxzUGF0aCgnY29ybmVyJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmdWxsOiBDZWxsSW5mbyA9IHtcclxuICBmaWxlTmFtZTogY2VsbHNQYXRoKCdmdWxsJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5OT05FLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvbmU6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ2xvbmUnKSxcclxuICBpbml0aWFsT3BlbmluZ3M6IE9wZW5pbmdzLlRPUCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaG92ZWw6IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ3Nob3ZlbCcpLFxyXG4gIGluaXRpYWxPcGVuaW5nczogT3BlbmluZ3MuVE9QIHwgT3BlbmluZ3MuUklHSFQgfCBPcGVuaW5ncy5CT1RUT00sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2h1cmlrZW46IENlbGxJbmZvID0ge1xyXG4gIGZpbGVOYW1lOiBjZWxsc1BhdGgoJ3NodXJpa2VuJyksXHJcbiAgaW5pdGlhbE9wZW5pbmdzOiBPcGVuaW5ncy5UT1AgfCBPcGVuaW5ncy5SSUdIVCB8IE9wZW5pbmdzLkJPVFRPTSB8IE9wZW5pbmdzLkxFRlQsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ0VMTFMgPSBbYmFyLCBjb3JuZXIsIGZ1bGwsIGxvbmUsIHNob3ZlbCwgc2h1cmlrZW5dO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxJbmZvKG9wZW5pbmdzOiBPcGVuaW5ncyk6IENlbGxJbmZve1xyXG4gIGNvbnN0IHJvdGF0aW9uczogUm90YXRpb25bXSA9IFswLCA5MCwgMTgwLCAyNzBdO1xyXG5cclxuICBmb3IobGV0IHJvdGF0aW9uIG9mIHJvdGF0aW9ucyl7XHJcbiAgICBmb3IobGV0IGNlbGwgb2YgQ0VMTFMpe1xyXG4gICAgICBpZiAob3BlbmluZ3MgPT09IHJvdGF0ZU9wZW5pbmdzQ2xvY2t3aXNlKGNlbGwuaW5pdGlhbE9wZW5pbmdzLCByb3RhdGlvbiAvIDkwKSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmNlbGwsXHJcbiAgICAgICAgICByb3RhdGlvbjogcm90YXRpb24sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihgdW5hYmxlIHRvIGZpbmQgaW5mbyBmb3IgJHtvcGVuaW5nc31gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlRmlsZU5hbWUocGllY2U6IENvbG9ycyk6IHN0cmluZ3tcclxuICByZXR1cm4gcGllY2VzUGF0aChwaWVjZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXRGaWxlTmFtZSh0YXJnZXQ6IENvbG9ycyk6IHN0cmluZ3tcclxuICByZXR1cm4gdGFyZ2V0c1BhdGgodGFyZ2V0KTtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge0dhbWVBcmVhfSBmcm9tIFwiLi9nYW1lX2FyZWFcIjtcclxuaW1wb3J0IHtMZXZlbENvbnRyb2xzfSBmcm9tICcuL2xldmVsX2NvbnRyb2xzJztcclxuaW1wb3J0IHtMRVZFTFN9IGZyb20gJy4vbGV2ZWxzJztcclxuXHJcbmNvbnN0IGdhbWVBcmVhID0gbmV3IEdhbWVBcmVhKCdnYW1lLWFyZWEgPiBjZWxscycsICdnYW1lLWFyZWEgPiBwaWVjZXMnKTtcclxuY29uc3QgbGV2ZWxDb250cm9scyA9IG5ldyBMZXZlbENvbnRyb2xzKCdjb250cm9sc1tsZXZlbHNdJywgJ2NvbnRyb2xzW2VkaXRvcl0nKTtcclxuXHJcbmxldmVsQ29udHJvbHMuaW5pdGlhbGl6ZShnYW1lQXJlYSwgTEVWRUxTKTtcclxubGV2ZWxDb250cm9scy5zZXRMZXZlbCgwKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9