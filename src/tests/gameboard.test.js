import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";
test("takes a ship object", () => {
  const gameboard = new Gameboard();

  expect(gameboard instanceof Gameboard).toBeTruthy();

  const ownGrid = gameboard.getOwnGrid();

  expect(ownGrid.length).toBe(10);
  ownGrid.forEach((row) => {
    expect(row.length).toBe(10);
  });

  expect(() =>
    gameboard
      .placeShip([
        [0, 0],
        [2, 3],
        [1, 2],
      ])
      .toThrow()
  );

  expect(gameboard.isGameover()).toBeFalsy();
});

test("places a ship on the board correctly", () => {
  const gameboard = new Gameboard();
  const ship = new Ship("Destroyer", 3);
  gameboard.placeShip([0, 0], ship, 1);
  const grid = gameboard.getOwnGrid();
  expect(grid[0][0]).toBe(ship);
  expect(grid[0][1]).toBe(ship);
  expect(grid[0][2]).toBe(ship);
});
