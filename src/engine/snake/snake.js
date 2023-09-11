import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Snake {
    constructor(scene, input) {

        this.input = input;
        this.snake = [];
        this.snakeBodyLoaded = false;
        this.scene = scene;
        this.headBoundingBox = {
            left: -2,
            right: 2,
            up: -2,
            down: 2,
        }

        const gltfLoader = new GLTFLoader();

        gltfLoader.load("src/engine/snake/assets/head.gltf", (gltf) => {
            this.head = gltf.scene;
            this.head.position.set(0, 3, 0)
            this.head.castShadow = true;
            this.scene.add(this.head);
            this.snake.push(this.head);

            // console.log(this.getQuartanionFromDirection())
            // this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(), 10 * Math.PI);
        });

        gltfLoader.load("src/engine/snake/assets/bodypart.gltf", (gltf) => {
            this.bodyPart = gltf.scene;
            for (let i = 0; i < 20; i++) {
                const bodyClone = this.bodyPart.clone();
                bodyClone.castShadow = true;
                bodyClone.position.set(i, 3, 0);
                this.scene.add(bodyClone);
                this.snake.push(bodyClone)
            }
            this.snakeBodyLoaded = true;

        });

        gltfLoader.load("src/engine/snake/assets/game_ground_white.gltf", (gltf) => {
            const ground = gltf.scene;
            ground.position.set(0, -10, 0)
            ground.castShadow = true;
            scene.add(ground);

        });

        this.velocity = 1;
    }

    update() {
        // this.velocity += 0.01;

        if (this.snakeBodyLoaded && this.head) {
            for (let i = this.snake.length - 1; i > 0; i--) {
                this.snake[i].position.set(this.snake[i - 1].position.x, this.snake[i - 1].position.y, this.snake[i - 1].position.z);
            }
            switch (this.input.direction) {
                case "up":
                    // if (this.input.isChangingDirection) {
                    //     // head.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)), 0.5);
                    //     // head.quaternion.rotateTowards((new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))), Math.PI /8);
                    //     head.quaternion.rotateTowards((new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)), Math.PI / 8);

                    //     head.position.z -= 0.5;

                    //     if (Math.abs((head.rotation.x * 180 / Math.PI) - 90) < 1) {
                    //         this.input.isChangingDirection = false;
                    //     }


                    // } else {
                    //     head.position.z -= velocity;
                    // }
                    this.head.position.z -= this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "left":
                    this.head.position.x -= this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI)
                    break;
                case "down":
                    this.head.position.z += this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "right":
                    this.head.position.x += this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "up-right":
                    this.head.position.z -= this.velocity;
                    this.head.position.x += this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "up-left":
                    this.head.position.z -= this.velocity;
                    this.head.position.x -= this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "down-right":
                    this.head.position.z += this.velocity;
                    this.head.position.x += this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "down-left":
                    this.head.position.z += this.velocity;
                    this.head.position.x -= this.velocity;
                    this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
            }

            this.headBoundingBox = {
                left: this.head.position.x - 2,
                right: this.head.position.x + 2,
                up: this.head.position.z - 2,
                down: this.head.position.z + 2,
            }
        }
    }

    increaseBodyLength(length = 5) {
        const tail = this.snake[this.snake.length -1];
        for (let i = 0; i < length; i++) {
            const bodyClone = this.bodyPart.clone();
            bodyClone.castShadow = true;
            bodyClone.position.set(tail.position.x, 3, tail.position.z);
            this.scene.add(bodyClone);
            this.snake.push(bodyClone)
        }
    }

    getQuartanionFromDirection(direction) {
        let x = 0;
        let y = 0;
        let z = 0;
        switch (direction) {
            case "up":
                x = 0;
                y = -Math.PI / 2;
                z = 0;
                break;
            case "left":
                x = 0;
                y = 0;
                z = 0;
                break;
            case "down":
                x = 0;
                y = Math.PI / 2;
                z = 0;
                break;
            case "right":
                x = 0;
                y = Math.PI;
                z = 0;
                break;
            case "up-right":
                x = 0;
                y = -3 * Math.PI / 4;
                z = 0;
                break;
            case "up-left":
                x = 0;
                y = -Math.PI / 4;
                z = 0;
                break;
            case "down-right":
                x = 0;
                y = 3 * Math.PI / 4;
                z = 0;
                break;
            case "down-left":
                x = 0;
                y = Math.PI / 4;
                z = 0;
                break;
            default:
                x = -1;
                y = -1;
                z = -1;
        }
        return (new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z)));
    }
}
