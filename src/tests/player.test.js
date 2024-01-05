import { expect, test } from "vitest";
import { Player, Computer, Board } from "../main";
import { generateLegalMoves, setTurn } from "../main";

test("legal moves should be full when the player object is created", () => {
  const player = new Player("X");

  const legalMoves = generateLegalMoves();
  expect(player.legalMoves.length).toBe(legalMoves.length);
});

test("isMyTurn should return true if it's the player's turn", () => {
  const player = new Player("X");
  expect(player.isMyTurn()).toBe(true);
});

test("isMyTurn should return false if it's the computer's turn", () => {
  const player = new Computer("O");
  setTurn(false);
  expect(player.isMyTurn()).toBe(false);
});

test("addPlayedMove should add the move to the playedMoves array", () => {
  const player = new Player("X");
  player.addPlayedMove("A", "1");
  expect(player.playedMoves).toEqual([["A", "1"]]);
});

test("removeLegalMove should remove the move from the legalMoves array", () => {
  const player = new Player("X");

  // Assuming ["A", "1"] is in the initial legal moves
  const initialLegalMoves = generateLegalMoves();
  expect(player.legalMoves.length).toBe(initialLegalMoves.length);

  // Remove ["A", "1"]
  player.removeLegalMove("A", "1");

  // Filter out ["A", "1"] from the initial legal moves
  const legalMovesWithoutA1 = initialLegalMoves.filter(
    (move) => !(move[0] === "A" && move[1] === "1")
  );

  // Ensure only one move is removed
  expect(player.legalMoves.length).toBe(
    legalMovesWithoutA1.length,
    `Expected length: ${legalMovesWithoutA1.length}, Received length: ${player.legalMoves.length}`
  );
  // Ensure the remaining legal moves are the same
  expect(player.legalMoves).toEqual(legalMovesWithoutA1);
});

test("playRandomMove should play a random move", () => {
  const player = new Computer("O");
  const board = new Board();
  player.playRandomMove(board);
  expect(player.playedMoves.length).toBe(1);
});

test("generateLegalMoves should return an array of all possible moves", () => {
  const legalMoves = generateLegalMoves();
  expect(legalMoves.length).toBe(100);
});
