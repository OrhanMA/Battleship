import { PlayerInterface } from "../types";
import { turn, changeTurn, computer, playerBoard } from "../main";
import { Board } from "./board";
import { generateLegalMoves, autoComputerPlay } from "../helper_functions";
import { markCellAsHit } from "../dom_functions";

/**
 * Player class
 * @param {Board} board - the player's board
 * @param {Array<Array<string>>} playedMoves - the moves the player has played
 * @returns {Player} - the player object
 * @description - the player object
 */
export class Player implements PlayerInterface {
  board: Board;
  legalMoves: string[][];
  playedMoves: string[][] = [];
  constructor(board: Board, playedMoves: string[][]) {
    this.board = board;
    this.playedMoves = playedMoves;
    this.playedMoves = [];
    this.legalMoves = generateLegalMoves();
  }

  /**
   * isMyTurn function
   * @returns {boolean} - whether or not it's the player's turn
   * @description - return true if it's the player's turn, false if it's not
   */
  isMyTurn() {
    return turn;
  }

  /**
   * addPlayedMove function
   * @param x  - the x coordinate
   * @param y  - the y coordinate
   * @returns {void}
   * @description - add a move to the playedMoves array
   */
  addPlayedMove(x: string, y: string) {
    this.playedMoves.push([x, y]);
  }

  /**
   * removeLegalMove function
   * @param x  - the x coordinate
   * @param y  - the y coordinate
   * @returns {void}
   * @description - remove a move from the legalMoves array
   */
  removeLegalMove(x: string, y: string) {
    this.legalMoves = this.legalMoves.filter(
      (move) => !(move[0] === x && move[1] === y)
    );
  }

  /**
   * playMove function
   * @param x  - the x coordinate
   * @param y  - the y coordinate
   * @param computerBoard
   * @returns {void}
   * @description - play a move on the computer's board, remove the move from the legalMoves array, add the move to the playedMoves array
   */
  playMove(x: string, y: string, computerBoard: Board) {
    const isLegalMove = this.legalMoves.some(
      (move) => move[0] === x && move[1] === y
    );
    if (isLegalMove) {
      this.removeLegalMove(x, y);
      this.addPlayedMove(x, y);
      computerBoard.receiveAttack(x, y);
      changeTurn(false);
      if (computerBoard.allShipsSunk()) {
        alert("You won");
      } else {
        autoComputerPlay(computer, playerBoard);
      }
      markCellAsHit(x, y, "computer");
    } else {
      alert("This move is not a legal move");
    }
  }
}
