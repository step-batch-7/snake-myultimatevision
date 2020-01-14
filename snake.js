const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';



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

  doesSnakeHitTheWall() {
    const [headX, headY] = this.location[this.location.length - 1];
    return isNotInRange(headX, [0, NUM_OF_COLS]) || isNotInRange(headY, [0, NUM_OF_ROWS])
  };
}

const isNotInRange = function (num, range) {
  max_value = Math.max(...range);
  min_value = Math.min(...range);
  return max_value <= num || min_value > num
};
