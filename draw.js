const drawFood = function (food) {
  const [foodX, foodY] = food.position;
  const cell = getCell(foodX, foodY);
  cell.classList.add(food.type);
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
  cell.classList.remove(food.type);
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

const drawScoreCard = function (scoreCard) {
  const score = document.getElementById('scoreCard');
  score.innerText = `score : ${scoreCard.score}`;
}

const clearGrid = function () {
  const grid = getGrid();
  document.body.removeChild(grid);
}

const clearIntervals = function () {
  clearInterval(interval1);
  clearInterval(interval2);
}

const displayGameOver = function () {
  const gameOver = document.createElement('h1');
  gameOver.innerText = "game Over";
  gameOver.classList.add('gameOver');
  document.body.appendChild(gameOver);
}

const endGame = function () {
  clearIntervals();
  clearGrid();
  displayGameOver();
}

drawGame = function (game) {
  const { snake, ghostSnake, scoreCard, food } = game.getStatus();
  erasePreviousFood(food);
  eraseTail(snake);
  eraseTail(ghostSnake);
  DrawSnakesAndFood({ snake, food, ghostSnake });
  drawScoreCard(scoreCard);
}

const updateAndDrawGame = function (game) {
  const { snake } = game.getStatus();
  game.moveSnakes();
  if (game.isOver()) {
    endGame();
    return;
  }
  if (game.doesGhostSnakeHitTheWall()) {
    game.turnGhostSnakeLeft();
  }
  if (game.doesGhostSnakeEatSnake()) {
    eraseTail(snake);
    game.updateSnakes();
  }
  drawGame(game);
}