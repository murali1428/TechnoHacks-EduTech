const clock = {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  },
};

const displayedTime = document.getElementById('countdown');
const countdownForm = document.getElementById('countdown-form');
const secondsInput = document.getElementById('seconds');
let count = 0;
let running = false;
let paused = false;
let timer = null;
let userInputValue = 0;

function update() {
  displayedTime.textContent = clock.format(count);
}

function handleStart() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      if (!paused) {
        const newCount = count - 1;
        count = newCount >= 0 ? newCount : 0;
        update();
      }
    }, 1000);
  }
}

function handlePause() {
  if (timer) {
    clearInterval(timer);
    running = false;
    paused = true;
    pauseBtn.textContent = 'Resume';
  }
}

function handleResume() {
  if (!running) {
    running = true;
    paused = false;

    pauseBtn.textContent = 'Pause';

    timer = setInterval(() => {
      if (!paused) {
        const newCount = count - 1;
        count = newCount >= 0 ? newCount : 0;
        update();
      }
    }, 1000);
  }
}

function handleRestart() {
  handlePause();
  count = userInputValue;
  paused = false;
  update();

  pauseBtn.textContent = 'Pause';
}

function handleReset() {
  handlePause();
  count = 0;
  update();

  pauseBtn.textContent = 'Pause';
}

function handleCountdown(seconds) {
  userInputValue = seconds;
  count = seconds;
  paused = false;
  handleStart();
}

countdownForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const strSeconds = secondsInput.value;
  if (strSeconds.match(/^\d+$/)) {
    secondsInput.value = '';
    handleCountdown(parseInt(strSeconds, 10));
  }
});

const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
  if (paused) {
    handleResume();
  } else {
    handlePause();
  }
});
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  handleReset();
});

const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', () => {
  handleRestart();
  handleStart();
});

update();