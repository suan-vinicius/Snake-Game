let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d"); 
let box = 32;
let snake = [];
var apple_to = 0;

snake[0] = {
    x: 2 * box,
    y: 2 * box
}

let direction = 'right';

let food ={
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

function createBG() {
    let img = new Image();
    img.src = 'img/background.png';
    context.drawImage(img, 0, 0, 16 * box, 16 * box);
}

function createHead(imgDirection) {
    let img = new Image();
    img.src = `img/${imgDirection}.png`;
    context.drawImage(img, snake[0].x, snake[0].y, box, box);
}

function createBody() {
    for (i = 1; i < snake.length-1; i++) {
        context.fillStyle = 'rgb(0, 162, 232)';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createTail(imgDirection) {
    let img = new Image();
    img.src = `img/${imgDirection}.png`;
    context.drawImage(img, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
}

function setHead(direction) {
    if(direction == 'left')  createHead('left');
    if(direction == 'right')  createHead('right');
    if(direction == 'down')  createHead('down');
    if(direction == 'up')  createHead('up');
}

function setTail() {
    if (snake.length > 1) {
        if(snake[snake.length-2].x > snake[snake.length-1].x) createTail('rightE');
        if(snake[snake.length-2].x < snake[snake.length-1].x) createTail('leftE');
        if(snake[snake.length-2].y > snake[snake.length-1].y) createTail('downE');
        if(snake[snake.length-2].y < snake[snake.length-1].y) createTail('upE');
    }
}

function drawFood () {
    let img = new Image();
    img.src = `img/apple.png`;
    context.drawImage(img, food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame() {    

    if(snake[0].x > 15*box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 16 * box;
    if(snake[0].y > 15*box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            document.getElementById('alert').style.display = 'flex';
        }
    }
    
    createBG();
    setHead(direction);
    createBody();
    setTail();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }else{
        food.x = Math.floor(Math.random() * 15) * box;
        food.y = Math.floor(Math.random() * 15) * box;
        apple_to ++ ;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    document.getElementsByClassName('apple__total')[0].innerHTML = `<p>${apple_to}</p>`;

    snake.unshift(newHead);
}

function restart() {

    snake = [];
    snake[0] = {
        x: 2 * box,
        y: 2 * box
    }

    apple_to = 0;

    document.getElementById('alert').style.display = 'none';

    return jogo = setInterval(startGame, 150)
}

function homeScreen() {
    createBG();
    setHead(direction);
    createBody();
    setTail();
    drawFood();
}

let toggle = setInterval(homeScreen, 10)

let jogo;

document.getElementById('play').addEventListener('click', () => {
    
    jogo = setInterval(startGame, 150);
    document.getElementById('play').setAttribute('disabled', 'disabled');
    toggle = '';
})