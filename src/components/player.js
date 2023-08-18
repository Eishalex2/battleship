import gameboard from "./gameboard";

const Player = () => {
  const myBoard = gameboard();

  const attack = (row, column, board) => {
    board.receiveAttack(row, column);

    return board.showBoard()[row][column] === 'hit';
  }

  const placeShips = (shipsPlacedArray) => {
    shipsPlacedArray.forEach((object) => {
      myBoard.placeShip(object.ship, object.row, object.column, object.orientation);
    });
  }

  const placeShipsRandomly = () => {
    myBoard.randomShipPlacement();
  }

  const getMyBoard = () => myBoard

  const chooseRandomCoord = (board) => {
    const row = Math.floor(Math.random() * 10);
    const column = Math.floor(Math.random() * 10);

    const boardCell = board.showBoard()[row][column];

    if (boardCell === 'miss' || boardCell === 'hit') {
      chooseRandomCoord(board);
    } 

    return [row, column];
  }

  const clearMyBoard = () => {
    myBoard.clearBoard();
    console.log(myBoard.showBoard());
  }

  const gameOver = () => myBoard.allSunk()

  return {gameOver, placeShipsRandomly, clearMyBoard, getMyBoard, placeShips, attack, chooseRandomCoord}
}

export default Player;