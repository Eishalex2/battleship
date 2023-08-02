import Ship from "./ship";

const gameboard = () => {
  const createBoard = () => {
    const board = [...Array(10)].map(() => Array(10).fill(""));
    return board;
  }

  const board = createBoard();

  const showBoard = () => board;

  const placeShip = (start, end, length) => {
    const ship = new Ship(length);
    // horizontal
    if (start[0] === end[0]) {
      for (let i=start[1]; i < start[1]+length; i++) {
        board[start[0]][i] = 1;
      }
    }
    // vertical
    else if (start[1] === end[1]) {
      for (let i = start[0]; i < start[0] + length; i++) {
        board[i][start[1]] = 1;
      }
    }
  }

  return {showBoard, placeShip}
}

export default gameboard;