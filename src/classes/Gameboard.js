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

  #checkOverlap(x, y, ship, orientation) {
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
    return overlap;
  }

  #checkOutOfBounds(x, y, ship, orientation) {
    let isOutOfBounds = false;
    for (let i = 0; i < ship.length; i++) {
      const xCoord = orientation == 0 ? x + i : x;
      const yCoord = orientation == 1 ? y + i : y;

      if (xCoord < 0 || y < 0 || xCoord >= 10 || yCoord >= 10) {
        isOutOfBounds = true;
        break;
      }
    }
    return isOutOfBounds;
  }
  placeShipRandomly(ship) {
    const orientation = Math.floor(Math.random() * 2);

    let x = 0;
    let y = 0;

    let attempts = 0;
    while (attempts < 1000) {
      attempts++;
      // Generate the coords randomly
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);

      const endX = orientation === 0 ? x + ship.length - 1 : x;
      const endY = orientation === 1 ? y + ship.length - 1 : y;

      // Check if the ship can be placed in the grid without getting out of bounds
      if (endX >= 10 || endY >= 10) continue;

      // Check if the ship doesnt overlap with another

      let overlap = this.#checkOverlap(x, y, ship, orientation);

      if (overlap) continue;
      this.placeShip([x, y], ship, orientation);
      return;
    }
    throw new Error(`Max. attemps reached to place the ships ${1000}`);
  }

  placeShipManually(startingCoord, ship, orientation) {
    let [x, y] = startingCoord;

    const overlap = this.#checkOverlap(x, y, ship, orientation);

    if (overlap)
      throw new Error("This ship cannot be placed here. It overlaps!");

    const isOutOfBounds = this.#checkOutOfBounds(x, y, ship, orientation);

    if (isOutOfBounds) throw new Error("The ship will go out of bounds");

    this.placeShip([x, y], ship, orientation);
  }

  #deleteShip(x, y) {
    this.ownGrid[x][y] = null;
  }

  rotateShip(ship) {
    if (!(ship instanceof Ship)) throw new Error("Invalid ship");

    const positions = ship.getPositions();
    if (!positions) throw new Error("This ship is not placed on board");

    const [x, y] = positions[0];

    const newOrientation = ship.getOrientation() === 1 ? 0 : 1;

    const isOutOfBounds = this.#checkOutOfBounds(x, y, ship, newOrientation);

    if (isOutOfBounds) throw new Error("The ship will go out of bounds");

    positions.forEach(([x, y]) => {
      this.#deleteShip(x, y);
      this.shipsPlaced.delete(`${x}-${y}`);
    });

    const overlaps = this.#checkOverlap(x, y, ship, newOrientation);

    if (overlaps) {
      this.placeShipManually(positions[0], ship, ship.getOrientation());
      ship.setPositions(positions);
      this.shipsPlaced.add(`${x}-${y}`);

      throw new Error("This ship cannot be placed here. It overlaps!");
    }

    this.placeShipManually([x, y], ship, newOrientation);
    ship.toggleOrientation();
  }

  placeShip(startingCoord, ship, orientation) {
    // Orientation: vertically -> 0, horizontally -> 1,
    let [x, y] = startingCoord;

    const endX = orientation === 0 ? x + ship.length - 1 : x;
    const endY = orientation === 1 ? y + ship.length - 1 : y;

    if (x < 0 || y < 0 || endX >= 10 || endY >= 10)
      throw new Error(
        `Invalid coordinate (${x}, ${y}). The ship goes out of bounds.`
      );

    const shipPosition = [];

    for (let i = 0; i < ship.length; i++) {
      const cellValue = this.ownGrid[x][y];

      if (cellValue instanceof Ship && cellValue !== ship)
        throw new Error("Cannot place a ship on top of another!");

      this.ownGrid[x][y] = ship;
      shipPosition.push([x, y]);
      this.shipsPlaced.add(`${x}-${y}`);

      if (orientation === 0) x++;
      else y++;
    }

    ship.setPositions(shipPosition);
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
