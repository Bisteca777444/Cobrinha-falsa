const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let direction = "";
let score = 0;

document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
  else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00FF00" : "#ADFF2F";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "gold";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score += 0.25;
    document.getElementById("saldo").innerText = score.toFixed(2).replace('.', ',');
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // Game over
  if (
    snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400 ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Parabéns! Você ganhou R$ " + score.toFixed(2).replace('.', ',') + "!\nSaque disponível no app.");
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

let game = setInterval(draw, 150);
