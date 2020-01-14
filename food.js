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