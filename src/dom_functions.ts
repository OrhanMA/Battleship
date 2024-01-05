import { transformIdToCoordinates } from "./helper_functions";
import { Board } from "./classes/board";
import { Player } from "./classes/player";

/**
 * cellClickHandler function
 * @param e - the event
 * @returns {void}
 * @description - handle the click on a cell
 */
export function cellClickHandler(
  e: Event,
  player: Player,
  computerBoard: Board
) {
  const element = e.target as HTMLDivElement;

  // if the element clicked on is a cell
  if (element.classList.contains("cell")) {
    // if it's not your turn
    if (player.isMyTurn() === false) {
      //alert
      alert("It's not your turn");
    } else {
      // if it's your turn

      // check the cell owner

      // if the cell owner if you
      if (element.dataset.owner === "player") {
        alert("You can't attack your own board");
      } else {
        // if there is a ship on the cell
        if (element.dataset.empty === "false") {
          // if the cell has already been hit
          if (element.dataset.hit === "true") {
            alert("This cell has already been hit. Choose another one");
          } else {
            // if the cell has not been hit yet
            const coordinates = transformIdToCoordinates(element.id);
            player.playMove(coordinates[0], coordinates[1], computerBoard);
          }
        } else {
          // if there is no ship on the cell
          // alert("There is no ship on this cell");
          const coordinates = transformIdToCoordinates(element.id);
          player.playMove(coordinates[0], coordinates[1], computerBoard);
        }
      }
    }
  }
}

/**
 * markCellAsHit function
 * @param x  - the x coordinate
 * @param y  - the y coordinate
 * @param owner - the owner of the cell
 * @returns {void}
 * @description - update and mark a cell as hit in the DOM
 */
export function markCellAsHit(x: string, y: string, owner: string) {
  const cells = document.querySelectorAll(`#${x}${y}`);
  // get the cell that has the owner in element.dataset.owner corresponding to the owner passed as an argument
  const cell = Array.from(cells).find(
    (cell) => (cell as HTMLElement).dataset.owner === owner
  ) as HTMLDivElement;

  if (cell) {
    if (cell.dataset.empty === "false") {
      cell.style.backgroundColor = "red";
      cell.style.color = "black";
    } else {
      cell.style.backgroundColor = "lightgray";
      cell.style.color = "black";
    }
    cell.dataset.hit = "true";
    cell.innerHTML = "X";
  }
}
