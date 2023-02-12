import {constructLevel, LevelDescription} from "./levels";
import {GameArea} from "./game_area";

export class LevelControls {
  constructor(levelsSelector: string, editorSelector: string) {
    this.levelsEl = document.querySelector(levelsSelector);
    this.editorEl = document.querySelector(editorSelector);
    this.editorEl.style.display = "none";
  }

  levelsEl: HTMLElement;
  editorEl: HTMLElement;

  levelsEls: HTMLElement[] = [];

  editorControls : {pieces: HTMLElement, cells: HTMLElement, editor: HTMLElement} = {
    pieces: null,
    cells: null,
    editor: null,
  }

  initialize(gameArea: GameArea, levels: LevelDescription[]) {
    this.initializeLevelSelectors(gameArea, levels);
    this.initializeLevelEditorSelector(gameArea);
    this.initializeLevelEditorControls(gameArea);
  }

  private initializeLevelSelectors(gameArea: GameArea, levels: LevelDescription[]) {
    this.levelsEls = [];

    for (let i = 0; i < levels.length; ++i) {
      const levelButton = this.createRadio(this.levelsEl, `lvl${i+1}`, String(i+1), levels[i].difficulty, 'level');

      levelButton.addEventListener('click', (event) => {
        if (!gameArea.isDirty || confirm("Are you sure you want to change the level?")){
          gameArea.initialize(constructLevel(levels[i].description));
          this.editorEl.style.display = 'none';
        } else{
          event.preventDefault();
        }
      });

      this.levelsEls.push(levelButton);
    }
  }

  private initializeLevelEditorSelector(gameArea: GameArea) {
    this.editorControls.editor = this.createRadio(this.levelsEl,`custom`, 'editor', 'master', 'level');

    this.editorControls.editor.addEventListener('click', (event) => {
      if (confirm("Go to level editor (experimental)?")) {
        gameArea.levelEditor(3, 3);
        this.editorEl.style.display = null;
        this.editorControls.cells.click();
      } else {
        event.preventDefault();
      }
    });
  }

  private initializeLevelEditorControls(gameArea: GameArea) {
    this.editorControls.pieces = this.createRadio(this.editorEl, 'pieces', 'pieces', 'master', 'controls');
    this.editorControls.pieces.addEventListener('click', (event) => {
      gameArea.piecesEl.style.zIndex = '1';
      gameArea.cellsEl.style.zIndex = null;
    })

    this.editorControls.cells = this.createRadio(this.editorEl, 'cells', 'cells', 'master', 'controls');
    this.editorControls.cells.addEventListener('click', (event) => {
      gameArea.cellsEl.style.zIndex = '1';
      gameArea.piecesEl.style.zIndex = null;
    })
  }

  private createRadio(el: HTMLElement, id: string, text: string, className: string, family: string) : HTMLElement {
    const radioEl = document.createElement("input");
    radioEl.setAttribute("type", "radio");
    radioEl.id = id;
    radioEl.name = family;

    const labelEl = document.createElement("label");
    labelEl.htmlFor = radioEl.id;
    labelEl.innerText = text;
    labelEl.className = className;

    el.appendChild(radioEl);
    el.appendChild(labelEl);

    return radioEl;
  }

  setLevel(index: number) {
    this.levelsEls[index].click();
  }
}