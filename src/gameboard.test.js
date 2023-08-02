import gameboard from "./gameboard";

test('ship placed correctly horizontally', () => {
  const board = gameboard();
  board.placeShip([0,0],[0,3],4);
  expect(board.showBoard()[0][0]).toBe(1);
  expect(board.showBoard()[0][1]).toBe(1);
  expect(board.showBoard()[0][2]).toBe(1);
  expect(board.showBoard()[0][3]).toBe(1);
  expect(board.showBoard()[0][4]).toBe("");
});

test('ship placed correctly vertically', () => {
  const board2 = gameboard();
  board2.placeShip([0,0], [2,0], 3);
  expect(board2.showBoard()[0][0]).toBe(1);
  expect(board2.showBoard()[1][0]).toBe(1);
  expect(board2.showBoard()[2][0]).toBe(1);
  expect(board2.showBoard()[3][0]).toBe("");
});