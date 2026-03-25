export class Dancer {
    constructor(reference, size) {
        this.htmlRef = reference;
        this.size = size;
        this.draw("sleeping")
    }
    draw(state) {

        this.htmlRef.width = this.size;
        if (state === "sleeping") {
            this.htmlRef.src = "./media/animations/perro-sleeping.gif";
        } else if (state === "awake") {
            this.htmlRef.src = "./media/animations/perro-awake.gif";
        }
    }
    update(soundPlaying) {
        this.draw(soundPlaying);
    }
}