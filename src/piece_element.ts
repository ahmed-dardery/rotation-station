export class PieceElement {
  el: HTMLElement;

  constructor(src: string) {
    this.el = document.createElement('img');
    this.el.setAttribute('draggable', 'false');

    if (src) {
      this.el.setAttribute('src', src);
    }
  }

  deleteElement() {
    this.el.remove();
  }

  adjust(edge: string, margin: string) {
    this.el.style.width = edge;
    this.el.style.marginRight = margin;
    this.el.style.marginBottom = margin
  }

}