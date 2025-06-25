import "./style.css";
import Game from "./classes/Game";

const game = new Game();
game.startGame();

const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", () => game.startRound());
