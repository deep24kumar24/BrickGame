import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import Bricks from "./Bricks.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const brick = new Bricks(document.getElementById("bricks"))
const gameOver = document.getElementById("game-over")
const playerScore = document.getElementById("player-score")

let lastTime;

let bricks = [];

function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, playerPaddle , bricks)

        if(isLoose()) {
            gameOver.classList.remove("hidden")
            document.documentElement.classList.add("game-over")
            return;
        }

        if(isHitBrick()) {
            
        }
    }

    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLoose() {
    const ballRect = ball.rect()
    return ballRect.bottom >= window.innerHeight
}

function isHitBrick() {
    let numberOfBricksRemaining = 0;
    let numberOfRowsRemaining = 0;

    bricks.forEach((brickRow , rowIndex) => {

        if(brickRow.length == 0) {
            bricks.splice(rowIndex, 1);
        }
        numberOfRowsRemaining += 1;

        brickRow.forEach((brick, brickIndex) => {
            if(ball.isCollision(brick, ball.rect())) {
                ball.direction.y *= -1

                bricks[rowIndex].splice(brickIndex, 1);
    
                setInterval(function() {
                    brick.remove();
                }, 100)

                playerScore.textContent = parseInt(playerScore.textContent) + 1

                numberOfBricksRemaining -=1;
            } 
            numberOfBricksRemaining += 1;
        })
    })

    if(numberOfBricksRemaining < 30 || numberOfRowsRemaining < 6) {    
        bricks.push(brick.generateNewRow(bricks));
    }
}

//ByDefault Brick
bricks.push(brick.generateNewRow(bricks));
// bricks = bricks.concat(brick.generateNewRow());
// bricks = bricks.concat(brick.generateNewRow());
// bricks = bricks.concat(brick.generateNewRow());

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.x / window.innerWidth) * 100
})
window.requestAnimationFrame(update)