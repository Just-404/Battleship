import Gameboard from "./Gameboard";
import Ship from "./Ship";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.ships = this.createShips();
    this.placeShipsRandomly();
  }

  createShips() {
    const ships = [];
    const SHIPS = [
      { name: "Destroyer", length: 2 },
      { name: "Submarien", length: 2 },
      { name: "Cruiser", length: 3 },
      { name: "Battleship", length: 4 },
      { name: "Carrier", length: 5 },
    ];

    for (const ship of SHIPS) {
      const newShip = new Ship(ship.name, ship.length);
      ships.push(newShip);
    }

    return ships;
  }

  placeShipsRandomly() {
    this.gameboard.randomiseOwnShips(this.ships);
  }

  fixShips() {
    this.ships.forEach((ship) => {
      ship.fixShip();
    });
  }

  getShips() {
    return this.ships;
  }

  getBoards() {
    return [this.gameboard.getOwnGrid(), this.gameboard.getTrackingGrid()];
  }

  placeShip(coords, ship, orientation) {
    this.gameboard.ownGrid.placeShip(coords, ship, orientation);
  }

  receiveAttack(x, y) {
    return this.gameboard.receiveAttack(x, y);
  }

  resetBoard() {
    this.gameboard.resetBoard();
    this.fixShips();
  }
}

export default Player;
