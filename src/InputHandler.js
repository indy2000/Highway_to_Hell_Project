import { Control, controls } from "./constants/control.js";

const heldKeys = new Set();

function handleKeyDown(event) {
    event.preventDefault();
    heldKeys.add(event.code);
}

function handleKeyUp(event) {
    event.preventDefault();
    heldKeys.delete(event.code);
}

export function registerKeyboardEvents(){
    window.addEventListener('keydown', (handleKeyDown));

    window.addEventListener('keyup', (handleKeyUp));
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);
export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);
export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);
export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);