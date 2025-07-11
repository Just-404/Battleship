import Player from "./Player";

class ComputerPlayer extends Player {
  constructor() {
    super("Computer");
    this.playedCells = new Set();
  }

  resetBoard() {
    super.resetBoard();
    this.playedCells.clear();
  }

  #generateKey(x, y) {
    return `${x}-${y}`;
  }

  generateAttackingCoords() {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const key = this.#generateKey(x, y);
      if (!this.playedCells.has(key)) {
        this.playedCells.add(key);
        return [x, y];
      }
    }
  }

  attackShipOn() {
    return this.generateAttackingCoords();
  }
}

export default ComputerPlayer;
