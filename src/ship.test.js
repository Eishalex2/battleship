import Ship from "./ship";

test('isSunk works', () => {
  const myShip = new Ship(1);
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});