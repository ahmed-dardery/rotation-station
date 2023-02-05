import {Colors, Openings, rotateOpeningsClockwise, Rotation} from "./definitions";

const cellsPath = (cell) => `assets/cells/${cell}.svg`;
const piecesPath = (piece) => `assets/pieces/${piece}.svg`;
const targetsPath = (piece) => `assets/targets/${piece}.svg`;

export class CellInfo {
  fileName: string;
  initialOpenings: Openings;
  rotation?: Rotation;
}

export class PieceInfo {
  fileName: string;
  color: Colors;
  rotation?: Rotation
}

export const bar: CellInfo = {
  fileName: cellsPath('bar'),
  initialOpenings: Openings.TOP | Openings.BOTTOM,
};

export const corner: CellInfo = {
  fileName: cellsPath('corner'),
  initialOpenings: Openings.TOP | Openings.RIGHT,
};

export const full: CellInfo = {
  fileName: cellsPath('full'),
  initialOpenings: Openings.NONE,
};

export const lone: CellInfo = {
  fileName: cellsPath('lone'),
  initialOpenings: Openings.TOP,
};

export const shovel: CellInfo = {
  fileName: cellsPath('shovel'),
  initialOpenings: Openings.TOP | Openings.RIGHT | Openings.BOTTOM,
};

export const shuriken: CellInfo = {
  fileName: cellsPath('shuriken'),
  initialOpenings: Openings.TOP | Openings.RIGHT | Openings.BOTTOM | Openings.LEFT,
};

export const CELLS = [bar, corner, full, lone, shovel, shuriken];

export function getCellInfo(openings: Openings): CellInfo{
  const rotations: Rotation[] = [0, 90, 180, 270];

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

export function getPieceFileName(piece: Colors): string{
  return piecesPath(piece);
}

export function getTargetFileName(target: Colors): string{
  return targetsPath(target);
}