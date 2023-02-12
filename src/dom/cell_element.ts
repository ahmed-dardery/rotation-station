import {Openings, rotateOpeningsAntiClockwise, rotateOpeningsClockwise} from "../definitions";
import {getCellInfo} from "../svgs";
import {animateFailure, animateRotate} from "./animation";

export class CellElement {
  el: HTMLElement;
  private rotation: number;
  public openings: Openings;

  constructor(openings: Openings, scaling: number, offset: number, i: number, j: number) {
    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');

    this.updateOpenings(openings);

    this.adjust(scaling, offset, i, j);
  }

  updateOpenings(openings: Openings) {
    this.openings = openings;

    const cellInfo = getCellInfo(openings);
    this.rotation = cellInfo.rotation;
    this.el.style.transform = `rotate(${cellInfo.rotation}deg)`;
    this.el.setAttribute('src', cellInfo.fileName);
  }

  deleteElement() {
    this.el.remove();
  }

  rotateClockwise() {
    animateRotate(this.el, this.rotation, this.rotation + 90);
    this.rotation = (this.rotation + 90) % 360;
    this.openings = rotateOpeningsClockwise(this.openings);
  }

  rotateAntiClockwise() {
    animateRotate(this.el, this.rotation, this.rotation - 90);
    this.rotation = (this.rotation + 360 - 90) % 360;
    this.openings = rotateOpeningsAntiClockwise(this.openings);
  }

  failRotateClockwise() {
    animateFailure(this.el, this.rotation, true);
  }

  failRotateAntiClockwise() {
    animateFailure(this.el, this.rotation, false);
  }

  adjust(edge: number, offset: number, i: number, j: number) {
    this.el.style.width = `${edge*100}%`;
    this.el.style.height = `${edge*100}%`;
    this.el.style.left = `${offset * j * 100}%`;
    this.el.style.top = `${offset * i * 100}%`;
  }
}