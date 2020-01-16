class Game {
  #snake;
  #ghostSnake;
  #food;
  #scoreCard;
  constructor(snake, ghostSnake, food, scoreCard) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#scoreCard = scoreCard;
  }

  getStatus() {
    const snake = {
      location: this.#snake.location,
      species: this.#snake.species,
      tail: this.#snake.tail
    }

    const food = {
      position: this.#food.position,
      previousFood: this.#food.previousFood,
      type: this.#food.type
    }

    const ghostSnake = {
      location: this.#ghostSnake.location,
      species: this.#ghostSnake.species,
      tail: this.#ghostSnake.tail
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

  doesGhostSnakeHitTheWall() {
    return this.#ghostSnake.doesHitTheWall();
  }

  doesGhostSnakeEatSnake() {
    return this.#ghostSnake.hasEatenAnother(this.#snake);
  }

  moveSnakes() {
    this.#snake.move();
    this.#ghostSnake.move();
    if (isFoodEatenBySnake(this.#snake, this.#food)) {
      this.#food.generateNew();
      this.#snake.addPart();
      this.updateScore(2);
    }
    if (isFoodEatenBySnake(this.#ghostSnake, this.#food)) {
      this.#food.generateNew();
      this.#ghostSnake.addPart();
      this.updateScore(-1);
    }
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
}

const isFoodEatenBySnake = function (snake, food) {
  return snake.location.some(part =>
    part.every((coordinate, i) => coordinate == food.position[i]));
}