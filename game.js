class Game {
  #snake;
  #ghostSnake;
  #food;
  #scoreCard;
  #runningStatus;
  constructor(snake, ghostSnake, food, scoreCard) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#scoreCard = scoreCard;
    this.#runningStatus = 'resume';
  }

  getStatus() {
    const snake = {
      location: this.#snake.location,
      species: this.#snake.species,
      tail: this.#snake.tail,
      head: this.#snake.head
    }

    const food = {
      position: this.#food.position,
      type: this.#food.type
    }

    const ghostSnake = {
      location: this.#ghostSnake.location,
      species: this.#ghostSnake.species,
      tail: this.#ghostSnake.tail,
      head: this.#ghostSnake.head
    }

    const scoreCard = { score: this.#scoreCard.score };
    return { snake, food, ghostSnake, scoreCard };
  }

  turnSnake(newDirection) {
    const direction = this.#snake.heading;
    if (newDirection === (direction + 1) % 4) {
      this.#snake.turnLeft();
    }
    if (newDirection === (direction + 3) % 4) {
      this.#snake.turnRight();
    }
  }

  turnGhostSnakeLeft() {
    this.#ghostSnake.turnLeft();
  }

  doesGhostSnakeNearTheWall() {
    return this.#ghostSnake.nearTheWall();
  }

  doesGhostSnakeEatSnake() {
    return this.#ghostSnake.hasEatenAnother(this.#snake);
  }

  moveSnakes() {
    this.#snake.move();
    this.#ghostSnake.move();

    if (this.#snake.isAt(this.#food.position)) {
      this.generateNewFood('normal');
      this.#snake.addPart();
      this.updateScore(2);
    }

    if (this.#ghostSnake.isAt(this.#food.position)) {
      this.generateNewFood('normal');
      this.#ghostSnake.addPart();
      this.updateScore(-1);
    }
  }

  generateNewFood(foodType) {
    const colId = Math.round(Math.random() * (NUM_OF_COLS - 1));
    const rowId = Math.round(Math.random() * (NUM_OF_ROWS - 1));
    this.#food = new Food(colId, rowId, foodType);
  }

  updateSnakes() {
    this.#snake.removePart();
    this.#ghostSnake.addPart();
    this.updateScore(-2);
  }

  isOver() {
    const doesSnakeHitTheWall = this.#snake.doesHitTheWall();
    const hasEatenAnotherSnake = this.#snake.hasEatenAnother(this.#ghostSnake);
    const doesSnakeHitItself = this.#snake.hasEatenItself();
    return doesSnakeHitTheWall || hasEatenAnotherSnake || doesSnakeHitItself;
  }

  updateScore(points) {
    this.#scoreCard.update(points);
  }

  modifyRunningStatus(runningState) {
    this.#runningStatus = runningState;
  }

  get runningStatus() {
    return this.#runningStatus;
  }
}
