class Ship {
  constructor(name, length, orientation = 1) {
    this.name = name;
    this.length = length;
    this.hitsCount = 0;
    this.sunk = false;
    this.positions = [];
    this.orientation = orientation;
  }

  setPositions(coords) {
    this.positions = coords;
  }

  getPositions() {
    return this.positions;
  }

  getOrientation() {
    return this.orientation;
  }

  toggleOrientation() {
    this.orientation = this.orientation === 1 ? 0 : 1;
  }

  fixShip() {
    this.hitsCount = 0;
    this.sunk = false;
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
