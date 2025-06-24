import Ship from "./Ship";
import Gameboard from "./Gameboard";
import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";

class Game {
  constructor(player1Name = "Player 1", player2Name = "Computer") {
    this.player1 = new Player(player1Name);
    this.player2 = new ComputerPlayer(player2Name);
    this.playerTurn = this.player1;
  }

  changeTurn() {
    this.playerTurn =
      this.playerTurn === this.player1 ? this.player2 : this.player2;
  }

  placeShip(coords, ship, orientation) {
    this.playerTurn.placeShip(coords, ship, orientation);
  }

  startGame() {
    this.player1.createShips();
    this.player2.createShips();
  }
}

export default Game;
