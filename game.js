import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { displayController } from "./displayController.js";

const Game = (() => {
  let currentPlayer;
  let gameActive = false;
  let player1;
  let player2;

  const startGame = () => {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    if (!player1Name || !player2Name) {
      alert("Please enter names for both players.");
      return;
    }

    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");

    currentPlayer = player1;
    gameActive = true;
    Gameboard.resetBoard();
    displayController.renderBoard();
    displayController.showStatus(`${currentPlayer.name}'s turn`);
  };
  //Switch to next player
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const handleCellClick = (index) => {
    if (!gameActive || Gameboard.getBoard()[index] !== "") return;

    Gameboard.getBoard()[index] = currentPlayer.marker;
    displayController.renderBoard();

    if (checkWinner()) {
      gameActive = false;
      displayController.showStatus(`${currentPlayer.name} wins!`);
    } else if (checkDraw()) {
      gameActive = false;
      displayController.showStatus("It's a draw!");
    } else {
      switchPlayer();
      displayController.showStatus(`${currentPlayer.name}'s turn`);
    }
  };
  //Check for winner
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        Gameboard.getBoard()[a] &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[b] &&
        Gameboard.getBoard()[a] === Gameboard.getBoard()[c]
      ) {
        displayController.highlightWinningCells(pattern);
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => !Gameboard.getBoard().includes("");

  const newGame = () => {
    gameActive = false;

    displayController.resetBoardStyles();
    displayController.showStatus(
      "Game reset. Enter player names and start a new game."
    );
  };

  return { startGame, handleCellClick, newGame };
})();

export { Game };
