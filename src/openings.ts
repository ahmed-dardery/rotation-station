export enum OPENINGS {
  NONE = 0,
  BOTTOM = 1,
  RIGHT = 2,
  TOP = 4,
  LEFT = 8,
}

export function rotateOpeningsClockwise(openings: OPENINGS, n = 1): OPENINGS {
  return ((openings << (4-n)) | (openings >> n)) & 0b1111;
}

export function rotateOpeningsAntiClockwise(openings: OPENINGS, n = 1): OPENINGS {
  return ((openings >> (4-n)) | (openings << n)) & 0b1111;
}