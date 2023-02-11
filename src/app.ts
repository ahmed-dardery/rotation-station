import {GameArea} from "./game_area";
import {LevelControls} from './level_controls';
import {LEVELS} from './levels';

const gameArea = new GameArea('game-area > cells', 'game-area > pieces');
const levelControls = new LevelControls('controls');

levelControls.initialize(gameArea, LEVELS);
levelControls.setLevel(0);
