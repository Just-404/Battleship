import Ship from "../classes/Ship";

const BOARDS = document.querySelectorAll(".battlefield-table");
const PLACEHOLDER_BOARD = document.querySelectorAll(".battlefield-placeholder");

let disabledBoard = 1;

const renderInitialBoard = (ownBoard) => {
  const OWN_BOARD = BOARDS[0];
  OWN_BOARD.replaceChildren();
  PLACEHOLDER_BOARD[0].style.display = "none";
  ownBoard.forEach((row, i) => {
    const tr = document.createElement("tr");

    for (let j = 0; j < row.length; j++) {
      const td = document.createElement("td");
      const cell = document.createElement("div");
      cell.dataset.x = i;
      cell.dataset.y = j;

      let className = "table-cell";
      if (row[j] instanceof Ship) className = "ship";

      cell.classList.add(className);
      td.appendChild(cell);
      tr.appendChild(td);
    }
    OWN_BOARD.style.pointerEvents = "none";
    OWN_BOARD.appendChild(tr);
  });
};

const attackCell = (event, attackCb) => {
  const xCoord = event.currentTarget.dataset.x;
  const yCoord = event.currentTarget.dataset.y;

  const cellAttackValue = attackCb(xCoord, yCoord);
  const cellClassName = cellAttackValue === 0 ? "cell-miss" : "cell-hit";

  event.currentTarget.classList.add(cellClassName);
  event.currentTarget.style.pointerEvents = "none";
};

const computerAttackCell = (x, y, value) => {
  const cellClassName = value === 0 ? "cell-miss" : "cell-hit";
  const cell = document.querySelector(
    `.battlefield-own .battlefield-table tr div[data-x = "${x}"][data-y="${y}"]`
  );
  cell.classList.add(cellClassName);
};

const renderRivalBoard = (rivalBoard, attackCb) => {
  const RIVAL_BOARD = BOARDS[1];

  rivalBoard.forEach((row, i) => {
    const tr = document.createElement("tr");

    for (let j = 0; j < row.length; j++) {
      const td = document.createElement("td");
      const cell = document.createElement("div");
      cell.dataset.x = i;
      cell.dataset.y = j;

      cell.addEventListener("click", (e) => attackCell(e, attackCb));
      let className = "table-cell";
      cell.classList.add(className);
      td.appendChild(cell);
      tr.appendChild(td);
    }

    RIVAL_BOARD.appendChild(tr);
  });

  changeBoards();
  const playBtn = document.getElementById("play-btn");
  playBtn.style.display = "none";
};

const changeBoards = () => {
  const board = PLACEHOLDER_BOARD[disabledBoard];
  board.style.display = "none";
  disabledBoard = disabledBoard === 1 ? 0 : 1;

  PLACEHOLDER_BOARD[disabledBoard].style.display = "flex";
};

const resetGame = (startGameCb) => {
  disabledBoard = 1;
  BOARDS[0].replaceChildren();
  BOARDS[1].replaceChildren();

  PLACEHOLDER_BOARD[disabledBoard].style.display = "flex";
  const playBtn = document.getElementById("play-btn");
  playBtn.style.display = "block";

  startGameCb();
};

const renderEndScreen = (startGameCb) => {
  const dialog = document.getElementById("end-screen");
  dialog.showModal();

  const retryBtn = document.querySelector("#end-screen form button");

  retryBtn.addEventListener("click", () => resetGame(startGameCb), {
    once: true,
  });
};

export {
  renderInitialBoard,
  renderRivalBoard,
  changeBoards,
  computerAttackCell,
  renderEndScreen,
};
