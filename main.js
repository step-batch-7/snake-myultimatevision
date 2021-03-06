let interval1, interval2, interval3;

const getGrid = () => document.getElementById(GRID_ID);

const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function (grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function () {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const handleKeyPress = game => {
  const moves = {
    'ArrowLeft': WEST,
    'ArrowRight': EAST,
    'ArrowUp': NORTH,
    'ArrowDown': SOUTH,
  }
  if (event.key == ' ') {
    const runningStatus = (game.runningStatus === 'pause') ? 'resume' : 'pause';
    game.modifyRunningStatus(runningStatus);
  }
  if (game.runningStatus === 'resume') {
    game.turnSnake(moves[event.key]);
  }
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50 && !(snake.nearTheWall())) {
    snake.turnLeft();
  }
};

const setUpGame = function (game) {
  attachEventListeners(game);
  createGrids();
  DrawSnakesAndFood(game.getStatus());
}

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const snakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'ghostSnake');
};

const main = function () {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(15, 15, 'normal');
  const scoreCard = new ScoreCard(0);
  const game = new Game(snake, ghostSnake, food, scoreCard);

  setUpGame(game);

  interval1 = setInterval(updateAndDrawGame, 100, game);
  interval2 = setInterval(randomlyTurnSnake, 400, ghostSnake);
};

