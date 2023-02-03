import {shuriken} from "./svgs";
import {PieceElement} from "./piece_element";

export class GameArea {
  private constructor() {
  }

  el: HTMLElement = document.querySelector('game-area');

  private cells: PieceElement[][] = [[]];

  initialize(n: number, m: number) {
    this.clearCells();

    // TODO: assumes n is same as m, and shape is perfect square.
    const scaling = 2 / (2 + (n-1)*Math.sqrt(2));
    const margin = -(scaling*n - 1) / (n - 1);

    for (let i = 0; i < n; ++i) {
      this.cells[i] = [];
      for (let j = 0; j < m; ++j) {
        const cur = new PieceElement(shuriken.fileName);
        cur.adjust(`${scaling*100}%`,`${margin*100}%`);

        this.cells[i].push(cur);
        this.el.appendChild(this.cells[i][j].el);
      }
    }
  }

  private clearCells() {
    for (let row of this.cells) {
      for (let cell of row) {
        cell.deleteElement();
      }
    }
  }

  static getInstance(): GameArea {
    return new GameArea();
  }
}