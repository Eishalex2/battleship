import Ship from "./ship";

const gameboard = () => {
  let board;

  const createBoard = () => {
    board = [...Array(10)].map(() => Array(10).fill(""));
    return board;
  }

  let ships = [];

  const clearBoard = () => {
    board = [...Array(10)].map(() => Array(10).fill(""));
    ships = [];
    return board;
  }

  const availableShips = () => {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);
  
    return [carrier, battleship, cruiser, submarine, destroyer]
  } 

  board = createBoard();

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
          board[row + i][col] = ship;
        }
      }
    }
  }

  const noAdjacentShips = (ship, row, col, orientation) => {
    // diagonals are allowed
    if (orientation === 'horiz') {
      if (col > 0 && board[row][col - 1] !== '') return false;
      for (let i = 0; i < ship.length; i++) {
          if (row > 0 && board[row - 1][col + i] !== '') return false;
          if (row < 9 && board[row + 1][col + i] !== '') return false;
      }
      if ((col + ship.length) < 10 && board[row][col + ship.length] !== '') return false;
    } else {
        if (row > 0 && board[row - 1][col] !== '') return false;
        for (let i = 0; i < ship.length; i++) {
            if (col > 0 && board[row + i][col - 1] !== '') return false;
            if (col < 9 && board[row + i][col + 1] !== '') return false;
        }
        if ((row + ship.length) < 10 && board[row + ship.length][col] !== '') return false;
    }
    return true;
  }

  const randomShipPlacement = () => {
    const randomShips = availableShips();
    const orientations = ['horiz', 'vert'];

    randomShips.forEach((object) => {
      let row;
      let column;
      let orientation;
      while (true) {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        orientation = orientations[Math.floor(Math.random() * 2)];
        // check if off board
        if (orientation === 'horiz' && (column + object.length - 1) > 9) continue;
        if (orientation === 'vert' && (row + object.length - 1) > 9) continue;

        if (board[row][column] === '' && (noAdjacentShips(object, row, column, orientation))) break;
      }

      placeShip(object, row, column, orientation);
    });
  }

  const getNumRemaining = () => 
    // for each ship in the ships array, check if it's sunk or not. If
    // it's not sunk, add one to the count.
     ships.reduce((total, ship) => {
      if (!ship.isSunk()) {
        total += 1;
      }
      return total;
    }, 0);
  

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

  return {getNumRemaining, randomShipPlacement, allSunk, clearBoard, showBoard, placeShip, receiveAttack}
}

export default gameboard;