import gameboard from "./components/gameboard";

const createBoard = (id) => {
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column ++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      document.getElementById(id).appendChild(cell);
    }
  }
}