import {GameArea} from "./game_area";
import {LevelControls} from './level_controls';
import {LEVELS} from './levels';

const gameArea = new GameArea('game-area > cells', 'game-area > pieces');
document.body.addEventListener('mouseup', (event) => gameArea.piecesElMouseUp(event))

const levelControls = new LevelControls('controls[levels]', 'controls[editor]');

levelControls.initialize(gameArea, LEVELS);
levelControls.setLevel(0);
