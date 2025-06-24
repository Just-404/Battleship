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

test("throws error on overlapping ships", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship("ship1", 2);
  const ship2 = new Ship("ship2", 2);
  gameboard.placeShip([5, 5], ship1, 1);
  expect(() => gameboard.placeShip([5, 5], ship2, 1)).toThrow();
});

test("throws error if placement goes out of bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship("ship", 4);
  expect(() => gameboard.placeShip([8, 9], ship, 1)).toThrow();
});

test("receiveAttack registers a hit and miss", () => {
  const gameboard = new Gameboard();
  const ship = new Ship("Destroyer", 2);
  gameboard.placeShip([1, 1], ship, 1);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(5, 5);
  expect(ship.hitsCount).toBe(1);
  expect(gameboard.getTrackingGrid()[1][1]).toBe(1);
  expect(gameboard.getTrackingGrid()[5][5]).toBe(0);
});

test("isGameover returns true after sinking 5 ships", () => {
  const gameboard = new Gameboard();
  for (let i = 0; i < 5; i++) {
    const ship = new Ship(`Ship${i}`, 1);
    gameboard.placeShip([i, 0], ship, 0);
    gameboard.receiveAttack(i, 0);
  }
  expect(gameboard.isGameover()).toBe(true);
});
