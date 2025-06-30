import Ship from "../classes/Ship";
let draggedShip = null;
let orientation = 1;
let shipsPlacedOnBoard = 0;
const OUTPUT = document.getElementsByTagName("output")[0];

const updateBattlefieldLayout = () => {
  const rivalBoard = document.querySelector(".battlefield-rival");
  const wrapper = document.querySelector(".battlefield-wrapper");
  if (rivalBoard.style.display === "none") {
    wrapper.classList.add("only-own");
  } else {
    wrapper.classList.remove("only-own");
  }
};
const openDock = () => {
  const dock = document.querySelector(".dock");
  const rivalBoard = document.querySelector(".battlefield-rival");
  const configDiv = document.querySelector(".config");
  configDiv.style.display = "none";

  rivalBoard.style.display = "none";
  dock.style.display = "flex";
  updateBattlefieldLayout();
};

const closeDock = () => {
  const dock = document.querySelector(".dock");
  const rivalBoard = document.querySelector(".battlefield-rival");
  const configDiv = document.querySelector(".config");

  configDiv.style.display = "flex";
  rivalBoard.style.display = "grid";
  dock.style.display = "none";
  shipsPlacedOnBoard = 0;
  updateBattlefieldLayout();
};

const addShipInDock = (ship) => {
  const dock = document.querySelector(".dock");

  const newShip = document.createElement("div");
  newShip.classList.add("docked-ship");
  newShip.draggable = true;
  newShip.dataset.name = ship.name;
  newShip.dataset.length = ship.length;

  const content = document.createElement("span");
  content.classList.add("ship-content");
  content.textContent = ship.name;
  newShip.appendChild(content);

  newShip.style.width = `calc(var(--cell-width) * ${ship.length})`;
  dock.appendChild(newShip);
};

const dragShips = () => {
  const dockShips = document.querySelectorAll(".docked-ship");

  dockShips.forEach((ship) => {
    ship.dataset.orientation = orientation;

    ship.addEventListener("dragstart", () => {
      draggedShip = {
        name: ship.dataset.name,
        length: Number(ship.dataset.length),
        dom: ship,
      };
    });
  });
};

const placeShipHorizontally = (
  ship,
  cellWidth,
  cellHeight,
  shipLength,
  firstCell
) => {
  const parent = firstCell.offsetParent;
  ship.style.top = `${firstCell.offsetTop}px`;
  ship.style.left = `${firstCell.offsetLeft}px`;
  parent.appendChild(ship);

  ship.style.width = `${cellWidth * shipLength}px`;
  ship.style.height = `${cellHeight}px`;
};

const placeShipVertically = (
  ship,
  cellWidth,
  cellHeight,
  shipLength,
  firstCell
) => {
  const parent = firstCell.offsetParent;
  ship.style.top = `${firstCell.offsetTop}px`;
  ship.style.left = `${firstCell.offsetLeft}px`;
  parent.appendChild(ship);

  ship.style.width = `${cellWidth}px`;
  ship.style.height = `${cellHeight * shipLength}px`;
};

const rotateShip = (ship, cellWidth, cellHeight, shipLength, firstCell) => {
  const orientation = ship.dataset.orientation == 1 ? 0 : 1;
  ship.dataset.orientation = orientation;
  if (orientation === 0) {
    ship.classList.add("vertical");
    placeShipVertically(ship, cellWidth, cellHeight, shipLength, firstCell);
  } else {
    ship.classList.remove("vertical");
    placeShipHorizontally(ship, cellWidth, cellHeight, shipLength, firstCell);
  }
};

const placeShipOnBoard = (x, y, ship, rotateShipCb) => {
  const firstCell = document.querySelector(
    `.battlefield-own .table-cell[data-x="${x}"][data-y="${y}"]`
  );
  const cellWidth = firstCell.offsetWidth;

  const cellHeight = firstCell.offsetHeight;

  draggedShip.dom.style.position = "absolute";
  draggedShip.dom.style.zIndex = "1000";
  draggedShip.dom.classList.add("placed-ship");
  draggedShip.dom.classList.remove("docked-ship");
  draggedShip.dom.removeAttribute("draggable");

  draggedShip.dom.ondragstart = (e) => e.preventDefault();
  draggedShip.dom.addEventListener("click", (e) => {
    try {
      rotateShipCb(ship);
      rotateShip(
        e.currentTarget,
        cellWidth,
        cellHeight,
        ship.length,
        firstCell
      );
    } catch (error) {
      OUTPUT.textContent = error.message;
    }
  });

  placeShipHorizontally(
    draggedShip.dom,
    cellWidth,
    cellHeight,
    ship.length,
    firstCell
  );

  shipsPlacedOnBoard++;
};

const dropShips = (placeShipCb, initOwnBoardCb, rotateShipCb) => {
  const cells = document.querySelectorAll(".battlefield-own .table-cell");

  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
    cell.addEventListener("dragenter", () => cell.classList.add("drag-hover"));
    cell.addEventListener("dragleave", () =>
      cell.classList.remove("drag-hover")
    );

    cell.addEventListener("drop", (e) => {
      if (!draggedShip) return;
      const x = Number(e.currentTarget.dataset.x);
      const y = Number(e.currentTarget.dataset.y);
      const orientation = Number(draggedShip.dom.dataset.orientation);

      const ship = new Ship(draggedShip.name, draggedShip.length);

      try {
        placeShipCb([x, y], ship, orientation);

        placeShipOnBoard(x, y, ship, rotateShipCb);

        if (shipsPlacedOnBoard === 5) {
          closeDock();
          initOwnBoardCb();
        }
        cell.classList.remove("drag-hover");

        draggedShip = null;
      } catch (error) {
        OUTPUT.textContent = error.message;
        cell.classList.remove("drag-hover");
      }
    });
  });
};
export { dragShips, dropShips, openDock, closeDock, addShipInDock };
