const createBoard = (id, board=null) => {
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.column = column;
      if (board && board.showBoard()[row][column] === "miss") {
        cell.classList.add('miss');
      } else if (board && board.showBoard()[row][column] === "hit") {
        cell.classList.add('hit');
      }
      document.getElementById(id).appendChild(cell);
    }
  }
}

function findAttacked(row, column, id) {
  let picked;
  const cells = document.querySelectorAll(`#${id} .cell`);
  cells.forEach((cell) => {
    if (cell.dataset.row === row && cell.dataset.column === column) {
      picked = cell;
    }
  });
  return picked;
}

function displayMoveResult(row, column, id, isHit) {
  const picked = findAttacked(row, column, id);

  if (isHit) {
    picked.classList.add('hit');
    picked.textContent = 'O';
  } else {
    picked.classList.add('miss');
    picked.textContent = 'X';
  }
}

export { createBoard , displayMoveResult };