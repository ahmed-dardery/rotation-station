"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVELS = exports.constructLevel = void 0;
var definitions_1 = require("./definitions");
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
//# sourceMappingURL=levels.js.map