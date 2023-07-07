export class StatusBar {
    constructor(fighters) {
        this.time = 60;
        this.timeTimer = 0;
        this.fighters = fighters;

        this.healthbar = new Image();
        this.healthbar.src = "assets/HUD/healthbar.png";

        this.clock = new Image();
        this.clock.src = "assets/HUD/clock.png";

        this.timeImg = [];
        for (var i = 0; i < 10; i++) {
            this.timeImg[i] = new Image();
            this.timeImg[i].src = "assets/HUD/text-" + i + ".png";
        }

        this.nametags = [];
        for (var i = 0; i < 2; i++) {
            this.nametags[i] = new Image();
        }

        this.nametags[0].src = "assets/Player/Aigis/VSAigis/name_ag_eng_2p1.png";
        this.nametags[1].src = "assets/Player/Kanji/VSKanji/name_ka_eng_1p1.png";

        this.frames = new Map([
            // Health
            ['health-bar', this.healthbar],

            // Clock
            ['clock', this.clock],

            // Time
            ['time-0', this.timeImg[0]],
            ['time-1', this.timeImg[1]],
            ['time-2', this.timeImg[2]],
            ['time-3', this.timeImg[3]],
            ['time-4', this.timeImg[4]],
            ['time-5', this.timeImg[5]],
            ['time-6', this.timeImg[6]],
            ['time-7', this.timeImg[7]],
            ['time-8', this.timeImg[8]],
            ['time-9', this.timeImg[9]],

            // Name tags
            ['tag-aigis', this.nametags[0]],
            ['tag-kanji', this.nametags[1]]
        ]);
    }

    drawFrame(context, frameKey, x, y, direction = 1) {
        const src = this.frames.get(frameKey);

        context.scale(direction, 1);
        context.drawImage(src, x * direction, y);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    updateTime(time) {
        if (time.previous > this.timeTimer + 1000) {
            if (this.time > 0) {
                this.time -= 1;
            }
            this.timeTimer = time.previous;
        }
    }

    update(time) {
        this.updateTime(time);
    }

    drawHealthBar(context) {
        this.drawFrame(context, 'clock', 715, 20);
        this.drawFrame(context, 'health-bar', 10, -25);
        this.drawFrame(context, 'health-bar', 1590, -25, -1);
    }

    drawNameTags(context) {
        const [{ name: name1 }, { name: name2 }] = this.fighters;
    
        this.drawFrame(context, `tag-${name1.toLowerCase()}`, 20, 130);
        this.drawFrame(context, `tag-${name2.toLowerCase()}`, 1213, 130);
    }

    drawTime(context) {
        const timeString = String(this.time).padStart(2, '00');
    
        this.drawFrame(context, `time-${timeString[0]}`, 758, 73);
        this.drawFrame(context, `time-${timeString[1]}`, 805, 73);
    }

    draw(context) {
        this.drawHealthBar(context);
        this.drawTime(context);
        this.drawNameTags(context);
    }
}