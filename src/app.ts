import {animateRotate, animateFailure} from "./animation";
import {corner} from './svgs'

const createElement = (el, attr) => {
    el = document.createElement(el);
    Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

const gameArea : HTMLElement = document.querySelector('game-area');

const node = createElement('img', {'src': `assets/cells/${corner.fileName}.svg`, 'style': 'transform: rotate(0deg);'});

gameArea.appendChild(node);
let angle = 0;
node.addEventListener('click', ()=>{
    animateFailure(node, angle, true);
    //angle+=90;
});
