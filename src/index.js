import "./styles/style.css";
import "./styles/ships.css";
import Game from "./classes/Game";

const game = new Game();
game.initGame();

const playBtn = document.getElementById("play-btn");
const randomiseBtn = document.getElementById("randomise");
const dockBtn = document.getElementById("dockBtn");

dockBtn.addEventListener("click", () => game.placeShipsManually());
playBtn.addEventListener("click", () => game.startRound());
randomiseBtn.addEventListener("click", () => game.placeShipsRandomly());
