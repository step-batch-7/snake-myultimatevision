class Game {
  constructor(snake, ghostSnake, food, scoreCard) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.scoreCard = scoreCard;
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

    const scoreCard = { score: this.scoreCard.score };
    return { snake, food, ghostSnake, scoreCard };
  }

  turnSnake(newDirection) {
    const direction = this.snake.heading;
    if (newDirection === (direction + 1) % 4) {
      this.snake.turnLeft();
    }
    if (newDirection === (direction + 3) % 4) {
      this.snake.turnRight();
    }
  }

  // turnLeft() {
  //   this.snake.turnLeft();
  // }

  // turnRight() {
  //   this.snake.turnRight();
  // }


  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.snake, this.food)) {
      this.food.generateNew();
      this.snake.addPart();
      this.updateScore(1);
    }
  }

  isGameOver() {
    const doesSnakeHitTheWall = this.snake.doesSnakeHitTheWall();
    const doesSnakeHitAnother = this.snake.doesSnakeHitAnother(this.ghostSnake);
    const doesSnakeHitItself = this.snake.doesSnakeHitItself();
    return doesSnakeHitTheWall || doesSnakeHitAnother || doesSnakeHitItself;
  }

  updateScore(points) {
    this.scoreCard.update(points);
  }
}

const isFoodEatenBySnake = function (snake, food) {
  return snake.location.some(part =>
    part.every((coordinate, i) => coordinate == food.position[i]));
}