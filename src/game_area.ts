import {CellElement} from "./dom/cell_element";
import {Level} from './levels';
import {Openings} from "./definitions";
import {PieceElement} from "./dom/piece_element";

export class GameArea {
  private constructor() {
  }

  cellsEl: HTMLElement = document.querySelector('game-area > cells');
  piecesEl: HTMLElement = document.querySelector('game-area > pieces');

  private cells: CellElement[][] = [];
  private pieces: PieceElement[] = [];

  initialize(level: Level) {
    this.clearBoard();

    const n = level.cells.length;
    const m = level.cells[0].length;

    // TODO: assumes n is same as m, and shape is perfect square.
    const scaling = 2 / (2 + (n-1)*Math.sqrt(2));
    const margin = -(scaling*n - 1) / (n - 1);

    const canRotate = (i, j) => () => {
      if (i > 0 && !(this.cells[i-1][j].openings & Openings.BOTTOM))
        return false;
      if (i < n - 1 && !(this.cells[i+1][j].openings & Openings.TOP))
        return false;
      if (j > 0 && !(this.cells[i][j-1].openings & Openings.RIGHT))
        return false;
      if (j < m - 1 && !(this.cells[i][j+1].openings & Openings.LEFT))
        return false;

      return true;
    }

    let i = 0, j = 0;
    for (let row of level.cells) {
      const curRow = [];
      for (let cell of row) {
        const cur = new CellElement(cell, scaling, margin, canRotate(i, j));

        curRow.push(cur);
        this.cellsEl.appendChild(cur.el);

        ++j;
      }
      this.cells.push(curRow);
      j = 0;
      ++i;
    }

    for(let piece of level.pieces) {
      //TODO: off by a bit, piece will appear to change location based on attachment.
      const cur = new PieceElement(piece, scaling, scaling + margin);

      this.piecesEl.appendChild(cur.el);
      this.pieces.push(cur);
    }
  }

  private clearBoard() {
    for (let row of this.cells) {
      for (let cell of row) {
        cell.deleteElement();
      }
    }

    for (let piece of this.pieces) {
      piece.deleteElement();
    }
  }

  static getInstance(): GameArea {
    return new GameArea();
  }
}