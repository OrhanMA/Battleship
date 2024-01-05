import { Board } from "./classes/board";
import { Computer } from "./classes/computer";
import { changeTurn } from "./main";
import { playerBoard, computerBoard } from "./main";
/**
 * transformIdToCoordinates function
 * @param id - the id of the cell
 * @returns {Array<string>} - the coordinates of the cell
 * @description - transform the id of the cell into coordinates
 * @example transformIdToCoordinates("A1") // ["A","1"]
 */
export function transformIdToCoordinates(id: string) {
  const coordinates = id.split("");
  const x = coordinates[0];
  const y = coordinates[1];
  return [x, y];
}

/**
 * autoComputerPlay function
 * @param computer  - the computer object
 * @param playerBoard  - the player's board
 * @returns {void}
 * @description - play a random move for the computer
 */
export function autoComputerPlay(computer: Computer, playerBoard: Board) {
  setTimeout(() => {
    computer.playRandomMove(playerBoard);
    changeTurn(true);
    if (playerBoard.allShipsSunk()) {
      alert("You lost");
    }
  }, 1000);
}

/**
 * generateLegalMoves function
 * @returns {Array<Array<string>>} - the legal moves
 * @description - generate the legal moves for the 100 cells of the board
 * @example [["A","1"]...["J","10"]
 */
export function generateLegalMoves(): string[][] {
  const legalMoves: string[][] = [];

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const coordinates = [String.fromCharCode(64 + row), col.toString()];
      legalMoves.push(coordinates);
    }
  }

  return legalMoves;
}

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

export function placeDefaultShips() {
  for (let i = 0; i < 3; i++) {
    playerBoard.placeShip(defaultShips[i].coordinates, defaultShips[i].length);
    computerBoard.placeShip(
      defaultShips[i].coordinates,
      defaultShips[i].length
    );
  }
}
