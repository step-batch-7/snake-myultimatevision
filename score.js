class Score {
  constructor(score) {
    this.score = score;
  }

  get Score() {
    return this.score;
  }

  incrementScore() {
    return this.score++;
  }
}