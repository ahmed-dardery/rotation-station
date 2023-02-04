import {GameArea} from "./game_area";
import {constructLevel, LEVELS} from './levels';

const gameArea = GameArea.getInstance();

gameArea.initialize(constructLevel(LEVELS[0]));