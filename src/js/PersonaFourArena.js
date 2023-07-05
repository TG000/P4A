import { Aigis } from "./entities/fighters/Aigis.js";
import { Kanji } from "./entities/fighters/Kanji.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";
import { registerKeyboardEvents } from "./InputHandler.js";
import { Shadow } from "./entities/fighters/Shadow.js";

export class PersonaFourArena {
    constructor() {
        this.context = this.getContext();
        this.fighters = [
            new Aigis(450, STAGE_FLOOR, FighterDirection.LEFT, 0),
            new Kanji(1200, STAGE_FLOOR, FighterDirection.RIGHT, 1),
        ];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.entities = [
            new Stage(),
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
            new FpsCounter()
        ];
    
        this.frameTime = {
            previous: 0,
            secondsPassed: 0
        }
    }

    getContext() {
        const mainCanvas = document.querySelector('canvas');
        const context = mainCanvas.getContext('2d');
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        return context;
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.context);
        }
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw(this.context);
        }
    }

    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time
        }

        this.update();
        this.draw();
    }

    start() {
        registerKeyboardEvents();

        window.requestAnimationFrame(this.frame.bind(this));
    }
}