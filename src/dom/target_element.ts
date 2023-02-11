import {Target} from "../levels";
import {getTargetFileName} from "../svgs";
import {getRotation, Openings, rotateOpeningsClockwise} from "../definitions";

export class TargetElement {
  el: HTMLElement;
  private rotation: number;

  constructor(public target: Target, scaling: number, private offset: number) {
    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');

    this.el.setAttribute('src', getTargetFileName(target.color));
    this.el.setAttribute('class', 'target');

    this.el.style.width = `${scaling * 100}%`;

    this.rotation = getRotation(target.direction);
    this.el.style.transform = `rotate(${this.rotation}deg)`;

    this.setPosition(target.location, target.direction);
  }

  deleteElement() {
    this.el.remove();
  }

  private setPosition(loc: number, direction: Openings) {
    switch (direction) {
      case Openings.LEFT:
        this.el.style.top = `${loc * this.offset * 100}%`;
        this.el.style.left = `-20%`;
        this.el.style.right = this.el.style.bottom = undefined;
        break;
      case Openings.BOTTOM:
        this.el.style.left = `${loc * this.offset * 100}%`;
        this.el.style.bottom = `-20%`;
        this.el.style.right = this.el.style.top = undefined;
        break;
      case Openings.RIGHT:
        this.el.style.top = `${loc * this.offset * 100}%`;
        this.el.style.right = `-20%`;
        this.el.style.left = this.el.style.bottom = undefined;
        break;
      case Openings.TOP:
        this.el.style.left = `${loc * this.offset * 100}%`;
        this.el.style.top = `-20%`;
        this.el.style.right = this.el.style.bottom = undefined;
        break;
      default:
        throw new Error(`Unexpected direction: ${direction}`);
    }
  }
}