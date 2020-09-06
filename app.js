let clockElement = document.querySelector("#analogClock");
let offset = -90;

let reducedMotion = false;

function timer() {
  let date = new Date();

  let milliseconds = date.getMilliseconds();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  // Let's get more precise
  if (reducedMotion === false) {
    seconds += milliseconds / 1000;
  }

  minutes += seconds / 60;
  hours += minutes / 60;

  // Normalize to the 12 hours clock
  if (hours > 12) {
    hours -= 12;
  }

  clockElement.style.setProperty("--seconds", offset + 6 * seconds + "deg");
  clockElement.style.setProperty("--minutes", offset + 6 * minutes + "deg");
  clockElement.style.setProperty("--hours", offset + 30 * minutes + "deg");

  requestAnimationFrame(timer);
}

timer();

let reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

function setAccessibilityState() {
  if (reduceMotionQuery.matches) {
    reducedMotion = true;
  } else {
    reducedMotion = false;
  }
}

setAccessibilityState();

reduceMotionQuery.addListener(setAccessibilityState);
