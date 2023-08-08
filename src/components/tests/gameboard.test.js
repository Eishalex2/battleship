import gameboard from "../gameboard";
import Ship from "../ship";

const vertShip = new Ship(3);
const horizShip = new Ship(2);
const oneShip = new Ship(1);

let board;

beforeEach(() => {
  board = gameboard();
});

test('ship placed correctly horizontally', () => {
  board.placeShip(horizShip, [1,2], [1,3]);
  expect(board.showBoard()[1][2]).toBe(horizShip);
  expect(board.showBoard()[1][3]).toBe(horizShip);
  expect(board.showBoard()[0][4]).toBe("");
});

test('ship placed correctly vertically', () => {
  board.placeShip(vertShip, [0,0], [2,0]);
  expect(board.showBoard()[0][0]).toBe(vertShip);
  expect(board.showBoard()[1][0]).toBe(vertShip);
  expect(board.showBoard()[2][0]).toBe(vertShip);
  expect(board.showBoard()[3][0]).toBe("");
});

test('receive attack hits ship', () => {
  board.placeShip(oneShip, [4,4], [4,4]);
  board.receiveAttack(4,4);
  expect(oneShip.isSunk()).toBeTruthy();
  expect(board.showBoard()[4][4]).toBe("hit");
});

test('cannot guess the same place twice', () => {
  board.receiveAttack(2,2);
  board.receiveAttack(2,3);
  expect(board.receiveAttack(2,2)).toEqual('Already guessed. Please try again.');
});

test('records misses', () => {
  board.placeShip(horizShip, [1,2], [1,3]);
  board.receiveAttack(6,7);
  expect(board.showBoard()[6][7]).toEqual("miss");
});

test('checks if all ships are sunk', () => {
  board.placeShip(oneShip, [4,4], [4,4]);
  expect(board.receiveAttack(4,4)).toEqual('Game Over!');
});

test('continues game if not all ships are sunk', () => {
  board.placeShip(oneShip, [4,4], [4,4]);
  board.placeShip(horizShip, [1,2], [1,3]);
  expect(board.receiveAttack(4,4)).not.toEqual('Game Over!');
});