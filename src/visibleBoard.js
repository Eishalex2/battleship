export default class UI {
  static createBoard(id, board = null) {
    for(let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.column  = column;
        if (board && board.showBoard()[row][column] === 'miss') {
          cell.classList.add('miss');
        } else if (board && board.showBoard()[row][column] === 'hit') {
          cell.classList.add('hit');
        }
        document.getElementById(id).appendChild(cell);
      }
    }
  }

  static createPlayerBoard(board) {
    this.createBoard('player-board', board);
  }

  static createOpponentBoard(board) {
    this.createBoard('computer-board', board);
  }

  static findCell(row, column, id) {
    let picked;
    const cells = document.querySelectorAll(`#${id} .cell`);
    cells.forEach((cell) => {
      if (cell.dataset.row === row && cell.dataset.column === column) {
        picked = cell;
        console.log(picked);
      }
    });
    return picked;
  }

  static displayMoveResult(row, column, id, isHit) {
    const picked = this.findCell(row, column, id);

    if (isHit) {
      picked.classList.add('hit');
      picked.textContent = 'O';
    } else {
      picked.classList.add('miss');
      picked.textContent = 'X';
    }
  }

  static placeShip(length, row, column, orientation = 'horiz') {
    let choice;
    for (let i = 0; i < length; i++) {
      if (orientation === 'horiz') {
        choice = this.findCell(row, (Number(column) + i).toString(), 'place-ships-board');
      } else {
        choice = this.findCell((Number(row) + i).toString(), column, 'place-ships-board');
      }
      choice.classList.add('ship');
    }
  }
}