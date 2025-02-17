class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        let newRect;

        if (this.rotateX === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y,
            };
        } else if (this.rotateX === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y,
            };
        } else if (this.rotateY === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size,
            };
        } else if (this.rotateY === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size,
            };
        }

        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Apple {
    constructor() {
        console.log("apple");
        console.log(snake.size);
        let isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
            this.y = Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
                    isTouching = true;
                }
            }
            console.log(this.x, this.y);
            this.size = snake.size;
            this.color = "red";
            if (!isTouching) {
                break;
            }
        }
    }
}

var canvas = document.getElementById("canvas");

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext("2d");

window.onload = () => {
    gameLoop();
};

function gameLoop() {
    setInterval(show, 1000 / 15); // 여기서 30은 FPS 값입니다
}

function show() {
    update();
    draw();
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    console.log("update");
    snake.move();
    eatApple();
    checkHitWall();
}

function checkHitWall() {
    const headTail = snake.tail[snake.tail.length - 1];
    if (headTail.x === -snake.size) {
        headTail.x = canvas.width - snake.size;
    } else if (headTail.x === canvas.width) {
        headTail.x = 0;
    } else if (headTail.y === -snake.size) {
        headTail.y = canvas.height - snake.size;
    } else if (headTail.y >= canvas.height) {
        headTail.y = 0;
    }
}

function eatApple() {
    if (
        snake.tail[snake.tail.length - 1].x === apple.x &&
        snake.tail[snake.tail.length - 1].y === apple.y
    ) {
        snake.tail.push({ x: apple.x, y: apple.y });
        apple = new Apple();
    }
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height); // 배경 색상 추가
    for (let i = 0; i < snake.tail.length; i++) {
        createRect(
            snake.tail[i].x + 2.5,
            snake.tail[i].y + 2.5,
            snake.size - 5,
            snake.size - 5,
            "white"
        );
    }
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00ff42";
    canvasContext.fillText(
        "점수: " + (snake.tail.length - 1),
        canvas.width - 120,
        18
    );
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode === 37 && snake.rotateX !== 1) {
            snake.rotateX = -1;
            snake.rotateY = 0;
        } else if (event.keyCode === 38 && snake.rotateY !== 1) {
            snake.rotateX = 0;
            snake.rotateY = -1;
        } else if (event.keyCode === 39 && snake.rotateX !== -1) {
            snake.rotateX = 1;
            snake.rotateY = 0;
        } else if (event.keyCode === 40 && snake.rotateY !== -1) {
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1);
});
const pkg = require('pkg');

pkg.exec(['snake.js','--output','SnakeGame.exe'],(err,result)=>{
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(result);
});