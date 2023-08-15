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
        if (this.shipIndex < 5) {
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
}


// function listeners() {
//   const orientation = 'horiz';

//   const availableShips = () => {
//     const carrier = new Ship(5);
//     const battleship = new Ship(4);
//     const cruiser = new Ship(3);
//     const submarine = new Ship(3);
//     const destroyer = new Ship(2);
  
//     return [carrier, battleship, cruiser, submarine, destroyer]
//   }

//   let shipIndex = 0;

//   const shipsPlaced = [];

//   function addListeners() {
//     createBoard('#place-ships-board');

//     function placeShip(row, column) {
//       placeShipVisible(availableShips()[shipIndex].length, row, column, orientation);
//       shipsPlaced.push(availableShips()[shipIndex]);
//       shipIndex += 1;
//     }

//     function addPlaceShipListeners() {
//       document.querySelectorAll('#place-ships-board .cell').forEach((cell) => {
//         cell.addEventListener('click', (e) => {
//           const {row} = e.target.dataset;
//           const {column} = e.target.dataset;
//           const currentShip = availableShips()[shipIndex];
//           if (shipIndex < 5) {
//             placeShip(row, column);
//           }
//         });
//       });
//     }

//     return {addPlaceShipListeners}
//   }
//   return {addListeners}
// }



// function addListeners() {
// // start game
//   const myGame = game();
//   myGame.startGame();

// // attack event listeners
//   document.querySelectorAll('#computer-board .cell').forEach((cell) => {
//     cell.addEventListener('click', (e) => {
//       if (e.target.textContent === '') {
//         myGame.playerMove(e.target.dataset.row, e.target.dataset.column);
//       }
//     });
//   });
// }

// function controller() {
//   const orientation = 'horiz';
//   const shipLengths = [5, 4, 3, 3, 2];
//   const shipsPlaced = [];


// }