import { Player } from "./player";
import { Computer } from "./computer";

/**
 * Game class
 * @param {Player} player - the player object
 * @param {Computer} computer - the computer object
 * @returns {Game} - the game object
 * @description - the game object
 * @example const game = new Game(player, computer) // create a new game
 */
export class Game {
  player: Player;
  computer: Computer;
  constructor(player: Player, computer: Computer) {
    this.player = player;
    this.computer = computer;
  }

  /**
   * createBoard function
   * @param owner - the owner of the board
   * @returns {void}
   * @description - create a board in the DOM
   */
  createBoard(owner: string) {
    // get the board div in the DOM
    const board = document.getElementById(owner);
    if (board) {
      for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
          // create a div for each cell
          const cell = document.createElement("div");
          // add the cell class to each cell
          cell.classList.add("cell");
          // add the owner, empty and hit dataset to each cell
          cell.dataset.owner = owner;
          cell.dataset.empty = "true";
          cell.dataset.hit = "false";
          // add the coordinates id to each cell
          cell.id = `${String.fromCharCode(64 + row)}${col}`;

          // Check if the cell is part of a ship and set border color
          if (owner === "player") {
            const isPlayerShip = this.player.board.ships.some((ship) =>
              ship.coordinates.some(
                (coord) =>
                  coord[0] === String.fromCharCode(64 + row) &&
                  coord[1] === col.toString()
              )
            );

            if (isPlayerShip) {
              cell.style.border = "1px solid blue";
              cell.dataset.empty = "false";
            }
          } else if (owner === "computer") {
            const isComputerShip = this.computer.board.ships.some((ship) =>
              ship.coordinates.some(
                (coord) =>
                  coord[0] === String.fromCharCode(64 + row) &&
                  coord[1] === col.toString()
              )
            );

            if (isComputerShip) {
              cell.style.border = "1px solid red";
              cell.dataset.empty = "false";
            }
          }

          board.appendChild(cell);
        }
      }
    }
  }
}
