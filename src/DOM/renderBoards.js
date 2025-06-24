import Ship from "../classes/Ship";

const renderInitialBoards = (ownBoard) => {
  const boards = document.querySelectorAll(".battlefield-table");

  boards.forEach((board, boardIdx) => {
    ownBoard.forEach((row, i) => {
      const tr = document.createElement("tr");

      for (let j = 0; j < row.length; j++) {
        const td = document.createElement("td");
        const cell = document.createElement("div");
        cell.dataset.x = i;
        cell.dataset.y = j;

        let className = "table-cell";
        if (row[j] instanceof Ship && boardIdx !== 1) className = "ship";

        cell.classList.add(className);
        td.appendChild(cell);
        tr.appendChild(td);
      }

      board.appendChild(tr);
    });
  });
};

export { renderInitialBoards };
