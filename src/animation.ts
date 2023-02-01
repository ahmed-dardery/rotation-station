export function animateRotate(element: HTMLElement & {rotationID?: number}, start: number, end: number){
    let angle = start;
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    const diff = start < end ? 5 : -5;

    element.rotationID = window.setInterval(() => {
        angle += diff;

        if (diff > 0 && angle >= end || diff < 0 && angle <= end) {
            angle = end;
            window.clearInterval(element.rotationID);
        }
        element.style.transform = `rotate(${angle}deg)`
    }, 10);

}

export function animateFailure(element: HTMLElement & {rotationID?: number}, angle: number, clockwise: boolean){
    if (element.rotationID) {
        window.clearInterval(element.rotationID);
    }
    let diff = 2;
    let total = 0;
    let times = 0;
    let myAngle = angle;
    const totalTimes = 3;
    const max = 3;

    element.rotationID = window.setInterval(() => {
        myAngle += diff;
        total += diff;

        element.style.transform = `rotate(${myAngle}deg)`
        if(Math.abs(total) > max){
            diff *= -1;
            ++times;
        }

        if(times >= totalTimes && myAngle === angle){
            window.clearInterval(element.rotationID);
        }
    }, 10);
}
