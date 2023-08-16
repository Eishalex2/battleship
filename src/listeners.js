import Gameplay from './gameplay'
import UI from "./visibleBoard";
import Ship from "./components/ship";

const rotateBtn = document.getElementById('rotate');
const startBtn = document.getElementById('start');
const enemyCells = document.querySelectorAll('#computer-board .cell');
const placeShipsContainer = document.getElementById('place-ships-container');
const mainBoardsContainer = document.getElementById('board-container');


const availableShips = () => {
  const carrier = new Ship(5);
  const battleship = new Ship(4);
  const cruiser = new Ship(3);
  const submarine = new Ship(3);
  const destroyer = new Ship(2);

  return [carrier, battleship, cruiser, submarine, destroyer]
}


export default class Listeners {
  static orientation = 'horiz';

  static shipIndex = 0;

  static shipsPlaced = [];

  static ships = availableShips();

  static eventListeners() {
    UI.createBoard('place-ships-board');

    rotateBtn.addEventListener('click', () => {
      this.rotateShip();
    });

    startBtn.addEventListener('click', () => {
      this.startGame();
    })

    this.addPlaceShipListeners();
  }

  static startGame() {
    console.log(this.shipsPlaced);
    Gameplay.startGame(this.shipsPlaced);
    this.reset();
    this.addAttackListeners();
    placeShipsContainer.classList.add('hidden');
    mainBoardsContainer.classList.remove('hidden');
    // hide the place ships board
    // show the main boards
  }
  
  static addPlaceShipListeners() {
    const cells = document.querySelectorAll('#place-ships-board .cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const { row } = e.target.dataset;
        const { column } = e.target.dataset;
        if (this.shipIndex < 5 && this.isLegalShipPlacement(this.ships[this.shipIndex].length, row, column)) {
          this.placeShip(row, column);
        }
      });
    });
  }

  static addAttackListeners() {
    enemyCells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if (e.target.textContent === '') {
          Gameplay.playerMove(e.target.dataset.row, e.target.dataset.column);
        }
      });
    });
  }

  static placeShip(row, column) {
    UI.placeShip(this.ships[this.shipIndex].length, row, column, this.orientation);
    const shipsInfoObject = {
      "ship": this.ships[this.shipIndex],
      "row": Number(row),
      "column": Number(column),
      "orientation": this.orientation
    }
    this.shipsPlaced.push(shipsInfoObject);
    this.shipIndex += 1;
  }

  static isLegalShipPlacement(length, row, column) {
    // check if any of the cells has a ship in it

    // check if ship goes out of bounds
    if (this.orientation === 'horiz') {
      // check if ship goes out of bounds
      if (Number(column) + length - 1 > 9) return false;
      
      // check if any of the target cells already has a ship in it
      // false = no ship
      let flag = false;
      for (let i = Number(column); i < Number(column) + length; i++) {
        if (!flag) {
          flag = UI.containsShip(row, i);
        }
      }
      return (!flag);
    }

    if (this.orientation === 'vert') {
      if (Number(row) + length - 1 > 9) return false;

      let flag = false;
      for (let i = Number(row); i < Number(row) + length; i++) {
        if (!flag) {
          flag = UI.containsShip(i, column);
        }
      }
      return (!flag);
    }
  }

  static rotateShip() {
    this.orientation = this.orientation === 'horiz' ? 'vert' : 'horiz';
  }

  static reset() {
    UI.createBoard('place-ships-board');
    this.orientation = 'horiz';
    this.shipIndex = 0;
    this.shipsPlaced = [];
    this.addPlaceShipListeners();
  }
}
