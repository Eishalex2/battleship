import Player from "./components/player";
import UI from "./visibleBoard";

// create players and gameboards

export default class Gameplay {
  static player = Player();

  static computer = Player();

  static playerMove(row, column) {
    const isHit = this.player.attack(row, column, this.computer.getMyBoard());
    UI.displayMoveResult(row, column, 'computer-board', isHit);
    if (this.computer.gameOver()) {
      console.log('Player win!');      // player has won
    }
    this.computerMove();
  }

  static computerMove() {
    const coords = this.computer.chooseRandomCoord(this.player.getMyBoard());
    const isHit = this.computer.attack(coords[0], coords[1], this.player.getMyBoard());
    UI.displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
    if (this.player.gameOver()) {
      console.log('Computer win!')
      // computer has won
    }
  }

  static startGame(shipsArray) {
    // clear the boards
    this.computer.clearMyBoard();
    this.player.clearMyBoard();

    // have the player place their ships
    this.player.placeShips(shipsArray);

    // enemy places their ships
    this.computer.placeShipsRandomly();

    // show the boards
    UI.createPlayerBoard(this.player.getMyBoard());
    UI.createOpponentBoard(this.computer.getMyBoard());

    // take turns and play the game

  }
}