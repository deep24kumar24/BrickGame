const MIN_NUMBER_OF_BRICKS = 2
const MAX_NUMBER_OF_BRICKS = 10

import Brick from "./Brick.js";

export default class Bricks {
    constructor(bricksElement) {
        this.bricksElement = bricksElement
    }

    generateNewRow(previousBricks) {
        const numberOfBricks = Math.floor(randomNumberBetween(MIN_NUMBER_OF_BRICKS,MAX_NUMBER_OF_BRICKS));
        let bricks = []; 
        let leftMargin = 0;

        for (var i = 0; i < numberOfBricks; i++) {
            var width = 100 / numberOfBricks
            var brick = new Brick(width, leftMargin)
            this.bricksElement.appendChild(brick.brickElement);

            leftMargin += width
            bricks.push(brick);
        }

        

        previousBricks.forEach(brickRow => {
            brickRow.forEach(brick => {
                // console.log()
                brick.brickElement.style.top = (parseInt(brick.brickElement.style.top) + 3) + 'vh'; 
            })
        });


        return bricks;
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}
