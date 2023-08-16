import gameboard from "./components/gameboard";
import Player from "./components/player";
import UI from "./visibleBoard";

// create players and gameboards

export default class Gameplay {
  static player = Player();

  static computer = Player();

  static playerMove(row, column) {
    // this is no longer going to work
    this.player.attack(row, column, this.computerBoard);
    const isHit = this.computerBoard.showBoard()[row][column] === 'hit';
    UI.displayMoveResult(row, column, 'computer-board', isHit);
  }

  static startGame(shipsArray) {
    // clear the boards
    this.computer.clearMyBoard();
    this.player.clearMyBoard();

    // have the player place their ships
    this.player.placeShips(shipsArray);

    // enemy places their ships

    // show the boards
    UI.createPlayerBoard(this.player.getMyBoard());
    UI.createOpponentBoard(this.computerBoard);

    // take turns and play the game
  }
}

// const game = () => {
//   const player = Player();
//   const playerBoard = gameboard();

//   const opponent = Player();
//   const enemyBoard = gameboard();

//   const startGame = (ships) => {
//     // reset
//     playerBoard.clearBoard();
//     enemyBoard.clearBoard();
//     createBoard('place-ships-board', playerBoard);
//   }

//   const playerMove = (row, column) => {
//     player.attack(row, column, enemyBoard);
//     const isHit = enemyBoard.showBoard()[row][column] === 'hit';
//     displayMoveResult(row, column, 'computer-board', isHit);
//     // need to check if all ships are sunk
//   }

//   const computerMove = () => {
//     const coords = opponent.chooseRandomCoord(playerBoard);
//     opponent.attack(coords[0], coords[1], playerBoard);
//     const isHit = playerBoard.showBoard()[coords[0]][coords[1]] === 'hit';
//     displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
//     // also need to check if all ships are sunk
//   }

//   return {
//     startGame,
//     playerMove,
//     computerMove
//   }
// }