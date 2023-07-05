import { Fighter } from "./Fighter.js";

export class Kanji extends Fighter {
    constructor(x, y, velocity) {
        super("Kanji", x, y, velocity);

        this.image = document.querySelector('img[alt="kanji"]');
    }
}