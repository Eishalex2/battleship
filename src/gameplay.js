import Player from "./components/player";
import UI from "./visibleBoard";

// create players and gameboards

export default class Gameplay {
  static player = Player();

  static computer = Player();

  static playerMove(row, column) {
    const isHit = this.player.attack(row, column, this.computer.getMyBoard());
    UI.displayMoveResult(row, column, 'computer-board', isHit);
    UI.showRemainingComputerShips(this.computer.getRemainingShips());
    if (this.computer.gameOver()) {
      UI.playerWins();     // player has won
    }
    setTimeout(() => {
      this.computerMove();
    }, 300);
  }

  static computerMove() {
    const coords = this.computer.chooseRandomCoord();
    const isHit = this.computer.attack(coords[0], coords[1], this.player.getMyBoard());
    UI.displayMoveResult(coords[0].toString(), coords[1].toString(), 'player-board', isHit);
    UI.showRemainingPlayerShips(this.player.getRemainingShips());
    if (this.player.gameOver()) {
      UI.computerWins();
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

    UI.showRemainingComputerShips(this.computer.getRemainingShips());
    UI.showRemainingPlayerShips(this.player.getRemainingShips());
  }
}