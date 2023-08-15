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

  const placeShip = (ship, row, col, orientation) => {
    if (board[row][col] !== ship) {
      ships.push(ship);
      board[row][col] = ship;

      if (orientation === 'horiz') {
        for (let i = 1; i < ship.length; i++) {
          board[row][col + i] = ship;
        }
      } else {
        for (let i = 1; i < ship.length; i++) {
          board[row + 1][col] = ship;
        }
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

  return {allSunk, clearBoard, showBoard, placeShip, receiveAttack}
}

export default gameboard;