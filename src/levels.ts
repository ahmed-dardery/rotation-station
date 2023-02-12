import {Colors, Openings} from "./definitions";

export interface Piece {
  direction: Openings;
  location: [number, number];
  color: Colors;
}

export interface Target {
  direction: Openings;
  location: number;
  color: Colors;
}

export interface Level {
  cells: Openings[][];
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

  const toOpening = (s: string): Openings => {
    let opening: Openings = Openings.NONE;
    if (s.includes('r')) opening |= Openings.RIGHT;
    if (s.includes('b')) opening |= Openings.BOTTOM;
    if (s.includes('t')) opening |= Openings.TOP;
    if (s.includes('l')) opening |= Openings.LEFT;

    return opening;
  }

  for (let row of cells.split(';')) {
    const curRow: Openings[] = [];
    for (let cell of row.split(',')) {
      curRow.push(toOpening(cell));
    }
    level.cells.push(curRow);
  }

  let i = 0;

  for (let piece of pieces.split(';')) {
    const [o, x, y] = piece.split(',');
    level.pieces.push({
      direction: toOpening(o),
      location: [Number(x), Number(y)],
      color: Object.values(Colors)[i],
    });

    ++i;
  }

  i = 0;
  for (let target of targets.split(';')) {
    const [d, l] = target.split(',');
    level.targets.push({
      direction: toOpening(d),
      location: Number(l),
      color: Object.values(Colors)[i],
    })

    ++i;
  }

  return level;
}

export interface LevelDescription {
  difficulty: string,
  description: string,
}

export const LEVELS: LevelDescription[] = [
  {difficulty: 'starter', description: 'rb,tb,lb;rb,lr,tb;rb,tr,lb|l,2,2|b,0'},
  {difficulty: 'starter', description: 'lr,tb,lr;tr,bl,tl;tr,tl,tl|r,2,0|r,2'},
  {difficulty: 'starter', description: 'tr,tb,lb;tr,tr,lr;tr,tb,tl|t,0,0;t,0,1;r,1,1;r,1,2|l,1;r,1;t,1;b,1'}, //15
  {difficulty: 'junior', description: 'tb,lr,lr;tr,tr,tr;tl,tl,tl|t,0,0;b,0,0;l,2,0|r,0;l,1;r,2'}, //30
  {difficulty: 'expert', description: 'lr,lr,lb;tl,tl,tl;tb,tl,tl|b,0,2;b,2,0|b,0;r,1'}, //45
  {difficulty: 'master', description: 'tb,lr,tb;tr,tr,tl;tl,tl,tl|t,0,0;b,0,0;r,1,1;l,2,0|r,0;t,1;l,1;r,2'}, //59
]

