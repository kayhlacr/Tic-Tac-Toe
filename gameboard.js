const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, resetBoard };
})();

export { Gameboard };
