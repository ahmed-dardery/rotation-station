import {constructLevel, LevelDescription} from "./levels";
import {GameArea} from "./game_area";

export class LevelControls {
  constructor(controlsSelector: string) {
    this.controlsEl = document.querySelector('controls');
  }

  controlsEl: HTMLElement;
  radios: HTMLElement[] = [];

  initialize(gameArea: GameArea, levels: LevelDescription[]) {
    this.radios = [];

    for (let i = 0; i < levels.length; ++i) {
      const radioEl = document.createElement("input");
      radioEl.setAttribute("type", "radio");
      radioEl.id = `lvl${i}`;
      radioEl.name= `level`;
      radioEl.addEventListener('click', (event) => {
        if (!gameArea.isDirty || confirm("Are you sure you want to change the level?")){
          gameArea.initialize(constructLevel(levels[i].description));
        } else{
          event.preventDefault();
        }
      });

      const labelEl = document.createElement("label");
      labelEl.htmlFor = radioEl.id;
      labelEl.innerText = String(i + 1);
      labelEl.className = levels[i].difficulty;

      this.controlsEl.appendChild(radioEl);
      this.controlsEl.appendChild(labelEl);

      this.radios.push(radioEl);
    }
  }

  setLevel(index: number) {
    this.radios[index].click();
  }
}