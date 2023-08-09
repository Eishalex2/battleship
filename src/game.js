import gameboard from "./components/gameboard";
import Player from "./components/player";
import Ship from "./components/ship";
import { createBoard, displayMoveResult } from "./visibleBoard";

// create players and gameboards

const availableShips = () => {
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const cruiser = new Ship(3);
  const submarine = new Ship(3);
  const destroyer = new Ship(2);

  return {
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer
  }
}
const game = () => {
  const player = Player();
  const playerBoard = gameboard();

  const opponent = Player();
  const enemyBoard = gameboard();

  const startGame = () => {
    // reset
    playerBoard.clearBoard();
    enemyBoard.clearBoard();

    createBoard("player-board", playerBoard);
    createBoard("computer-board", enemyBoard);    
  }

  const playerMove = (row, column) => {
    player.attack(row, column, enemyBoard);
    const isHit = enemyBoard.showBoard()[row][column] === 'hit';
    displayMoveResult(row, column, 'computer-board', isHit);

    // need to check if all ships are sunk
  }

  return {
    startGame,
    playerMove
  }
}

export default game;