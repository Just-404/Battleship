import Gameboard from "./Gameboard";
import Ship from "./Ship";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.ships = [];
  }

  createShips() {
    const SHIPS = [
      { name: "Destroyer", length: 2, defaultStartingCoords: [0, 0] },
      { name: "Submarien", length: 2, defaultStartingCoords: [1, 1] },
      { name: "Cruiser", length: 3, defaultStartingCoords: [2, 2] },
      { name: "Battleship", length: 4, defaultStartingCoords: [3, 3] },
      { name: "Carrier", length: 5, defaultStartingCoords: [4, 4] },
    ];

    for (const ship of SHIPS) {
      const newShip = new Ship(ship.name, ship.length);
      this.ships.push(newShip);
      this.gameboard.placeShip(ship.defaultStartingCoords, newShip, 0);
    }
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
}

export default Player;
