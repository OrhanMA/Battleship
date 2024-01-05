import { BoardInterface } from "../types";
import { Ship } from "./ship";

/**
 * Board class
 * @param {Array<Array<string>>} missedAttacks - the missed attacks
 * @param {Array<Ship>} ships - the ships
 * @returns {Board} - the board object
 * @description - the board object
 */
export class Board implements BoardInterface {
  missedAttacks: string[][] = [];
  ships: Ship[] = [];

  /**
   * placeShip function
   * @param coordinates
   * @returns {void}
   * @description - place a ship on the board
   */
  placeShip(coordinates: Array<Array<string>>, length: number) {
    const ship = new Ship(length, 0, false, coordinates);
    this.ships.push(ship);
  }

  /**
   * receiveAttack function
   * @param x - the x coordinate
   * @param y - the y coordinate
   * @returns {void}
   * @description - receive an attack on the board. If the attack hits a ship, call the ship's hit function. If the attack misses, add the coordinates of the missed attack to the missed attacks array
   */
  receiveAttack(x: string, y: string) {
    // variable to update if the attack hits a ship in the loop below
    let hit: boolean = false;
    // determine if the attack hit a ship or not
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].coordinates.length; j++) {
        if (this.ships[i].coordinates[j][0] === x) {
          if (this.ships[i].coordinates[j][1] === y) {
            // if a ship is hit, call the ship's hit function, set hit to true, and break out of the loop
            this.ships[i].hit();
            hit = true;
            break;
          }
        }
      }
    }
    // if the attack misses, add the coordinates of the missed attack to the missed attacks array
    if (!hit) {
      this.addMissedAttack(x, y);
    }
  }

  /**
   * allShipsSunk function
   * @returns {boolean} - whether or not all ships are sunk
   * @description - return true if all ships are sunk, false if not
   */
  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }

  /**
   * getMissedAttacks function
   * @returns {Array<Array<string>>} - the missed attacks
   * @description - return the missed attacks
   */
  getMissedAttacks() {
    return this.missedAttacks;
  }

  /**
   * addMissedAttack function
   * @param x - the x coordinate
   * @param y - the y coordinate
   * @returns {void}
   * @description - add a missed attack to the missed attacks array
   */
  addMissedAttack(x: string, y: string) {
    this.missedAttacks.push([x, y]);
  }
}
