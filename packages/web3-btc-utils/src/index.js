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
 * @file utils.js
 * @author Marek Kotewicz <marek@parity.io>
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */


var _ = require('underscore');
var utils = require('./utils.js');
var SATOSHI = 100000000;


/**
 * Takes a number of satoshi and converts it to coin value
 *
 *
 * @method fromSatoshi
 * @param {Number|String} number can be a number or number string
 * @return {String|Object} When given a BN object it returns one as well, otherwise a number
 */
var fromSatoshi = function(number) {

    if(!utils.isBN(number) && !_.isString(number)) {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    var value = utils.toBN(number).div(SATOSHI);
    return utils.isBN(number) ? value : value.toString(10);
};

/**
 * Takes a number converts it to satoshi.
 *
 * @method toSatoshi
 * @param {Number|String|BN} number can be a number or number string
 * @return {String|Object} When given a BN object it returns one as well, otherwise a number
 */
var toSatoshi = function(number) {

    if(!utils.isBN(number) && !_.isString(number)) {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    var satoshis = utils.toBN(number).mul(SATOSHI);
    return utils.isBN(number) ? satoshis :satoshis.toString(10);
};




module.exports = {
    _: _,
    isAddress: utils.isAddress,
    toSatoshi: toSatoshi,
    fromSatoshi: fromSatoshi
};

