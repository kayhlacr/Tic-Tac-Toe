import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Game } from "./game.js";
import { displayController } from "./displayController.js";

document.getElementById("start-btn").addEventListener("click", () => {
  Game.startGame();
});

document
  .getElementById("player1")
  .addEventListener("keypress", displayController.handleKeyPress);
document
  .getElementById("player2")
  .addEventListener("keypress", displayController.handleKeyPress);

document.getElementById("new-game-btn").addEventListener("click", () => {
  Game.newGame();
});
