import "./style.css";
import Game from "./classes/Game";
import { renderInitialBoards } from "./DOM/renderBoards";

const game = new Game();
game.startGame();

const [player1, player2] = game.getPlayers();

const [player1OwnBoard, player1TrackingBoard] = player1.getBoards();
const [player2OwnBoard, player2TrackingBoard] = player2.getBoards();

renderInitialBoards(player1OwnBoard);
