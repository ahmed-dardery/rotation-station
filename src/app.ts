import {GameArea} from "./game_area";
import {LevelControls} from './level_controls';
import {LEVELS} from './levels';

const gameArea = new GameArea('game-area > cells', 'game-area > pieces');
document.body.addEventListener('mouseup', (event) => gameArea.piecesElMouseUp(event.x, event.y));
document.body.addEventListener('touchend', (event) => event.changedTouches[0] && gameArea.piecesElMouseUp(event.changedTouches[0].clientX, event.changedTouches[0].clientY));

const levelControls = new LevelControls('controls[levels]', 'controls[editor]');

levelControls.initialize(gameArea, LEVELS);
levelControls.setLevel(0);
