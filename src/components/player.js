import gameboard from "./gameboard";

const Player = () => {
  const myBoard = gameboard();

  let previousMoves = [];

  const attack = (row, column, board) => {
    board.receiveAttack(row, column);
    return board.showBoard()[row][column] === 'hit';
  }

  const placeShips = (shipsPlacedArray) => {
    shipsPlacedArray.forEach((object) => {
      myBoard.placeShip(object.shipLength, object.row, object.column, object.orientation);
    });
  }

  const placeShipsRandomly = () => {
    myBoard.randomShipPlacement();
  }

  const getMyBoard = () => myBoard

  const moveMade = (row, column) => previousMoves.some(move => move[0] === row && move[1] === column)

  const chooseRandomCoord = () => {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    while (moveMade(row, column)) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } 

    previousMoves.push([row, column]);
    return [row, column];
  }

  const clearMyBoard = () => {
    myBoard.clearBoard();
    console.log(myBoard.showBoard());
    previousMoves = [];
  }

  const gameOver = () => myBoard.allSunk()

  const getRemainingShips = () => myBoard.getNumRemaining()

  return {getRemainingShips, gameOver, placeShipsRandomly, clearMyBoard, getMyBoard, placeShips, attack, chooseRandomCoord}
}

export default Player;