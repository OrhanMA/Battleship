import { expect, test } from "vitest";
import { Ship } from "../classes/ship";

test("hit function should increment the hits property of the ship", () => {
  // Arrange
  const ship = new Ship(5, 0, false, []);

  // Act
  ship.hit();

  // Assert
  expect(ship.hits).toBe(1);
});

test("hit function should not increment the hits property of the ship if the ship is sunk", () => {
  // Arrange
  const ship = new Ship(5, 5, true, []);

  // Act
  ship.hit();

  // Assert
  expect(ship.hits).toBe(5);
  expect(ship.sunk).toBe(true);
});

test("isSunk function should return true if the ship is sunk", () => {
  // Arrange
  const ship = new Ship(5, 5, true, []);

  // Act
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(true);
});

test("isSunk function should return false if the ship is not sunk", () => {
  // Arrange
  const ship = new Ship(5, 4, false, []);

  // Act
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(false);
});

test("isSunk function should return true if the ship is sunk after getting hit", () => {
  // Arrange
  const ship = new Ship(5, 4, false, []);

  // Act
  ship.hit();
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(true);
});

test("isSunk function should not return false if the ship is not sunk after getting hit", () => {
  // Arrange
  const ship = new Ship(5, 3, false, []);

  // Act
  ship.hit();
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(false);
});

test("isSunk function should return true if the ship is sunk after getting hit 5 times", () => {
  // Arrange
  const ship = new Ship(5, 0, false, []);

  // Act
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(true);
});

test("isSunk function should return false if the ship is not sunk after getting hit 4 times", () => {
  // Arrange
  const ship = new Ship(5, 0, false, []);

  // Act
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  const result = ship.isSunk();

  // Assert
  expect(result).toBe(false);
});

test("getCoordinates function should return the coordinates of the ship", () => {
  // Arrange
  const ship = new Ship(5, 0, false, [
    ["A", "1"],
    ["A", "2"],
    ["A", "3"],
    ["A", "4"],
    ["A", "5"],
  ]);

  // Act
  const result = ship.getCoordinates();

  // Assert
  expect(result).toEqual([
    ["A", "1"],
    ["A", "2"],
    ["A", "3"],
    ["A", "4"],
    ["A", "5"],
  ]);
});
