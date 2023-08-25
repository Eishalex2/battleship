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

  const hasAdjacentShips = (ship, row, col, orientation) => {
    // may not be testing the adjacent square
    if (orientation === 'horiz') {
      // check sides
      for (let i = col - 1; i < ship.length + col + 1; i++) {
        if (i < 0) continue;
        if (i > 9) break;
        if (row > 0 && board[row - 1][i] !== '') return true;
      }
      for (let i = col - 1; i < ship.length + col + 1; i++) {
        if (i < 0) continue;
        if (i > 9) break;
        if (row < 9 && board[row + 1][i] !== '') return true;
      }
      // check left and right cells
      if (col > 0 && board[row][col - 1] !== '') return true;
      if (col < 9 && board[row][col + 1] !== '') return true;
    }

    if (orientation === 'vert') {
      // check sides
      for (let i = row - 1; i < ship.length + row + 1; i++) {
        if (i < 0) continue;
        if (i > 9) break;
        if (col > 0 && board[col - 1][i] !== '') return true;
      }
      for (let i = row - 1; i < ship.length + row + 1; i++) {
        if (i < 0) continue;
        if (i > 9) break;
        if (col < 9 && board[col + 1][i] !== '') return true;
      }

      // check top and bottom cells
      if (row > 0 && board[row - 1][col] !== '') return true;
      if (row < 9 && board[row + 1][col] !== '') return true;
    }

    return false;
  }

  const randomShipPlacement = () => {
    const randomShips = availableShips();
    const orientations = ['horiz', 'vert'];

    randomShips.forEach((object) => {
      let row;
      let column;
      let orientation;
      let flag;
      function getRandom() {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);

        orientation = orientations[Math.floor(Math.random() * 2)];
        if (orientation === 'horiz' && (column + object.length - 1) > 9) {
          getRandom();
        }
        if (orientation === 'vert' && (row + object.length - 1) > 9) {
          getRandom();
        }

        if (hasAdjacentShips(object, row, column, orientation)) {
          getRandom();
        }
        // false = no ship
        flag = false;
        if (orientation === 'horiz') {
          for (let i = column; i < column + object.length; i++) {
            if (!flag) {
              flag = (board[row][i] !== '');
            }
          }
          if (flag) {
            getRandom();
          }
        }

        flag = false;
        if (orientation === 'vert') {
          for (let i = row; i < row + object.length; i++) {
            if (!flag) {
              flag = (board[i][column] !== '');
            }
          }
          if (flag) {
            getRandom();
          }
        }
      }
      getRandom();

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