"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameArea = void 0;
var cell_element_1 = require("./dom/cell_element");
var definitions_1 = require("./definitions");
var piece_element_1 = require("./dom/piece_element");
var target_element_1 = require("./dom/target_element");
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
//# sourceMappingURL=game_area.js.map