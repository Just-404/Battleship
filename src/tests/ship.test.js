import Ship from "../classes/Ship";

test("takes a ship object", () => {
  const battleship = new Ship("Battleship", 4);

  expect(battleship instanceof Ship).toBeTruthy();
  expect(battleship.name).toBe("Battleship");
  expect(battleship.isSunk()).toBeFalsy();

  for (let i = 0; i < 4; i++) {
    battleship.hit();
  }

  expect(battleship.isSunk()).toBeTruthy();
});

test("throws error when hit after sinking", () => {
  const ship = new Ship("Patrol", 1);
  ship.hit();
  expect(() => ship.hit()).toThrow();
});
