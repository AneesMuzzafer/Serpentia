import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

import { Snake } from "./snake/snake";
import { Input } from "./input/Input";
import { Rat } from "./rat/rat";
import { CollisionDetection } from "./collision/collision";

export class GameRenderer {
    constructor(canvas) {
        this.Initialize(canvas);
    }

    Initialize(canvas) {
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        })
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);

        window.addEventListener('resize', () => {
            this.onWindowResize();
        }, false);


        this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
        this.camera.position.set(0, 25, 0);
        this.scene = new THREE.Scene();

        this.clock = new THREE.Clock(true)


        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();

        // this.controls = new FirstPersonControls(this.camera, this.renderer.domElement)
        // this.controls.lookSpeed = 0.1
        // this.controls.movementSpeed = 100
//

        const dirLight = new THREE.DirectionalLight(0xffffe0, 0.4);
        dirLight.position.set(20, 100, 10);
        dirLight.target.position.set(0, 0, 0);
        dirLight.castShadow = true;
        dirLight.shadow.bias = -0.001;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 500.0;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 500.0;
        dirLight.shadow.camera.left = 100;
        dirLight.shadow.camera.right = -100;
        dirLight.shadow.camera.top = 100;
        dirLight.shadow.camera.bottom = -100;
        this.scene.add(dirLight);

        const dirlightHelper = new THREE.DirectionalLightHelper(dirLight);
        this.scene.add(dirlightHelper);

        const pointLight1 = new THREE.PointLight(0xfef000, 50, 100, 1);
        pointLight1.position.set(90, 20, 60)
        pointLight1.castShadow = true;
        const pointLighthelper1 = new THREE.PointLightHelper(pointLight1);
        this.scene.add(pointLight1, pointLighthelper1);

        const pointLight2 = new THREE.PointLight(0x0000ff, 50, 100, 1);
        pointLight2.position.set(-90, 20, 60)
        pointLight2.castShadow = true;
        const pointLighthelper2 = new THREE.PointLightHelper(pointLight2);
        this.scene.add(pointLight2, pointLighthelper2);

        const pointLight3 = new THREE.PointLight(0x00ff00, 50, 100, 1);
        pointLight3.position.set(90, 20, -60)
        pointLight3.castShadow = true;
        const pointLighthelper3 = new THREE.PointLightHelper(pointLight3);
        this.scene.add(pointLight3, pointLighthelper3);

        const pointLight4 = new THREE.PointLight(0xff0000, 50, 100, 1);
        pointLight4.position.set(-90, 20, -60)
        pointLight4.castShadow = true;
        const pointLighthelper4 = new THREE.PointLightHelper(pointLight1);
        this.scene.add(pointLight4, pointLighthelper4);

        const ambLight = new THREE.AmbientLight(0xffffe0);
        // this.scene.add(ambLight);

        // const plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(100, 100, 10, 10),
        //     new THREE.MeshStandardMaterial({
        //         color: 0xFFFF00,sdss
        //     }));
        // plane.castShadow = true;
        // plane.receiveShadow = true;
        // plane.rotation.x = -Math.PI / 2;
        // this.scene.add(plane);

        this.runLoop();

        this.snake = new Snake(this.scene, new Input());
        this.rat = new Rat(this.scene, new Input());
        this.collisionDetection = new CollisionDetection(this.snake, this.rat);


        console.log(this.rat);

        this.renderer.render(this.scene, this.camera)

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            "/src/engine/snake/assets/textures/right.png",
            "/src/engine/snake/assets/textures/left.png",
            "/src/engine/snake/assets/textures/top.png",
            "/src/engine/snake/assets/textures/bottom.png",
            "/src/engine/snake/assets/textures/front.png",
            "/src/engine/snake/assets/textures/back.png",
        ]);

        texture.rotation = Math.PI;
        console.log(texture);
        this.scene.background = texture;

        this.shouldPlay = true;
    }

    runLoop() {
        requestAnimationFrame((time) => {
            if (!this.previousTime) {
                this.previousTime = time;
            }
            if (time - this.previousTime > 1000 / 60) {
                this.snake.update();
                this.rat.update();
                this.collisionDetection.detect();
                if(this.collisionDetection.isRatSnakeColliding) {
                    this.rat.respawn();
                    this.snake.increaseBodyLength();
                }
                if(this.collisionDetection.isSnakeSnakeColliding) {
                   this.shouldPlay = false;
                }
                this.previousTime = time;
            }
            // this.controls.update(this.clock.getDelta())

            // console.log(this.snake);
            // if (this.snake.head && this.snake.snake.length > 1) {
            //     this.camera.position.set(this.snake.head.position.x, this.snake.head.position.y + 50, this.snake.head.position.z + 30)
            //     this.camera.lookAt(this.snake.head.position.x, this.snake.head.position.y, this.snake.head.position.z);
            // }
            // console.log(this.snake);\


            // if (this.snake.head && this.snake.snake.length > 1) {
            //     console.log(this.snake.snake[20], "xx");
            //     this.camera.position.set(this.snake.snake[20].position.x, this.snake.snake[20].position.y + 15, this.snake.snake[20].position.z)
            //     this.camera.lookAt(this.snake.head.position.x, this.snake.head.position.y, this.snake.head.position.z);
            // }

            // if (this.rat.rat) {
            //     this.camera.position.set(this.rat.rat.position.x, this.rat.rat.position.y + 15, this.rat.rat.position.z + 10)
            //     this.camera.lookAt(this.rat.rat.position.x, this.rat.rat.position.y, this.rat.rat.position.z);
            // }


            this.renderer.render(this.scene, this.camera);
            this.shouldPlay && this.runLoop();
        });
    }


    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjsectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
