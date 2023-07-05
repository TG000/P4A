import { Control, controls } from "./constants/control.js";
import { FighterDirection } from "./constants/fighter.js";

const heldKeys = new Set();

const mappedKeys = controls.map(({ keyboard }) => Object.values(keyboard)).flat();

function handleKeyDown(event) {
    if (!mappedKeys.includes(event.code)) {
        return;
    }

    event.preventDefault();

    heldKeys.add(event.code);
}

function handleKeyUp(event) {
    if (!mappedKeys.includes(event.code)) {
        return;
    }

    event.preventDefault();

    heldKeys.delete(event.code);
}

export function registerKeyboardEvents() {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);
export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);
export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);
export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);

export const isForward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);
export const isBackward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);

export const isIdle = (id) => !isLeft(id) || isRight(id) || isUp(id) || isDown(id);