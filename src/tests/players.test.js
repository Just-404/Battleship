import Player from "../classes/Player";
import ComputerPlayer from "../classes/ComputerPlayer";
import Gameboard from "../classes/Gameboard";
import Ship from "../classes/Ship";

test("Players have gameboards", () => {
  const player = new Player("Joe");
  const computer = new ComputerPlayer("Computer");
  expect(player.name).toBe("Joe");
  expect(player.gameboard).toBeInstanceOf(Gameboard);
  expect(computer.name).toBe("Computer");
  expect(computer.gameboard).toBeInstanceOf(Gameboard);
});

test("ComputerPlayer generates random unique attacks", () => {
  const computer = new ComputerPlayer("Computer");
  const seen = new Set();

  for (let i = 0; i < 100; i++) {
    const [x, y] = computer.generateAttackingCoords();
    const key = `${x}-${y}`;
    expect(seen.has(key)).toBe(false);
    seen.add(key);
  }
});

test("Ships are created correctly", () => {
  const player = new Player("Joe");
  expect(player.ships.length).toBe(5);
  expect(player.ships[0].name).toBe("Destroyer");
  expect(player.ships[4].length).toBe(5);

  const grid = player.gameboard.getOwnGrid();
  expect(grid[0][0] instanceof Ship).toBeTruthy();
});
