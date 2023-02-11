export function animateRotate(element: HTMLElement, start: number, end: number) {

  element.style.transform = `rotate(${end}deg)`

  element.animate([
    { transform: `rotate(${start}deg)` },
    { transform: `rotate(${end}deg)` },
  ], {
    duration: 400,
    easing: 'ease',
  })
}

export function animateFailure(element: HTMLElement, angle: number, clockwise: boolean) {

  const delta = clockwise ? 3 : -3;

  element.animate([
    { transform: `rotate(${angle}deg)` },
    { transform: `rotate(${angle+delta}deg)` },
    { transform: `rotate(${angle}deg)` },
    { transform: `rotate(${angle-delta}deg)` },
    { transform: `rotate(${angle}deg)` },
  ], {
    duration: 100,
    iterations: 3,
  })
}
