import gameboard from "./gameboard";
import Ship from "./ship";

const vertShip = new Ship(3, [1,1], [3,1]);
const horizShip = new Ship(4, [0,0], [0,3]);

let board;

beforeEach(() => {
  board = gameboard();
});

test('ship placed correctly horizontally', () => {
  board.placeShip(horizShip);
  expect(board.showBoard()[0][0]).toBe(horizShip);
  expect(board.showBoard()[0][1]).toBe(horizShip);
  expect(board.showBoard()[0][2]).toBe(horizShip);
  expect(board.showBoard()[0][3]).toBe(horizShip);
  expect(board.showBoard()[0][4]).toBe("");
});

test('ship placed correctly vertically', () => {
  board.placeShip(vertShip);
  expect(board.showBoard()[1][1]).toBe(vertShip);
  expect(board.showBoard()[2][1]).toBe(vertShip);
  expect(board.showBoard()[3][1]).toBe(vertShip);
  expect(board.showBoard()[3][0]).toBe("");
});

test('receive attack hits ship', () => {
  const oneShip = new Ship(1, [4,4], [4,4]);
  board.placeShip(oneShip);
  board.receiveAttack([4,4]);
  expect(oneShip.isSunk()).toBeTruthy;
});

test('cannot guess the same place twice', () => {
  board.receiveAttack([2,2]);
  board.receiveAttack([2,3]);
  expect(board.receiveAttack([2,2])).toEqual('Already guessed. Please try again.');
});

test('records misses', () => {
  board.placeShip(horizShip);
  board.receiveAttack([6,7]);
  expect(board.showBoard()[6][7]).toEqual("miss");
});