import Player from "../player";
import gameboard from "../gameboard";
import Ship from "../ship";

describe('Player moves', () => {
  const player = Player();

  const computerBoard = gameboard();

  test('Player misses', () => {
    player.attack(1, 2, computerBoard);
    expect(computerBoard.showBoard()[1][2]).toBe("miss");
  });

  test('Player hits', () => {
    computerBoard.placeShip(2, 6, 6, 'horiz');
    player.attack(6, 6, computerBoard);
    expect(computerBoard.showBoard()[6][6]).toBe("hit");
  });

  test('Player cannot guess same place twice', () => {
    player.attack(1, 1,computerBoard);
    expect(player.attack(1,1,computerBoard)).toBeFalsy();
  });
});

describe('Computer moves', () => {
  const computer = Player();

  const playerBoard = gameboard();

  test('Computer misses', () => {
    const coord = computer.chooseRandomCoord();
    computer.attack(coord[0], coord[1], playerBoard);
    expect(playerBoard.showBoard().flat().every(entry => entry === "")).toBeFalsy();
  });
});

describe('Move Made check works', () => {
  let previousMoves = [];
  const moveMade = (row, column) => previousMoves.some(move => move[0] === row && move[1] === column);

  test('Move made no false positives', () => {
    previousMoves = [];
    expect(moveMade(1, 2)).toBeFalsy();
  });

  test('Move made can be true', () => {
    previousMoves = [[3,4]];
    expect(moveMade(3,4)).toBeTruthy();
  });
});