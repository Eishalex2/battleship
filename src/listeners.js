import game from "./gameplay";

function addListeners() {
  // start game
    const myGame = game();
    myGame.startGame();


    document.querySelectorAll('#computer-board .cell').forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if (e.target.textContent === '') {
          myGame.playerMove(e.target.dataset.row, e.target.dataset.column);
        }
      });
    });
  // attack event listeners

}

export default addListeners;