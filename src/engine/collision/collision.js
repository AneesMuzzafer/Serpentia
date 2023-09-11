import * as THREE from "three";

export class CollisionDetection {
    constructor(snake, rat) {
        this.snake = snake;
        this.rat = rat;
        this.isRatSnakeColliding = false;
        this.isSnakeSnakeColliding = false;
    }

    detect() {
        if (this.rat.rat && this.snake.head) {
            const rat = new THREE.Box3().setFromObject(this.rat.rat, true);
            const snakeHead = new THREE.Box3().setFromObject(this.snake.head, true);

            this.isRatSnakeColliding = snakeHead.intersectsBox(rat) ? true : false;

            for (let i = this.snake.snake.length - 1; i > 15; i--) {
                const body = new THREE.Box3().setFromObject(this.snake.snake[i], true);
                if(snakeHead.intersectsBox(body)) {
                    this.isSnakeSnakeColliding = true;
                    break;
                } else {
                    this.isSnakeSnakeColliding = false;
                }
            }
        }
    }
}
