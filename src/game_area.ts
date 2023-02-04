import {CellElement} from "./cell_element";
import {Level} from './levels';
import {OPENINGS} from "./openings";

export class GameArea {
  private constructor() {
  }

  el: HTMLElement = document.querySelector('game-area');

  private cells: CellElement[][] = [];

  initialize(level: Level) {
    this.clearCells();

    const n = level.cells.length;
    const m = level.cells[0].length;
    // TODO: assumes n is same as m, and shape is perfect square.
    const scaling = 2 / (2 + (n-1)*Math.sqrt(2));
    const margin = -(scaling*n - 1) / (n - 1);

    const canRotate = (i, j) => () => {
      if (i > 0 && !(this.cells[i-1][j].openings & OPENINGS.BOTTOM))
        return false;
      if (i < n - 1 && !(this.cells[i+1][j].openings & OPENINGS.TOP))
        return false;
      if (j > 0 && !(this.cells[i][j-1].openings & OPENINGS.RIGHT))
        return false;
      if (j < m - 1 && !(this.cells[i][j+1].openings & OPENINGS.LEFT))
        return false;

      return true;
    }

    let i = 0, j = 0;
    for (let row of level.cells) {
      const curRow = [];
      for (let cell of row) {
        const cur = new CellElement(cell, scaling, margin, canRotate(i, j));

        curRow.push(cur);
        this.el.appendChild(cur.el);

        ++j;
      }
      this.cells.push(curRow);
      j = 0;
      ++i;
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