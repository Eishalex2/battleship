import gameboard from "./components/gameboard";
import Player from "./components/player";
import Ship from "./components/ship";
import createBoard from "./visibleBoard";

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

  return {
    startGame
  }
}

export default game;