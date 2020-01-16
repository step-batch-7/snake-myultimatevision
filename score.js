class ScoreCard {
  #score;
  constructor(score) {
    this.#score = score;
  }

  get score() {
    return this.#score;
  }

  update(points) {
    return this.#score += points;
  }
}