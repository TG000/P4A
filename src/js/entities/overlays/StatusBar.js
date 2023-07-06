export class StatusBar {
    constructor(fighters) {
        this.image = document.createElement('img');
        this.image.src = "";

        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters;

        this.frames = new Map([

        ]);
    }

    drawFrame(context, frameKey, direction = 1) {
        
    }

    update(time) {

    }

    draw(context) {
        
    }
}