import {OPENINGS} from "./openings";

export interface Piece {
  orientation: 'h' | 'v';
  /** Row and column */
  location: [number, number];
}

export interface Target {
  direction: OPENINGS;
  location: number;
}

export interface Level {
  cells: OPENINGS[][];
  pieces: Piece[];
  targets: Target[];
}

export function constructLevel(code: string): Level {
  const [cells, pieces, targets] = code.split('|');

  const level: Level = {
    cells: [],
    pieces: [],
    targets: [],
  }

  const toOpening = (s: string): OPENINGS => {
    let opening: OPENINGS = OPENINGS.NONE;
    if (s.includes('r')) opening |= OPENINGS.RIGHT;
    if (s.includes('b')) opening |= OPENINGS.BOTTOM;
    if (s.includes('t')) opening |= OPENINGS.TOP;
    if (s.includes('l')) opening |= OPENINGS.LEFT;

    return opening;
  }

  for (let row of cells.split(';')) {
    const curRow: OPENINGS[] = [];
    for (let cell of row.split(',')) {
      curRow.push(toOpening(cell));
    }
    level.cells.push(curRow);
  }

  for (let piece of pieces.split(';')) {
    const [o, x, y] = piece.split(',');
    level.pieces.push({
      orientation: o as 'v' | 'h',
      location: [Number(x), Number(y)],
    });
  }

  for (let target of targets.split(';')) {
    const [d, l] = target.split(',');
    level.targets.push({
      direction: toOpening(d),
      location: Number(l),
    })
  }

  return level;
}

export const LEVELS = [
  'rb,tb,lb;rb,lr,tb;rb,tr,lb|v,2,2|b,0',
]
