import {OPENINGS, rotateOpeningsClockwise} from "./openings";

const filePath = (cell) => `assets/cells/${cell}.svg`

type Rotations = 0|90|180|270;

export class CellInfo {
  fileName: string;
  initialOpenings: OPENINGS;
  rotation?: Rotations;
}

export const bar: CellInfo = {
  fileName: filePath('bar'),
  initialOpenings: OPENINGS.TOP | OPENINGS.BOTTOM,
};

export const corner: CellInfo = {
  fileName: filePath('corner'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT,
};

export const full: CellInfo = {
  fileName: filePath('full'),
  initialOpenings: OPENINGS.NONE,
};

export const lone: CellInfo = {
  fileName: filePath('lone'),
  initialOpenings: OPENINGS.TOP,
};

export const shovel: CellInfo = {
  fileName: filePath('shovel'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM,
};

export const shuriken: CellInfo = {
  fileName: filePath('shuriken'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM | OPENINGS.LEFT,
};

export const CELLS = [bar, corner, full, lone, shovel, shuriken];

export function getCellInfo(openings: OPENINGS): CellInfo{
  const rotations: Rotations[] = [0, 90, 180, 270];

  for(let rotation of rotations){
    for(let cell of CELLS){
      if (openings === rotateOpeningsClockwise(cell.initialOpenings, rotation / 90)){
        return {
          ...cell,
          rotation: rotation,
        }
      }
    }
  }
}