import { Aigis } from "./entities/fighter/Aigis.js";
import { Kanji } from "./entities/fighter/Kanji.js";
import { Stage } from "./entities/Stage.js";

const GameViewPort = {
    WIDTH: 1600,
    HEIGHT: 900
}

window.onload = function() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    canvas.width = GameViewPort.WIDTH;
    canvas.height = GameViewPort.HEIGHT;

    const aigis = new Aigis(300, 400, 3);
    const kanji = new Kanji(1100, 400, -3);
    const stage = new Stage();

    function frame() {
        aigis.update(context);
        kanji.update(context);

        stage.draw(context);
        aigis.draw(context);
        kanji.draw(context);

        window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
}