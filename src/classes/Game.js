import Player from "./Player";
import ComputerPlayer from "./ComputerPlayer";
import {
  renderInitialBoard,
  renderRivalBoard,
  changeBoards,
  computerAttackCell,
  renderEndScreen,
} from "../DOM/renderContent.js";

const OUTPUT = document.getElementsByTagName("output")[0];

class Game {
  constructor(player1Name = "Player 1", player2Name = "Computer") {
    this.player1 = new Player(player1Name);
    this.player2 = new ComputerPlayer(player2Name);
    this.attacker = this.player1;
    this.defensor = this.player2;
  }

  endGame() {
    OUTPUT.value = this.attacker.name + " wins!";
    renderEndScreen(this.startGame.bind(this));
    this.player1.resetBoard();
    this.player2.resetBoard();
    this.attacker = this.player1;
    this.defensor = this.player2;
  }

  changeTurn() {
    this.attacker =
      this.attacker === this.player1 ? this.player2 : this.player1;

    this.defensor =
      this.defensor === this.player1 ? this.player2 : this.player1;
    if (this.attacker instanceof ComputerPlayer) {
      this.computerTurn();
    }
    changeBoards();
  }

  computerTurn() {
    setTimeout(() => {
      if (this.defensor instanceof ComputerPlayer) return;
      const [x, y] = this.attacker.attackShipOn();
      const cellValue = this.defensor.receiveAttack(x, y);

      if (cellValue == 0) this.changeTurn();
      computerAttackCell(x, y, cellValue); // updates the UI

      if (this.defensor.gameboard.isGameover()) {
        this.endGame();
        return;
      }
      this.computerTurn();
    }, 600);
  }

  placeShip(coords, ship, orientation) {
    this.attacker.placeShip(coords, ship, orientation);
  }

  startGame() {
    renderInitialBoard(this.player1.gameboard.getOwnGrid());
  }

  attackCell(x, y) {
    try {
      const cellValue = this.defensor.receiveAttack(x, y);

      if (cellValue === 0) {
        OUTPUT.textContent = `${this.attacker.name} has missed!`;
        this.changeTurn();
      } else if (cellValue === 1) {
        OUTPUT.textContent = `${this.attacker.name} has hit a ship!`;
      }
      if (this.defensor.gameboard.isGameover()) {
        this.endGame();
      }
      return cellValue;
    } catch (error) {
      OUTPUT.textContent = error.message;
      return null;
    }
  }

  startRound() {
    OUTPUT.value = "It's " + this.attacker.name + " turn.";

    renderRivalBoard(
      this.defensor.gameboard.getOwnGrid(),
      this.attackCell.bind(this)
    );
  }

  getPlayers() {
    return [this.player1, this.player2];
  }
}

export default Game;
