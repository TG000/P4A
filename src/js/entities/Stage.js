export class Stage {
    constructor() {
        this.image = document.createElement('img');
        this.image.src = "assets/Backgrounds/bg131_01.png";
    }

    update() {
        
    }

    draw(context) {
        context.drawImage(this.image, 0, 0);
    }
}
