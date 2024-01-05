import { ShipInterface } from "../types";

/**
 * Ship class
 * @param {number} length - the length of the ship
 * @param {number} hits - the number of hits the ship has taken
 * @param {boolean} sunk - whether or not the ship is sunk
 * @param {Array<Array<string>>} coordinates - the coordinates of the ship
 * @returns {Ship} - the ship object
 *
 */
export class Ship implements ShipInterface {
  coordinates: Array<Array<string>> = [];
  length: number;
  hits: number;
  sunk: boolean;

  constructor(
    length: number,
    hits: number,
    sunk: boolean,
    coordinates: Array<Array<string>>
  ) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
    this.coordinates = coordinates;
  }

  /**
   * hit function
   * @returns {void}
   * @description - icrement the number of hits the ship has taken and if ship.hits === ship.length, set ship.sunk to true
   */
  hit() {
    if (this.hits < this.length) {
      this.hits++;
    } else {
      this.sunk = true;
    }
  }

  /**
   * isSunk function
   * @returns {boolean} - whether or not the ship is sunk
   * @description - return true if the ship is sunk, false if it is not
   */
  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }

  /**
   * getCoordinates function
   * @returns {Array<Array<string>>} - the coordinates of the ship
   * @description - return the coordinates of the ship
   */
  getCoordinates() {
    return this.coordinates;
  }
}
