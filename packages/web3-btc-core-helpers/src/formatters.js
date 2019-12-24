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
 * @file formatters.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Marek Kotewicz <marek@parity.io>
 * @date 2017
 */

"use strict";

var _ = require('underscore');
var utils = require('web3-btc-utils');



/**
 * Should the format output to a big number
 *
 * @method outputBigNumberFormatter
 *
 * @param {String|Number|BigNumber|BN} number
 *
 * @returns {BN} object
 */
var outputBigNumberFormatter = function (number) {
    return utils.toBN(number).toString(10);
};


var outputChainIdFormatter = function (blockchaininfo) {
    if(blockchaininfo.chain === 'main'){
        return 1;
    }
    else if(blockchaininfo.chain === 'test'){
        return 2;
    }
    else if(blockchaininfo.chain === 'regtest'){
        return 3;
    }
};

var outputIsListeningFormatter = function (connectioncount) {
    return connectioncount > 0;
};


var inputAddressFormatter = function (address) {
    if (utils.isAddress(address)) {
        return address;
    }
    throw new Error('Provided address "' + address + '" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can\'t be converted.');
};



module.exports = {
    inputAddressFormatter: inputAddressFormatter,
    outputChainIdFormatter: outputChainIdFormatter,
    outputBigNumberFormatter: outputBigNumberFormatter,
    outputIsListeningFormatter: outputIsListeningFormatter
};

