import {CellElement} from "./dom/cell_element";
import {Level} from './levels';
import {Openings} from "./definitions";
import {PieceElement} from "./dom/piece_element";
import {TargetElement} from "./dom/target_element";

export class GameArea {
  private constructor() {
    this.piecesEl.addEventListener('mouseup', (event) => this.piecesElMouseUp(event));
  }

  cellsEl: HTMLElement = document.querySelector('game-area > cells');
  piecesEl: HTMLElement = document.querySelector('game-area > pieces');

  private cells: CellElement[][] = [];
  private pieces: PieceElement[] = [];
  private targets: TargetElement[] = [];

  private piecesElMouseUp: (event) => void;

  initialize(level: Level) {
    this.clearBoard();

    const n = level.cells.length;
    const m = level.cells[0].length;

    // TODO: assumes n is same as m, and shape is perfect square.
    const scaling = 2 / (2 + (n - 1) * Math.sqrt(2));
    const margin = -(scaling * n - 1) / (n - 1);

    let i = 0, j = 0;
    for (let row of level.cells) {
      const curRow = [];
      for (let cell of row) {
        const cur = new CellElement(cell, scaling, margin);

        curRow.push(cur);
        this.cellsEl.appendChild(cur.el);

        ++j;
      }
      this.cells.push(curRow);
      j = 0;
      ++i;
    }


    for (let piece of level.pieces) {
      const cur = new PieceElement(piece, scaling, scaling + margin, this.attemptToMove);

      this.piecesEl.appendChild(cur.el);
      this.pieces.push(cur);
    }

    this.piecesElMouseUp = (event) => {
      for (let piece of this.pieces) {
        piece.onMouseUp(event);
      }
    }

    for (let target of level.targets) {
      const cur = new TargetElement(target, scaling, scaling + margin);

      this.piecesEl.appendChild(cur.el);
      this.targets.push(cur);
    }
  }

  attemptToMove = (location: [number, number], clockwise: boolean) => {
    const [i, j] = location;

    if (this.canRotate(i, j)) {
      clockwise ? this.cells[i][j].rotateClockwise() : this.cells[i][j].rotateAntiClockwise();

      this.pieces.filter((piece) => piece.isLocatedAt(location)).forEach((pieceEl) => {
        clockwise ? pieceEl.rotateClockwise() : pieceEl.rotateAntiClockwise();
      })
    } else {
      clockwise ? this.cells[i][j].failRotateClockwise() : this.cells[i][j].failRotateAntiClockwise();

      this.pieces.filter((piece) => piece.isLocatedAt(location)).forEach((pieceEl) => {
        clockwise ? pieceEl.failRotateClockwise() : pieceEl.failRotateAntiClockwise();
      })
    }
  }

  private canRotate(i: number, j: number): boolean {
    if (i > 0 && !(this.cells[i - 1][j].openings & Openings.BOTTOM))
      return false;
    if (i < this.cells.length - 1 && !(this.cells[i + 1][j].openings & Openings.TOP))
      return false;
    if (j > 0 && !(this.cells[i][j - 1].openings & Openings.RIGHT))
      return false;
    if (j < this.cells[i].length - 1 && !(this.cells[i][j + 1].openings & Openings.LEFT))
      return false;

    return true;
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