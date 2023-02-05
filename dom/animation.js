"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateFailure = exports.animateRotate = void 0;
function animateRotate(element, start, end) {
    var angle = start;
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    var diff = start < end ? 5 : -5;
    element.rotationID = window.setInterval(function () {
        angle += diff;
        if (diff > 0 && angle >= end || diff < 0 && angle <= end) {
            angle = end;
            window.clearInterval(element.rotationID);
        }
        element.style.transform = "rotate(".concat(angle, "deg)");
    }, 10);
}
exports.animateRotate = animateRotate;
function animateFailure(element, angle, clockwise) {
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    var diff = clockwise ? 2 : -2;
    var total = 0;
    var times = 0;
    var myAngle = angle;
    var totalTimes = 3;
    var max = 3;
    element.rotationID = window.setInterval(function () {
        myAngle += diff;
        total += diff;
        element.style.transform = "rotate(".concat(myAngle, "deg)");
        if (Math.abs(total) > max) {
            diff *= -1;
            ++times;
        }
        if (times >= totalTimes && myAngle === angle) {
            window.clearInterval(element.rotationID);
        }
    }, 10);
}
exports.animateFailure = animateFailure;
//# sourceMappingURL=animation.js.map