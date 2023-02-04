import {Corners, getRotation, Openings, rotateOpeningsAntiClockwise, rotateOpeningsClockwise} from "../definitions";
import {animateFailure, animateRotate} from "./animation";
import {Piece} from "../levels";
import {getPieceFileName} from "../svgs";

export class PieceElement {
  el: HTMLElement;
  private rotation: number;

  constructor(public piece: Piece, scaling: number, private offset: number) {
    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');

    this.el.setAttribute('src', getPieceFileName(piece.color));

    this.el.style.width = `${scaling * 100}%`;

    this.rotation = getRotation(piece.direction);
    this.el.style.transform = `rotate(${this.rotation}deg)`;

    this.setPosition(...piece.location);

    // @ts-ignore: for testing purposes, use: document.querySelector("body > game-area > pieces > img").test('tr')
    this.el.test = (dir) => {
      if(dir==='tl'){
        this.rotateTowards(Corners.TOP_LEFT);
      }
      if(dir==='tr'){
        this.rotateTowards(Corners.TOP_RIGHT);
      }
      if(dir==='bl'){
        this.rotateTowards(Corners.BOTTOM_LEFT);
      }
      if(dir==='br'){
        this.rotateTowards(Corners.BOTTOM_RIGHT);
      }
      if(dir==='s'){
        this.switchAttachment();
      }
    };
  }

  deleteElement() {
    this.el.remove();
  }

  rotateTowards(corner: Corners) {
    if (this.piece.direction & corner){
      this.switchAttachment();
    }

    if (rotateOpeningsClockwise(this.piece.direction) & corner){
      this.rotateClockwise();
    } else{
      this.rotateAntiClockwise();
    }
  }

  private switchAttachment() {
    const back = [Openings.TOP, Openings.LEFT].includes(this.piece.direction);
    const vertical = [Openings.TOP, Openings.BOTTOM].includes(this.piece.direction);

    this.piece.direction = rotateOpeningsClockwise(this.piece.direction, 2);
    this.rotation = (this.rotation + 180) % 360;
    this.el.style.transform = `rotate(${this.rotation}deg)`;
    this.piece.location[vertical ? 0 : 1] += back ? -1 : 1;

    this.setPosition(...this.piece.location);
  }

  private rotateClockwise() {
    animateRotate(this.el, this.rotation, this.rotation + 90);
    this.rotation = (this.rotation + 90) % 360;
    this.piece.direction = rotateOpeningsClockwise(this.piece.direction);
  }

  private rotateAntiClockwise() {
    animateRotate(this.el, this.rotation, this.rotation - 90);
    this.rotation = (this.rotation + 360 - 90) % 360;
    this.piece.direction = rotateOpeningsAntiClockwise(this.piece.direction);
  }

  private failRotateClockwise() {
    animateFailure(this.el, this.rotation, true);
  }

  private failRotateAntiClockwise() {
    animateFailure(this.el, this.rotation, false);
  }

  private setPosition(x: number, y: number){
    this.el.style.top = `${x*this.offset*100}%`;
    this.el.style.left = `${y*this.offset*100}%`;
  }
}