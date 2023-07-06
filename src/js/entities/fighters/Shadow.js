import { STAGE_FLOOR } from "../../constants/stage.js";

export class Shadow {
    constructor(fighter) {
        this.image = document.createElement('img');
        this.image.src = "assets/Player/shadow.png";
        this.fighter = fighter;
        this.frame = [[0, 0, 528, 64], [264, 70]];
    }

    update() {

    }

    draw(context) {
        const [
            [x, y, width, height],
            [originX, originY]
        ] = this.frame;

        const scale = 0.55 - (STAGE_FLOOR - this.fighter.position.y) / 550;

        context.globalAlpha = 0.4;
        context.drawImage(
            this.image,
            x, y,
            width, height,
            this.fighter.position.x - originX * scale,
            STAGE_FLOOR - originY * scale,
            width * scale, height * scale * 1.75
        );
        context.globalAlpha = 1;
    }
}
