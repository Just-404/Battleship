class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hitsCount = 0;
    this.sunk = false;
    this.positions = [];
  }

  setPositions(coords) {
    this.positions = coords;
  }

  isSunk() {
    return this.sunk;
  }

  hit() {
    if (this.sunk)
      throw new Error(
        `The ${this.name} is already sunk! It cannot be damaged anymore`
      );
    this.hitsCount++;

    if (this.length - this.hitsCount <= 0) {
      this.sunk = true;
    }
  }
}

export default Ship;
