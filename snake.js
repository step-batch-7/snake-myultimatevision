const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;
const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';



class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }



  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  get tail() {
    return this.previousTail;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    const [deltaX, deltaY] = this.direction.delta;
    this.previousTail = this.positions.shift();
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  addPart() {
    this.positions.unshift(this.tail);
  }
}

class Food {
  constructor(colId, rowId, previousFood) {
    this.colId = colId;
    this.rowId = rowId;
    this.previousFood = previousFood
  }

  get position() {
    return [this.colId, this.rowId];
  }

  generateNew() {
    this.previousFood = [this.colId, this.rowId];
    this.colId = Math.round(Math.random() * (NUM_OF_COLS - 1));
    this.rowId = Math.round(Math.random() * (NUM_OF_ROWS - 1));
  }
}

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
  game.turnLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

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

const eraseTail = function (snake) {
  let [colId, rowId] = snake.tail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const isFoodEatenBySnake = function (snake, food) {
  return snake.location.some(part =>
    part.every((coordinate, i) => coordinate == food.position[i]));
}


class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  getStatus() {
    const snake = {
      location: this.snake.location,
      species: this.snake.species,
      tail: this.snake.tail
    }

    const food = {
      position: this.food.position,
      previousFood: this.food.previousFood
    }

    const ghostSnake = {
      location: this.ghostSnake.location,
      species: this.ghostSnake.species,
      tail: this.ghostSnake.tail
    }
    return { snake, food, ghostSnake };
  }

  turnLeft() {
    this.snake.turnLeft();
  }


  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.snake, this.food)) {
      this.food.generateNew();
      this.snake.addPart();
    }
  }

}

const erasePreviousFood = function (food) {
  const [foodX, foodY] = food.previousFood;
  const cell = getCell(foodX, foodY);
  cell.classList.remove('food');
}

const DrawSnakesAndFood = function ({ snake, food, ghostSnake }) {
  drawSnake(snake);
  drawFood(food);
  drawSnake(ghostSnake);
};

const updateAndDrawGame = function (game) {
  const { snake, food, ghostSnake } = game.getStatus();
  game.moveSnakes();
  erasePreviousFood(food);
  eraseTail(snake);
  eraseTail(ghostSnake);
  DrawSnakesAndFood(game.getStatus());
}


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
  const food = new Food(15, 15, [0, 0]);
  const game = new Game(snake, ghostSnake, food);

  setUpGame(game);

  setInterval(updateAndDrawGame, 200, game);
  setInterval(randomlyTurnSnake, 600, ghostSnake);
};
