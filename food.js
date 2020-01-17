class Food {
  #colId;
  #rowId;
  #type;
  constructor(colId, rowId, type) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#type = type;
  }

  get type() {
    return this.#type;
  }
  get position() {
    return [this.#colId, this.#rowId];
  }

}