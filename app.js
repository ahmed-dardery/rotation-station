"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_area_1 = require("./game_area");
var levels_1 = require("./levels");
var gameArea = game_area_1.GameArea.getInstance();
gameArea.initialize((0, levels_1.constructLevel)(levels_1.LEVELS[1]));
//# sourceMappingURL=app.js.map