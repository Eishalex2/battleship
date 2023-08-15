import Gameplay from './gameplay'
import UI from "./visibleBoard";
import Player from "./components/player";
import Ship from "./components/ship";


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

    this.addPlaceShipListeners();
  }
  
  static addPlaceShipListeners() {
    const cells = document.querySelectorAll('#place-ships-board .cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const { row } = e.target.dataset;
        const { column } = e.target.dataset;
        const currentShip = this.ships[this.shipsIndex];
        if (this.shipIndex < 5 && this.isLegalShipPlacement(this.ships[this.shipIndex].length, row, column)) {
          this.placeShip(row, column);
        }
      });
    });
  }

  static placeShip(row, column) {
    UI.placeShip(this.ships[this.shipIndex].length, row, column, this.orientation);
    this.shipsPlaced.push(this.ships[this.shipIndex]);
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
    
    // return (Number(column) + length - 1) < 10;
    // if (this.orientation === 'vert') return (Number(column) + length - 1) < 10;

    // check if any of the cells has a ship already in it
  }
}