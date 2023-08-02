import Ship from "./ship";

const gameboard = () => {
  const createBoard = () => {
    const board = [...Array(10)].map(() => Array(10).fill(""));
    return board;
  }

  const board = createBoard();

  const showBoard = () => board;

  const placeShip = (ship) => {
    const rowStart = ship.start[0];
    const rowEnd = ship.end[0];
    const columnStart = ship.start[1];
    const columnEnd = ship.end[1];
    const {length} = ship;
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

    const receiveAttack = (location) => {
      // take pair of coordinates
      // determines if they attack a ship
      // if they do attack a ship, then send the hit function to the
      // correct ship
      // if they do not attack a ship, record the coordinates of the
      // missed shot
    }
  }

  return {showBoard, placeShip}
}

export default gameboard;