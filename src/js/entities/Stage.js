export class Stage {
    constructor() {
        this.image = document.createElement('img');
<<<<<<< HEAD
        this.image.src = "assets/Backgrounds/bg131_02.png";
=======
        this.image.src = "../../assets/Backgrounds/bg131_02.png";
>>>>>>> 9c9cb93e4c3491c559735c5aa90b33b5036b8f2d
    }

    update() {
        
    }

    draw(context) {
        context.drawImage(this.image, 0, 0);
    }
}
