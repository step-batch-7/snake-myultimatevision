class Food {
  #colId;
  #rowId;
  #previousFood;
  #type;
  constructor(colId, rowId, previousFood, type) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#previousFood = previousFood
    this.#type = type;
  }


  get type() {
    return this.#type;
  }
  get position() {
    return [this.#colId, this.#rowId];
  }

  get previousFood() {
    return this.#previousFood;
  }
  generateNew() {
    this.#previousFood = [this.#colId, this.#rowId];
    this.#colId = Math.round(Math.random() * (NUM_OF_COLS - 1));
    this.#rowId = Math.round(Math.random() * (NUM_OF_ROWS - 1));
  }
}