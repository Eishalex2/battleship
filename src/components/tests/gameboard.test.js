import gameboard from "../gameboard";
import Ship from "../ship";

let board;

beforeEach(() => {
  board = gameboard();
});

test('ship placed correctly horizontally', () => {
  board.placeShip(3, 1, 2, 'horiz');
  expect(board.showBoard()[1][2]).toBeInstanceOf(Ship);
  expect(board.showBoard()[1][3]).toBeInstanceOf(Ship);
  expect(board.showBoard()[0][4]).toBe("");
});

test('ship placed correctly vertically', () => {
  board.placeShip(2, 6, 7, 'vert');
  expect(board.showBoard()[6][7]).toBeInstanceOf(Ship);
  expect(board.showBoard()[7][7]).toBeInstanceOf(Ship);
  expect(board.showBoard()[3][0]).toBe("");
});

test('receive attack hits ship', () => {
  board.placeShip(4, 3, 3, 'horiz');
  board.receiveAttack(3, 3);
  expect(board.showBoard()[3][3]).toBe("hit");
});

test('cannot guess the same place twice', () => {
  board.receiveAttack(2,2);
  board.receiveAttack(2,3);
  expect(board.receiveAttack(2,2)).toEqual('Already guessed. Please try again.');
});

test('records misses', () => {
  board.placeShip(1, 5, 5, 'vert');
  board.receiveAttack(6,7);
  expect(board.showBoard()[6][7]).toEqual("miss");
});

test('checks if all ships are sunk', () => {
  board.placeShip(1, 4, 4, 'vert');
  expect(board.receiveAttack(4,4)).toEqual('Game Over!');
});

test('continues game if not all ships are sunk', () => {
  board.placeShip(1, 4, 4, 'horiz');
  board.placeShip(2, 0, 0, 'vert');
  expect(board.receiveAttack(4,4)).not.toEqual('Game Over!');
});

test('returns number of ships remaining', () => {
  board.placeShip(1, 4, 4, 'horiz');
  board.placeShip(2, 0, 0, 'vert');
  board.receiveAttack(4, 4);
  expect(board.getNumRemaining()).toBe(1);
});