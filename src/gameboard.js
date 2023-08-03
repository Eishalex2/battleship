import Ship from "./ship";

const gameboard = () => {
  const createBoard = () => {
    const board = [...Array(10)].map(() => Array(10).fill(""));
    return board;
  }

  const ships = [];

  const board = createBoard();

  const showBoard = () => board;

  const placeShip = (ship) => {
    const rowStart = ship.start[0];
    const rowEnd = ship.end[0];
    const columnStart = ship.start[1];
    const columnEnd = ship.end[1];
    const {length} = ship;

    ships.push(ship);
    // horizontal
    if (rowStart === rowEnd) {
      for (let i=columnStart; i < columnStart+length; i++) {
        board[rowStart][i] = ship;
      }
    }
    // vertical
    else if (columnStart === columnEnd) {
      for (let i = rowStart; i < rowStart + length; i++) {
        board[i][columnStart] = ship;
      }
    }
  }

  const guessed = [];

  function allSunk() {
    return ships.every(ship => ship.isSunk());
  }

  const receiveAttack = (location) => {
    const row = location[0];
    const column = location[1];

    // already guessed
    if (guessed.some(a => location.every((v,i) => v === a[i]))) {
      return "Already guessed. Please try again.";
    }

    // ship has been hit
    if (typeof board[row][column] === "object") {
      board[row][column].hit();
      guessed.push([row,column]);
      if (allSunk()) {
        return "Game Over!";
      }
    } else {
      // ship has not been hit
      board[row][column] = "miss";
      guessed.push([row,column]);
    }
  }

  return {showBoard, placeShip, receiveAttack}
}

export default gameboard;