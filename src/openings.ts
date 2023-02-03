export enum OPENINGS {
  NONE = 0,
  BOTTOM = 1,
  RIGHT = 2,
  TOP = 4,
  LEFT = 8,
}

export function rotateClockwise(openings: OPENINGS): OPENINGS {
  return ((openings << 3) | (openings >> 1)) & 0b1111;
}

export function rotateAntiClockwise(openings: OPENINGS): OPENINGS {
  return ((openings >> 3) | (openings << 1)) & 0b1111;
}