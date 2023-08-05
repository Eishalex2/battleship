import gameboard from "./gameboard";
// turns
// two gameboards, two already guessed arrays
// computer ai to play against

// maybe just focus on making the computer ai first and go from there.

const Player = () => {

  const attack = (row, column, board) => board.receiveAttack(row, column)

  const randomAttack = (board) => {
    function chooseRandomCoord() {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);

      const boardCell = board[row][column];

      if (boardCell === 'miss' || boardCell === 'hit') {
        chooseRandomCoord();
      } else {
        board.receiveAttack(row, column);
      }
    }
    return {chooseRandomCoord}
  }

  return {attack, randomAttack}
}

export default Player;