import { Fighter } from "./Fighter.js";

export class Aigis extends Fighter {
    constructor(x, y, velocity) {
        super("Aigis", x, y, velocity);

        this.image = document.querySelector('img[alt="aigis"]');
    }
}