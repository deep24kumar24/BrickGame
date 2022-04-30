export default class Brick {
    constructor(width, left) {
        this.brickElement = document.createElement("div");
        this.brickElement.classList.add('brick');
        this.brickElement.style.width = width + 'vw';
        this.brickElement.style.left = left + 'vw';
        this.brickElement.style.top = '0vh';


        var hue = Math.floor(randomNumberBetween(0,350));
        var saturation = Math.floor(randomNumberBetween(60,100));
        var lightness = Math.floor(randomNumberBetween(30,50));
        this.brickElement.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    rect() {
        return this.brickElement.getBoundingClientRect()
    }

    remove() {
        this.brickElement.remove();
    }

}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}
