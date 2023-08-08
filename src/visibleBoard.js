const createBoard = (id, board=null) => {
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (board && board.showBoard()[row][column] === "miss") {
        cell.classList.add('miss');
      } else if (board && board.showBoard()[row][column] === "hit") {
        cell.classList.add('hit');
      }
      document.getElementById(id).appendChild(cell);
    }
  }
}

export default createBoard;