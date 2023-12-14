import { Game } from "./game.js";
import { Gameboard } from "./gameboard.js";

const displayController = (() => {
  const board = document.getElementById("board");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !Game.gameActive) {
      Game.startGame();
    }
  };

  const renderBoard = () => {
    board.innerHTML = "";

    Gameboard.getBoard().forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;
      cellElement.addEventListener("click", () => Game.handleCellClick(index));
      board.appendChild(cellElement);
    });
  };

  const showStatus = (message) => {
    const statusElement = document.getElementById("status");
    statusElement.textContent = message;
  };

  const highlightWinningCells = (winningCombination) => {
    winningCombination.forEach((index) => {
      const cellElement = board.children[index];
      cellElement.classList.add("winning-cell");
    });
  };

  const resetBoardStyles = () => {
    Array.from(board.children).forEach((cellElement) => {
      cellElement.classList.remove("winning-cell");
    });
  };

  document.getElementById("start-btn").addEventListener("click", () => {
    Game.startGame();
  });

  document
    .getElementById("player1")
    .addEventListener("keypress", handleKeyPress);
  document
    .getElementById("player2")
    .addEventListener("keypress", handleKeyPress);

  document.getElementById("new-game-btn").addEventListener("click", () => {
    Game.newGame();
  });

  return { renderBoard, showStatus, highlightWinningCells, resetBoardStyles };
})();

export { displayController };
