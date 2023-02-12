export enum Openings {
  NONE = 0,
  BOTTOM = 1,
  RIGHT = 2,
  TOP = 4,
  LEFT = 8,
}

export enum Colors {
  blue = 'blue',
  cyan = 'cyan',
  green = 'green',
  red = 'red',
  violet = 'violet',
  yellow = 'yellow',
}

export type Rotation = 0|90|180|270;

export enum Corners {
  TOP_LEFT = Openings.TOP | Openings.LEFT,
  TOP_RIGHT = Openings.TOP | Openings.RIGHT,
  BOTTOM_LEFT = Openings.BOTTOM | Openings.LEFT,
  BOTTOM_RIGHT = Openings.BOTTOM | Openings.RIGHT,
}


export function rotateOpeningsClockwise(openings: Openings, n = 1): Openings {
  return ((openings << (4-n)) | (openings >> n)) & 0b1111;
}

export function rotateOpeningsAntiClockwise(openings: Openings, n = 1): Openings {
  return ((openings >> (4-n)) | (openings << n)) & 0b1111;
}

const openingsCycle: Openings[] = [
  0b0000,
  0b1100,
  0b0110,
  0b0011,
  0b1001,
  0b1010,
  0b0101,
  0b1110,
  0b0111,
  0b1011,
  0b1101,
  0b1000,
  0b0100,
  0b0010,
  0b0001,
  0b1111,
];

export function cycleOpenings(openings: Openings, backwards = false): Openings {
  const idx = openingsCycle.findIndex((v) => v === openings);
  const nxt = (idx + (backwards ? 15 : 1)) % 16;
  return openingsCycle[nxt];
}
/** Assumes Left is 0, returns clockwise angle. */
export function getRotation(opening: Openings): Rotation {
  switch(opening){
    case Openings.LEFT:
      return 0;
    case Openings.TOP:
      return 90;
    case Openings.RIGHT:
      return 180;
    case Openings.BOTTOM:
      return 270;
    default:
      throw new Error(`Unexpected opening argument: ${opening}.`);
  }
}