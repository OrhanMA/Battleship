import { Player } from "./player";
import { Board } from "./board";
import { ComputerInterface } from "../types";
import { markCellAsHit } from "../dom_functions";

/**
 * Computer class
 * @param {Board} board - the computer's board
 * @param {Array<Array<string>>} playedMoves - the moves the computer has played
 * @returns {Computer} - the computer object
 * @description - the computer object that inherits from the Player class
 */
export class Computer extends Player implements ComputerInterface {
  constructor(board: Board, playedMoves: string[][]) {
    super(board, playedMoves);
  }

  /**
   * playRandomMove function
   * @param ennemyBoard
   * @returns {void}
   * @description - play a random move on the ennemy board
   */
  playRandomMove(ennemyBoard: Board) {
    // get a random move from the legalMoves array
    const randomMove =
      this.legalMoves[Math.floor(Math.random() * this.legalMoves.length)];
    this.removeLegalMove(randomMove[0], randomMove[1]);
    this.addPlayedMove(randomMove[0], randomMove[1]);
    ennemyBoard.receiveAttack(randomMove[0], randomMove[1]);

    if (this.board.allShipsSunk()) {
      alert("You lost");
    }

    markCellAsHit(randomMove[0], randomMove[1], "player");
  }
}
