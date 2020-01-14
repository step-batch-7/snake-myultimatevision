class ScoreCard {
  constructor(score) {
    this.score = score;
  }

  get Score() {
    return this.score;
  }

  update(points) {
    return this.score += points;
  }
}