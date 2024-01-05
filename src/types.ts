import { Ship, Board } from "./main";

export interface ShipInterface {
  length: number;
  hits: number;
  sunk: boolean;
  hit: () => void;
  isSunk: () => void;
}

export interface BoardInterface {
  missedAttacks: Array<Array<string>>;
  ships: Array<Ship>;
  placeShip: (coorrdinates: Array<Array<string>>, length: number) => void;
  receiveAttack: (x: string, y: string) => void;
  allShipsSunk: () => boolean;
  getMissedAttacks: () => Array<Array<string>>;
  addMissedAttack: (x: string, y: string) => void;
}

export interface PlayerInterface {
  board: Board;
  legalMoves: string[][];
  playedMoves: string[][];
  isMyTurn: () => boolean;
  addPlayedMove: (x: string, y: string) => void;
  removeLegalMove: (x: string, y: string) => void;
  playMove: (x: string, y: string, computerBoard: Board) => void;
}

export interface ComputerInterface extends PlayerInterface {
  playRandomMove: (ennemyBoard: Board) => void;
}
