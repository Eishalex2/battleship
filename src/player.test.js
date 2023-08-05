import Player from "./player";
import gameboard from "./gameboard";
import Ship from "./ship";

const oneShip = new Ship(1, [6,6], [6,6]);

describe('Player moves', () => {
  const player = Player();
  const playerBoard = gameboard();

  const computer = Player();
  const computerBoard = gameboard();

  test('Player misses', () => {
    player.attack(1, 2, computerBoard);
    expect(computerBoard.showBoard()[1][2]).toBe("miss");
  });

  test('Player hits', () => {
    computerBoard.placeShip(oneShip);
    player.attack(6, 6, computerBoard);
    expect(computerBoard.showBoard()[6][6]).toBe("hit");
  });

  test('Player cannot guess same place twice', () => {
    player.attack(1, 1,computerBoard);
    expect(player.attack(1,1,computerBoard)).toBe('Already guessed. Please try again.');
  });
});