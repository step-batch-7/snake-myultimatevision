const drawFood = function (food) {
  const [foodX, foodY] = food.position;
  const cell = getCell(foodX, foodY);
  cell.classList.add("food");
}

const drawSnake = function (snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const erasePreviousFood = function (food) {
  const [foodX, foodY] = food.previousFood;
  const cell = getCell(foodX, foodY);
  cell.classList.remove('food');
}

const eraseTail = function (snake) {
  let [colId, rowId] = snake.tail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const DrawSnakesAndFood = function ({ snake, food, ghostSnake }) {
  drawSnake(snake);
  drawFood(food);
  drawSnake(ghostSnake);
};

const displayGameOver = function () {
  const grid = getGrid();
  clearInterval(interval1);
  clearInterval(interval2);
  document.body.removeChild(grid);
  const gameOver = document.createElement('h1');
  gameOver.innerText = "game Over";
  gameOver.classList.add('gameOver');
  document.body.appendChild(gameOver);
}
const updateAndDrawGame = function (game) {
  const { snake, food, ghostSnake } = game.getStatus();
  if (game.isGameOver()) {
    displayGameOver();
    return;
  }
  game.moveSnakes();
  erasePreviousFood(food);
  eraseTail(snake);
  eraseTail(ghostSnake);
  DrawSnakesAndFood({ snake, food, ghostSnake });
}