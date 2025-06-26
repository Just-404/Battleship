import Ship from "./Ship";

const GRID_SIZE = 10;
const HIT = 1;
const MISS = 0;
class Gameboard {
  constructor() {
    this.ownGrid = this.#createGrid();
    // cell values: null, MISS, HIT or Ship.
    this.trackingGrid = this.#createGrid();
    this.shipsSunk = 0;
  }

  resetBoard() {
    this.trackingGrid = this.#createGrid();
    this.shipsSunk = 0;
  }

  #createGrid() {
    const grid = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  getOwnGrid() {
    return this.ownGrid;
  }

  getTrackingGrid() {
    return this.trackingGrid;
  }

  isGameover() {
    return this.shipsSunk === 5;
  }

  placeShip(startingCoord, ship, orientation) {
    // Orientation: vertically -> 0, horizontally -> 1,
    const board = this.getOwnGrid().map((row) => [...row]);
    let [x, y] = startingCoord;

    const endX = orientation === 0 ? x + ship.length - 1 : x;
    const endY = orientation === 1 ? y + ship.length - 1 : y;

    if (x < 0 || y < 0 || endX >= 10 || endY >= 10)
      throw new Error(
        `Invalid coordinate (${x}, ${y}). The ship goes out of bounds.`
      );

    const shipPosition = [];

    for (let i = 0; i < ship.length; i++) {
      const cellValue = board[x][y];

      if (cellValue instanceof Ship && cellValue !== ship)
        throw new Error("Cannot place a ship on top of another!");

      board[x][y] = ship;
      shipPosition.push([x, y]);

      if (orientation === 0) x++;
      else y++;
    }

    ship.setPositions(shipPosition);
    this.ownGrid = board;
  }

  receiveAttack(x, y) {
    const cellValue = this.ownGrid[x][y];

    if (cellValue instanceof Ship) {
      if (cellValue.isSunk()) throw new Error("This ship is already sunk");

      cellValue.hit();

      if (cellValue.isSunk()) {
        this.shipsSunk++;
      }
      this.trackingGrid[x][y] = HIT;
    } else {
      this.trackingGrid[x][y] = MISS;
    }
    return this.trackingGrid[x][y];
  }
}
export default Gameboard;
