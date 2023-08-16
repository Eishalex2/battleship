import Player from "./components/player";
import UI from "./visibleBoard";

// create players and gameboards

export default class Gameplay {
  static player = Player();

  static computer = Player();

  static playerMove(row, column) {
    const isHit = this.player.attack(row, column, this.computer.getMyBoard());
    UI.displayMoveResult(row, column, 'computer-board', isHit);
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