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

  isGameOver() {
    return this.snake.doesSnakeHitTheWall();
  }
}

const isFoodEatenBySnake = function (snake, food) {
  return snake.location.some(part =>
    part.every((coordinate, i) => coordinate == food.position[i]));
}