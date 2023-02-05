import {Openings, rotateOpeningsAntiClockwise, rotateOpeningsClockwise} from "../definitions";
import {getCellInfo} from "../svgs";
import {animateFailure, animateRotate} from "./animation";

export class CellElement {
  el: HTMLElement;
  private rotation: number;

  constructor(public openings: Openings, scaling: number, margin: number) {
    const cellInfo = getCellInfo(openings);
    this.rotation = cellInfo.rotation;

    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');
    this.el.style.transform = `rotate(${cellInfo.rotation}deg)`;

    this.el.setAttribute('src', cellInfo.fileName);

    this.adjust(`${scaling * 100}%`, `${margin * 100}%`);
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

  adjust(edge: string, margin: string) {
    this.el.style.width = edge;
    this.el.style.marginRight = margin;
    this.el.style.marginBottom = margin
  }
}