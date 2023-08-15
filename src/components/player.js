const Player = () => {

  const attack = (row, column, board) => board.receiveAttack(row, column);

  const placeShips = (shipsArray, board) => {
    shipsArray.forEach((length) => {
      board.placeShip(length);
    })
  }

  const chooseRandomCoord = (board) => {
    const row = Math.floor(Math.random() * 10);
    const column = Math.floor(Math.random() * 10);

    const boardCell = board.showBoard()[row][column];

    if (boardCell === 'miss' || boardCell === 'hit') {
      chooseRandomCoord();
    } 

    return [row, column];
  }

  return {placeShips, attack, chooseRandomCoord}
}

export default Player;