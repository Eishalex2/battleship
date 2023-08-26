import Gameplay from './gameplay'
import UI from "./visibleBoard";
import Ship from "./components/ship";

const rotateBtn = document.getElementById('rotate');
const startBtn = document.getElementById('start');
const playAgainBtn = document.getElementById('play-again');
const placeShipsContainer = document.getElementById('place-ships-container');
const mainBoardsContainer = document.getElementById('board-container');
const key = document.querySelector('.key');
const shipName = document.querySelector('#place-ships-container h2');


export default class Listeners {
  static orientation = 'horiz';

  static shipLengths = [5, 4, 3, 3, 2];

  static shipIndex = 0;

  static shipsPlaced = [];

  static eventListeners() {
    UI.createBoard('place-ships-board');

    rotateBtn.addEventListener('click', () => {
      this.rotateShip();
    });

    startBtn.addEventListener('click', () => {
      document.getElementById('player-board').textContent = '';
      document.getElementById('computer-board').textContent = '';
      this.startGame();
    });

    playAgainBtn.addEventListener('click', () => {
      placeShipsContainer.classList.remove('hidden');
      document.getElementById('end-game-popup').classList.remove('show');
      document.querySelector('div .winner').textContent = '';
      mainBoardsContainer.classList.add('hidden');
      key.classList.add('hidden');
      this.reset();
    });

    this.addPlaceShipListeners();
  }

  static startGame() {
    Gameplay.startGame(this.shipsPlaced);
    this.addAttackListeners();
    this.reset();
    placeShipsContainer.classList.add('hidden');
    mainBoardsContainer.classList.remove('hidden');
    key.classList.remove('hidden');
  }
  
  static addPlaceShipListeners() {
    // shipName.textContent = `Place your ${this.ships[this.shipIndex].name}`;
    const cells = document.querySelectorAll('#place-ships-board .cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const { row } = e.target.dataset;
        const { column } = e.target.dataset;
        if (this.shipIndex < 5 && this.isLegalShipPlacement(this.shipLengths[this.shipIndex], row, column)) {
          this.placeShip(row, column);
        }
      });
    });
  }

  static addAttackListeners() {
    const enemyCells = document.querySelectorAll('#computer-board .cell');
    enemyCells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if (document.getElementById('end-game-popup').classList.contains('show')) {
          e.preventDefault();
        }
        else if (e.target.textContent === '') {
          Gameplay.playerMove(e.target.dataset.row, e.target.dataset.column);
        }
      });
    });
  }

  static placeShip(row, column) {
    UI.placeShip(this.shipLengths[this.shipIndex], row, column, this.orientation);
    const shipsInfoObject = {
      "shipLength": this.shipLengths[this.shipIndex],
      "row": Number(row),
      "column": Number(column),
      "orientation": this.orientation
    }
    this.shipsPlaced.push(shipsInfoObject);
    this.shipIndex += 1;
    // if (this.shipIndex < 5) {
    //   shipName.textContent = `Place your ${this.ships[this.shipIndex].name}`;
    // } else {
    //   shipName.textContent = 'Press start';
    // }

  }

  static isLegalShipPlacement(length, row, column) {
    row = Number(row);
    column = Number(column);
    // check if ship goes out of bounds
    if (this.orientation === 'horiz') {
      // check if ship goes out of bounds
      if (column + length - 1 > 9) return false;
      
      // check adjacent cells
      if (column > 0 && UI.containsShip(row, column - 1)) return false;
      for (let i = 0; i < length; i++) {
        if (row > 0 && UI.containsShip(row - 1, column + i)) return false;
        if (row < 9 && UI.containsShip(row + 1, column + i)) return false;
      }
      if ((column + length) < 10 && UI.containsShip(row, column + length)) return false;
      // check if any of the target cells already has a ship in it
      // false = no ship
      let flag = false;
      for (let i = column; i < column + length; i++) {
        if (!flag) {
          flag = UI.containsShip(row, i);
        }
      }
      return (!flag);
    }

    if (this.orientation === 'vert') {
      // check if ship goes out of bounds
      if (row + length - 1 > 9) return false;

      // check adjacent cells
      if (row > 0 && UI.containsShip(row - 1, column)) return false;
      for (let i = 0; i < length; i++) {
        if (column > 0 && UI.containsShip(row + i, column - 1)) return false;
        if (column < 9 && UI.containsShip(row + i, column + 1)) return false;
      }
      if ((row + length) < 10 && UI.containsShip(row + length, column)) return false;

      // check if any of the target cells already has a ship in it
      let flag = false;
      for (let i = row; i < row + length; i++) {
        if (!flag) {
          flag = UI.containsShip(i, column);
        }
      }
      return (!flag);
    }
    return true;
  }

  static rotateShip() {
    this.orientation = this.orientation === 'horiz' ? 'vert' : 'horiz';
  }

  static reset() {
    document.getElementById('place-ships-board').textContent = '';
    UI.createBoard('place-ships-board');
    this.orientation = 'horiz';
    this.shipIndex = 0;
    this.shipsPlaced = [];
    this.addPlaceShipListeners();
  }
}
