import gameboard from "./gameboard";
import Ship from "./ship";

const vertShip = new Ship(3, [1,1], [3,1]);
const horizShip = new Ship(4, [0,0], [0,3]);


test('ship placed correctly horizontally', () => {
  const board = gameboard();
  board.placeShip(horizShip);
  expect(board.showBoard()[0][0]).toBe(horizShip);
  expect(board.showBoard()[0][1]).toBe(horizShip);
  expect(board.showBoard()[0][2]).toBe(horizShip);
  expect(board.showBoard()[0][3]).toBe(horizShip);
  expect(board.showBoard()[0][4]).toBe("");
});

test('ship placed correctly vertically', () => {
  const board2 = gameboard();
  board2.placeShip(vertShip);
  expect(board2.showBoard()[1][1]).toBe(vertShip);
  expect(board2.showBoard()[2][1]).toBe(vertShip);
  expect(board2.showBoard()[3][1]).toBe(vertShip);
  expect(board2.showBoard()[3][0]).toBe("");
});