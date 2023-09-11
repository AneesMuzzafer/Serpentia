import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Rat {
    constructor(scene, input) {

        this.input = input;
        // this.snakeBodyLoaded = false;

        const gltfLoader = new GLTFLoader();

        gltfLoader.load("src/engine/rat/assets/rat_body.gltf", (gltf) => {
            this.rat = gltf.scene;
            this.rat.position.set(0, 3, -10);
            this.rat.castShadow = true;
            scene.add(this.rat);

            // console.log(this.getQuartanionFromDirection())
            // this.head.quaternion.rotateTowards(this.getQuartanionFromDirection(), 10 * Math.PI);
        });

        this.boundingBox = {
            left: 0 - 1,
            right: 0 + 1,
            up: -10 - 1,
            down: -10 + 1,
        }

        this.velocity = 0.5;
    }

    update() {
        // this.velocity += 0.01;
        if (this.rat) {
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
                    this.rat.position.z -= this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "left":
                    this.rat.position.x -= this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI)
                    break;
                case "down":
                    this.rat.position.z += this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "right":
                    this.rat.position.x += this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "up-right":
                    this.rat.position.z -= this.velocity;
                    this.rat.position.x += this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "up-left":
                    this.rat.position.z -= this.velocity;
                    this.rat.position.x -= this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "down-right":
                    this.rat.position.z += this.velocity;
                    this.rat.position.x += this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
                case "down-left":
                    this.rat.position.z += this.velocity;
                    this.rat.position.x -= this.velocity;
                    this.rat.quaternion.rotateTowards(this.getQuartanionFromDirection(this.input.direction), 10 * Math.PI);
                    break;
            }

            this.boundingBox = {
                left: this.rat.position.x - 1,
                right: this.rat.position.x + 1,
                up: this.rat.position.z - 1,
                down: this.rat.position.z + 1,
            }
        }
    }

    respawn() {
        const xPosition = Math.floor(Math.random() * 10);
        const zPosition = Math.floor(Math.random() * 5);
        this.rat.position.set(xPosition, 3, zPosition);
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
