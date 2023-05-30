import { runGame } from "./script.js";
/** 
 * Module which handles the central process of running the game loop and dispatching events
 * The other modules will then get the events and will be able to update their state depending on the current game state
 * This makes it easier to expand the entirety of the game and make it less complex and easier to maintain
 * The reason this isn't a class is because we one need on gameManager per page and this makes it more like a singleton pattern which makes it less complex to access
 */

let state = {};
let running = false;

function sendStateEvent() {
    document.dispatchEvent(new CustomEvent("GameManager", { detail: state }))
}

function sendInitEvent() {
    document.dispatchEvent(new CustomEvent("Init", { detail: state }))
}

function setMajorSafe(major) {
    if (major < 0 || major >= state.gameState.length) return;
    state.finished = false;
    if (major === state.gameState.length - 1) { state.finished = true; }
    state.currentMajor = major;
}

// Exported functions which the other modules will be able to access and change the state of the game
// The new game state will then be dispatched as an event
export default {
    init(cardStacks) {
        const [gameState, gameResult] = runGame(cardStacks);
        state = {
            pause: false,
            finished: false,
            delayMajor: 1000,
            currentMajor: 0,
            gameState: gameState,
            gameResult: gameResult
        };
        sendInitEvent();
    },

    async run() {
        if (running) return;
        running = true;
        sendStateEvent();
        for (;;) {
            await new Promise(r => setTimeout(r, state.delayMajor));
            if (!state.finished && !state.pause) {
                this.next();
            }
        }
    },

    pause() {
        state.pause = true;
        sendStateEvent();
    },

    resume() {
        state.pause = false;
        sendStateEvent();
    },

    toggle() {
        if (state.pause)
            this.resume();
        else
            this.pause();
    },

    skip() {
        setMajorSafe(state.gameState.length - 1);
        sendStateEvent();
    },

    next() {
        setMajorSafe(state.currentMajor + 1);
        sendStateEvent();
    },

    prev() {
        setMajorSafe(state.currentMajor - 1);
        sendStateEvent();
    },

    setMajor(major) {
        setMajorSafe(major);
        sendStateEvent();
    },

    setDelayMajor(delayMajor) {
        state.delayMajor = delayMajor
    },
    
    isPaused() {
        return state.pause;
    }
}