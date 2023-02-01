import {animateRotate, animateFailure} from "./animation";

enum OPENINGS {
    NONE = 0,
    BOTTOM = 1,
    RIGHT = 2,
    TOP = 4,
    LEFT = 8,
}
function rotateClockwise(openings: OPENINGS): OPENINGS {
    return ((openings << 3) | (openings >> 1)) & 0b1111;
}
function rotateAntiClockwise(openings: OPENINGS): OPENINGS {
    return ((openings >> 3) | (openings << 1)) & 0b1111;
}
const createElement = (el, attr) => {
    el = document.createElement(el);
    Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

const SVGs : {[key: string]: {name: string, openings: OPENINGS}} = {
    bar: {
        name: 'bar',
        openings: OPENINGS.TOP | OPENINGS.BOTTOM,
    },
    corner: {
        name: 'corner',
        openings: OPENINGS.TOP | OPENINGS.RIGHT,
    },
    full: {
        name: 'full',
        openings: OPENINGS.NONE,
    },
    lone: {
        name: 'lone',
        openings: OPENINGS.TOP,
    },
    shovel: {
        name: 'shovel',
        openings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM,
    },
    shuriken: {
        name: 'shuriken',
        openings: OPENINGS.TOP | OPENINGS.RIGHT | OPENINGS.BOTTOM | OPENINGS.LEFT,
    }
}

const gameArea : HTMLElement = document.querySelector('game-area');

const node = createElement('img', {'src': `assets/cells/${SVGs.corner.name}.svg`, 'style': 'transform: rotate(0deg);'});

gameArea.appendChild(node);
let angle = 0;
node.addEventListener('click', ()=>{
    animateFailure(node, angle, true);
    //angle+=90;
});
