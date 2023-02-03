import {OPENINGS} from "./openings";

const filePath = (cell) => `assets/cells/${cell}.svg`

export interface PieceInfo {
  fileName: string;
  initialOpenings: OPENINGS;
}

export const bar = {
  fileName: filePath('bar'),
  initialOpenings: OPENINGS.TOP | OPENINGS.BOTTOM,
};

export const corner = {
  fileName: filePath('corner'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT,
};

export const full = {
  fileName: filePath('full'),
  initialOpenings: OPENINGS.NONE,
};

export const lone = {
  fileName: filePath('lone'),
  initialOpenings: OPENINGS.TOP,
};

export const shovel = {
  fileName: filePath('shovel'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM,
};

export const shuriken = {
  fileName: filePath('shuriken'),
  initialOpenings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM | OPENINGS.LEFT,
};