"use strict";
import { Player } from "./classes/player.ts";
import { Computer } from "./classes/computer.ts";
import { Board } from "./classes/board.ts";
import "./style.css";
import { cellClickHandler } from "./dom_functions.ts";
import { Game } from "./classes/game.ts";

/**
 * turn variable
 * @type {boolean}
 * @description - true = player 1, false = computer
 */
export let turn = true;
export const playerBoard = new Board();
export const computerBoard = new Board();

/**
 * changeTurn function
 * @param value - the value to set turn to
 * @returns {void}
 * @description - set the turn to the value passed as an argument
 * @example changeTurn(true) // set the turn to player 1
 * @example changeTurn(false) // set the turn to player 2
 */
export function changeTurn(value: boolean) {
  turn = value;
  const turnDiv = document.querySelector(".turn");
  if (turn && turnDiv) {
    turnDiv.innerHTML = "Your turn";
  } else if (!turn && turnDiv) {
    turnDiv.innerHTML = "Computer's turn";
  }
}

/**
 * player, computer and game objects
 * @type {Player, Computer, Game}
 * @description - the player, computer and game objects
 */
export const player = new Player(playerBoard, []);
export const computer = new Computer(computerBoard, []);
export const game = new Game(player, computer);

/**
 * event listener on DOMContentLoaded
 * @description - create the boards, place the ships and listen for clicks on the cells
 */

document.addEventListener("DOMContentLoaded", () => {
  game.createBoard("player");
  game.createBoard("computer");
  changeTurn(true);
  document.addEventListener("click", (e) => {
    if (computerBoard.allShipsSunk()) {
      alert("You won and can't play anymore");
    } else if (playerBoard.allShipsSunk()) {
      alert("You lost and can't play anymore");
    } else {
      cellClickHandler(e, player, computerBoard);
    }
  });
});

/**
 * defaultShips array
 * @type {Array<object>}
 * @description - the default ships to place on the board
 */
const defaultShips = [
  {
    coordinates: [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    length: 5,
  },
  {
    coordinates: [
      ["B", "1"],
      ["B", "2"],
      ["B", "3"],
      ["B", "4"],
    ],
    length: 4,
  },
  {
    coordinates: [
      ["C", "1"],
      ["C", "2"],
      ["C", "3"],
    ],
    length: 3,
  },
];

/**
 * for loop
 * @description - place the ships on the board
 */
for (let i = 0; i < 3; i++) {
  playerBoard.placeShip(defaultShips[i].coordinates, defaultShips[i].length);
  computerBoard.placeShip(defaultShips[i].coordinates, defaultShips[i].length);
}
