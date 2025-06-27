import "./style.css";
import Game from "./classes/Game";

const game = new Game();
game.initOwnBoard();

const playBtn = document.getElementById("play-btn");
const randomiseBtn = document.getElementById("randomise");

playBtn.addEventListener("click", () => game.startRound());
randomiseBtn.addEventListener("click", () => game.placeShipsRandomly());
