import { expect, test } from "vitest";
import { Board } from "../classes/board";

test("placeShip function should add a ship to the ships array", () => {
  // Arrange
  const board = new Board();

  // Act
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );

  // Assert
  expect(board.ships.length).toBe(1);
});

test("receiveAttack function should add a missed attack to the missed attacks array if the attack misses", () => {
  // Arrange
  const board = new Board();

  // Act
  board.receiveAttack("A", "1");

  // Assert
  expect(board.missedAttacks.length).toBe(1);
});

test("receiveAttack function should call the ship's hit function if the attack hits a ship", () => {
  // Arrange
  const board = new Board();
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );

  // Act
  board.receiveAttack("A", "1");

  // Assert
  expect(board.ships[0].hits).toBe(1);
});

test("allShipsSunk function should return true if all ships are sunk", () => {
  // Arrange
  const board = new Board();
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );
  board.receiveAttack("A", "1");
  board.receiveAttack("A", "2");
  board.receiveAttack("A", "3");
  board.receiveAttack("A", "4");
  board.receiveAttack("A", "5");

  // Act
  const result = board.allShipsSunk();

  // Assert
  expect(result).toBe(true);
});

test("allShipsSunk function should return false if all ships are not sunk", () => {
  // Arrange
  const board = new Board();
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );
  board.receiveAttack("A", "1");
  board.receiveAttack("A", "2");
  board.receiveAttack("A", "3");
  board.receiveAttack("A", "4");

  // Act
  const result = board.allShipsSunk();

  // Assert
  expect(result).toBe(false);
});

test("getMissedAttacks function should return the missed attacks array", () => {
  // Arrange
  const board = new Board();
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );

  // A7 does not hit the ship
  board.receiveAttack("A", "7");

  // Act
  const result = board.getMissedAttacks();

  // Assert
  expect(result.length).toBe(1);
  expect(result[0]).toEqual(["A", "7"]);
});

test("addMissedAttack function should add a missed attack to the missed attacks array", () => {
  // Arrange
  const board = new Board();
  board.placeShip(
    [
      ["A", "1"],
      ["A", "2"],
      ["A", "3"],
      ["A", "4"],
      ["A", "5"],
    ],
    5
  );

  // Act
  board.addMissedAttack("A", "7");

  // Assert
  expect(board.missedAttacks.length).toBe(1);
});
