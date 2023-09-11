export class Input {
    constructor() {
        this._init();
    }

    _init() {
        this.mouseX = 0;
        this.mouseY = 0;

        this.keysPressed = {
            w: false,
            a: false,
            s: false,
            d: false,
        }

        this.isMoving = false;
        this.direction = "left";

        this.isChangingDirection = false;

        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                    this.keysPressed.w = true;
                    if (this.direction !== "down") {
                        if (this.keysPressed.a) {
                            this.direction = "up-left";
                        } else if (this.keysPressed.d) {
                            this.direction = "up-right";
                        } else {
                            this.direction = "up";
                        }
                        this.isChangingDirection = true;
                    }
                    break;
                case "KeyA":
                    this.keysPressed.a = true;
                    if (this.direction !== "right") {
                        if (this.keysPressed.w) {
                            this.direction = "up-left";
                        } else if (this.keysPressed.s) {
                            this.direction = "down-left";
                        } else {
                            this.direction = "left";
                        }
                    }
                    this.isChangingDirection = true;
                    break;
                case "KeyS":
                    this.keysPressed.s = true;
                    if (this.direction !== "up") {
                        if (this.keysPressed.a) {
                            this.direction = "down-left";
                        } else if (this.keysPressed.d) {
                            this.direction = "down-right";
                        } else {
                            this.direction = "down";
                        }
                    }
                    this.isChangingDirection = true;
                    break;
                case "KeyD":
                    this.keysPressed.d = true;
                    if (this.direction !== "left") {
                        if (this.keysPressed.w) {
                            this.direction = "up-right";
                        } else if (this.keysPressed.s) {
                            this.direction = "down-right";
                        } else {
                            this.direction = "right";
                        }
                    }
                    this.isChangingDirection = true;
                    break;
            }
            this.isMoving = true;
        });

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyW":
                    this.keysPressed.w = false;
                    break;
                case "KeyA":
                    this.keysPressed.a = false;
                    break;
                case "KeyS":
                    this.keysPressed.s = false;
                    break;
                case "KeyD":
                    this.keysPressed.d = false;
                    break;
            }
            this.isMoving = false;
        });

        window.addEventListener("mousemove", (e) => {
            this.mouseX = (e.clientX / innerWidth) * 2 - 1;
            this.mouseY = (e.clientY / innerHeight) * 2 - 1;
        })
    }
}
