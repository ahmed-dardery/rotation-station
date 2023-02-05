import {Corners, getRotation, Openings, rotateOpeningsAntiClockwise, rotateOpeningsClockwise} from "../definitions";
import {animateFailure, animateRotate} from "./animation";
import {Piece} from "../levels";
import {getPieceFileName} from "../svgs";

export type MoveAttemptCallBack = (location: [number, number], clockwise: boolean) => void;

export class PieceElement {
  el: HTMLElement;
  private rotation: number;

  private mouseDown?: [number, number];

  constructor(public piece: Piece, scaling: number, private offset: number, private moveAttemptCallback: MoveAttemptCallBack) {
    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');

    this.el.setAttribute('src', getPieceFileName(piece.color));
    this.el.setAttribute('class', 'piece');

    this.el.style.width = `${scaling * 100}%`;

    this.rotation = getRotation(piece.direction);
    this.el.style.transform = `rotate(${this.rotation}deg)`;

    this.setPosition(...piece.location);

    this.el.addEventListener('mousedown', (event: MouseEvent) => {
      this.mouseDown = [event.x, event.y];
    });
  }

  onMouseUp(event) {
    if (this.mouseDown == null){
      return;
    }

    const [x, y] = this.mouseDown;
    this.mouseDown = null;

    let corner: Corners = 0;

    if (event.x > x){
      corner |= Openings.RIGHT;
    } else {
      corner |= Openings.LEFT;
    }

    if (event.y > y){
      corner |= Openings.BOTTOM;
    } else {
      corner |= Openings.TOP;
    }

    if (this.piece.direction & corner) {
      this.switchAttachment();
    }

    const clockwise = (rotateOpeningsClockwise(this.piece.direction) & corner) !== 0;

    this.moveAttemptCallback(this.piece.location, clockwise);
  }

  deleteElement() {
    this.el.remove();
  }

  rotateClockwise() {
    animateRotate(this.el, this.rotation, this.rotation + 90);
    this.rotation = (this.rotation + 90) % 360;
    this.piece.direction = rotateOpeningsClockwise(this.piece.direction);
  }

  rotateAntiClockwise() {
    animateRotate(this.el, this.rotation, this.rotation - 90);
    this.rotation = (this.rotation + 360 - 90) % 360;
    this.piece.direction = rotateOpeningsAntiClockwise(this.piece.direction);
  }

  failRotateClockwise() {
    animateFailure(this.el, this.rotation, true);
  }

  failRotateAntiClockwise() {
    animateFailure(this.el, this.rotation, false);
  }

  isLocatedAt(location: [number, number]){
    const areEqual = (a: [number, number], b: [number, number]) => a[0] === b[0] && a[1] === b[1];

    if (areEqual(location, this.piece.location)){
      return true;
    }

    if (areEqual(location, this.getPotentialLocation())){
      this.switchAttachment();
      return true;
    }
  }

  private getPotentialLocation() : [number, number] {
    const back = [Openings.TOP, Openings.LEFT].includes(this.piece.direction);
    const vertical = [Openings.TOP, Openings.BOTTOM].includes(this.piece.direction);

    const loc: [number, number] = [this.piece.location[0], this.piece.location[1]];
    loc[vertical ? 0 : 1] += back ? -1 : 1;

    return loc;
  }

  private switchAttachment() {
    this.piece.location = this.getPotentialLocation();
    this.piece.direction = rotateOpeningsClockwise(this.piece.direction, 2);
    this.rotation = (this.rotation + 180) % 360;
    this.el.style.transform = `rotate(${this.rotation}deg)`;

    this.setPosition(...this.piece.location);
  }

  private setPosition(x: number, y: number) {
    this.el.style.top = `${x * this.offset * 100}%`;
    this.el.style.left = `${y * this.offset * 100}%`;
  }
}