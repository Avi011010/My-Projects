const counterElement = document.getElementById("counter");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

let counterValue = 0;
let intervalId;

function animateCounter() {
  counterValue++;
  counterElement.textContent = counterValue;
}

startButton.addEventListener("click", () => {
  if (!intervalId) {
    intervalId = setInterval(animateCounter, 1000);
  }
});

pauseButton.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  counterValue = 0;
  counterElement.textContent = counterValue;
});
