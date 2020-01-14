class Game {
  constructor(snake, ghostSnake, food, score) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
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

    const score = { score: this.score.score };
    return { snake, food, ghostSnake, score };
  }

  turnLeft() {
    this.snake.turnLeft();
  }

  turnRight() {
    this.snake.turnRight();
  }


  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (isFoodEatenBySnake(this.snake, this.food)) {
      this.food.generateNew();
      this.snake.addPart();
      this.incrementScore();
    }
  }

  isGameOver() {
    const doesSnakeHitTheWall = this.snake.doesSnakeHitTheWall();
    const doesSnakeHitAnother = this.snake.doesSnakeHitAnother(this.ghostSnake);
    const doesSnakeHitItself = this.snake.doesSnakeHitItself();
    return doesSnakeHitTheWall || doesSnakeHitAnother || doesSnakeHitItself;
  }

  incrementScore() {
    this.score.incrementScore();
  }
}

const isFoodEatenBySnake = function (snake, food) {
  return snake.location.some(part =>
    part.every((coordinate, i) => coordinate == food.position[i]));
}