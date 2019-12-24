/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.d.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');

export type Mixed =
    | string
    | number
    | BN
    | {
          type: string;
          value: string;
      }
    | {
          t: string;
          v: string | BN | number;
      }
    | boolean;

export type Hex = string | number;

// utils types
export function isAddress(address: string): boolean;
export function fromSatoshi(value: string | BN): string;
export function toSatoshi(val: BN): BN;
export function toSatoshi(val: string): string;

// interfaces
export interface Utils {
    isAddress(address: string): boolean;
    fromSatoshi(value: string | BN): string;
    toSatoshi(val: BN): BN;
    toSatoshi(val: string): string;
}
