import gameManager from "./game-manager.js";
/* User controllers for the modifying the state of the game  */

const slider = document.querySelector(".move-slider");
const skipBackwardButton = document.querySelector(".skip-backward-button");
const skipPreviousButton = document.querySelector(".skip-previous-button");
const pauseButton = document.querySelector(".pause-button");
const skipButton = document.querySelector(".skip-button");
const fastfowardButton = document.querySelector(".fastforward-button");
const speedSlider = document.querySelector(".speed-slider");
const resultText = document.querySelector(".result")

function sliderSetMax(max) {
    const oldMax = slider.max;
    const value = slider.value;
    slider.max = max;
    if (oldMax === value) {
        slider.value = max;
    }
}

function sliderSetValue(value) {
    if (value > slider.max) return;
    slider.value = value;
}

function updatePauseButtonIcon() {
    if (gameManager.isPaused()) {
        pauseButton.style = "background-image: url('images/resume.png')"
    } else {
        pauseButton.style = "background-image: url('images/pause-icon.png')"
    }
}

slider.addEventListener("input", (evt) => {
    gameManager.setMajor(parseInt(slider.value));
});

slider.addEventListener("mousedown", (evt) => {
    gameManager.pause();
});

document.addEventListener("Init", (evt) => {
    sliderSetMax(evt.detail.gameState.length - 1);
    console.log("Cards:", evt.detail.gameState);
    console.log("Result:", evt.detail.gameResult);
});

// Sets the main slider to the current relative position of the moves
// Gets called every "tick" / gameloop
document.addEventListener("GameManager", (evt) => {
    sliderSetValue(evt.detail.currentMajor);
    if (evt.detail.finished) {
        resultText.classList.add("result-text");
        if (evt.detail.gameResult.cycle === 1) {
            resultText.textContent = "Patiensen gick ut";
        } else {
            resultText.textContent = `Patiensen gick INTE ut med en period på ${evt.detail.gameResult.cycle} drag`;
        }
    } else {
        resultText.classList.remove("result-text");
        resultText.textContent = "";
    }
});

document.addEventListener("keydown", (evt) => {
    if (evt.key === 'ArrowRight') {
        gameManager.next();
    } else if (evt.key === 'ArrowLeft') {
        gameManager.prev();
    }
})

skipBackwardButton.addEventListener("click", (evt) => {
    gameManager.setMajor(0);
    gameManager.pause();
});

skipPreviousButton.addEventListener("click", (evt) => {
    gameManager.prev();
})

pauseButton.addEventListener("click", (evt) => {
    gameManager.toggle();
    updatePauseButtonIcon();
});

skipButton.addEventListener("click", (evt) => {
    gameManager.next();
});

fastfowardButton.addEventListener("click", (evt) => {
    gameManager.skip();
});

speedSlider.addEventListener("input", (evt) => {
    gameManager.setDelayMajor(parseInt(speedSlider.value));
});

document.addEventListener("keydown", (evt) => {
    if (evt.key === ' ') {
        gameManager.toggle();
    }
    updatePauseButtonIcon();
})