const INITIAL_VELOCITY = 0.05
const VELOCITY_INCREASE = 0.000002

export default class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"))
    }

    set x(value) {
        this.ballElement.style.setProperty("--x", value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"))
    }

    set y(value) {
        this.ballElement.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElement.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }

        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY
        this.xdelta = 0
    }

    update(delta, paddle, bricks) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta

        this.velocity += VELOCITY_INCREASE * delta

        const rect = this.rect()

        // Bounce Left, Right 
        if(rect.right > window.innerWidth || rect.left <0) {
            this.direction.x *= -1
        }

        // Bounce Top
        if(rect.top < 0) {
            this.direction.y *= -1
        }

        // Paddle Collision
        if(this.isCollision(paddle, rect)) {
            this.direction.y *= -1
        }

    }

    isCollision(element, ballRect) {
        return (
            element.rect().left <= ballRect.right && 
            element.rect().right >= ballRect.left && 
            element.rect().top <= ballRect.bottom && 
            element.rect().bottom >= ballRect.top)
    }
    
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}
