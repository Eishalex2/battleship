const gameboard = () => {
  const createBoard = () => {
    const board = [...Array(10)].map(() => Array(10).fill(""));
    return board;
  }

  const clearBoard = () => {
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

  function allSunk() {
    return ships.every(ship => ship.isSunk());
  }

  const receiveAttack = (row, column) => {
    const boardCell = board[row][column];
    // already guessed
    if (boardCell === "miss" || boardCell === "hit") {
      return "Already guessed. Please try again.";
    }

    // ship has been hit
    if (typeof board[row][column] === "object") {
      board[row][column].hit();
      board[row][column] = "hit";
      if (allSunk()) {
        return "Game Over!";
      }
    } else {
      // ship has not been hit
      board[row][column] = "miss";
    }
  }

  return {clearBoard, showBoard, placeShip, receiveAttack}
}

export default gameboard;