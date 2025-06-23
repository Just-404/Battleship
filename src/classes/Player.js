import Gameboard from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  receiveAttack(x, y) {
    this.gameboard.receiveAttack(x, y);
  }
}

export default Player;
