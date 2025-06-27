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
    this.shipsPlaced = new Set();
  }

  resetBoard() {
    this.trackingGrid = this.#createGrid();
    this.ownGrid = this.#createGrid();
    this.shipsSunk = 0;
    this.shipsPlaced.clear();
  }

  randomiseOwnShips(ships) {
    this.ownGrid = this.#createGrid();
    this.shipsPlaced.clear();
    ships.forEach((ship) => {
      this.placeShipRandomly(ship);
    });
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

  placeShipRandomly(ship) {
    const orientation = Math.floor(Math.random() * 2);

    let x = 0;
    let y = 0;

    let attempts = 0;
    while (attempts < 1000) {
      // Generate the coords randomly
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);

      const endX = orientation === 0 ? x + ship.length - 1 : x;
      const endY = orientation === 1 ? y + ship.length - 1 : y;

      // Check if the ship can be placed in the grid without getting out of bounds
      if (endX >= 10 || endY >= 10) continue;

      // Check if the boat doesnt overlap with another

      let overlap = false;
      for (let i = 0; i < ship.length; i++) {
        const xCoord = orientation === 0 ? x + i : x;
        const yCoord = orientation === 1 ? y + i : y;
        const key = `${xCoord}-${yCoord}`;

        if (this.shipsPlaced.has(key)) {
          overlap = true;
          break;
        }
      }

      if (overlap) continue;
      this.placeShip([x, y], ship, orientation);
      return;
    }
    throw new Error(`Max. attemps reached to place the ships ${1000}`);
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
      this.shipsPlaced.add(`${x}-${y}`);

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
