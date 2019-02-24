window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var unit = 10;
    var xCells = canvas.width / unit;
    var yCells = canvas.height / unit;
    var snake = [{
        x: xCells / 2,
        y: yCells / 2,
    }];
    var apple = {
        x: Math.floor(Math.random() * xCells),
        y: Math.floor(Math.random() * yCells)
    };
    var direction = "R";
    var scoreboard = document.getElementById("score");

    document.addEventListener("keydown", function(e) {
        var dir = e.keyCode;
        if(dir === 37 && direction != "R") {
            direction = "L";
        } else if(dir === 38 && direction != "D") {
            direction = "U";
        } else if(dir === 39 && direction != "L") {
            direction = "R";
        } else if(dir === 40 && direction != "U") {
            direction = "D";
        }
    });

    function moveSnake() {
        if(direction === "L") {
            snake.unshift({
                x: snake[0].x - 1,
                y: snake[0].y
            });
        } else if(direction === "U") {
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y - 1
            });
        } else if(direction === "R") {
            snake.unshift({
                x: snake[0].x + 1,
                y: snake[0].y
            });
        } else if(direction === "D") {
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y + 1
            });
        }
    }

    function checkCollision() {
        // collision with apple
        if(snake[0].x === apple.x && snake[0].y === apple.y) {
            apple = {
                x: Math.floor(Math.random() * xCells),
                y: Math.floor(Math.random() * yCells)
            };
            return true;
        }

        if(snake[0].x >= xCells || snake[0].x < 0 || snake[0].y >= yCells || snake[0].y < 0) {
            clearInterval(loop);
            console.log(snake);
            setInterval(function() {
                ctx.fillStyle = "#f00";
                ctx.fillRect(snake[1].x * unit, snake[1].y * unit, unit, unit);
                setTimeout(function() {
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(snake[1].x * unit, snake[1].y * unit, unit, unit);
                }, 200);
            }, 300);
            return true;
        }

        for(var i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                clearInterval(loop);
                console.log(snake);
                setInterval(function() {
                    ctx.fillStyle = "#f00";
                    ctx.fillRect(snake[1].x * unit, snake[1].y * unit, unit, unit);
                    setTimeout(function() {
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(snake[1].x * unit, snake[1].y * unit, unit, unit);
                    }, 200);
                }, 300);
                return true;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw apple
        ctx.fillStyle = "#f00";
        ctx.fillRect(apple.x * unit, apple.y * unit, unit, unit);
        // draw snake
        ctx.fillStyle = "#fff";
        for(i in snake) {
            ctx.fillRect(snake[i].x * unit, snake[i].y * unit, unit, unit);
        }
        moveSnake();
        if(!checkCollision()) {
            snake.pop();
            scoreboard.value = snake.length - 1;
        };
    }

    var loop = setInterval(draw, 50);
};
