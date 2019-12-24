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
var utils = require('web3-utils');
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

var outputSyncingFormatter = function (result) {
    var syncing = {};
    syncing.currentBlock = result.blocks;
    syncing.verificationProgress = result.verificationprogress;
    return syncing;
};
var outputNodeInfoFormatter = function (result) {
    return result.subversion;
};
var outputProtocolVersionFormatter = function (result) {
    return result.protocolversion;
};

var outputHashrateFormatter = function (result) {
    return utils.toBN(result.networkhashps).toString(10);
};



module.exports = {
    outputChainIdFormatter: outputChainIdFormatter,
    outputIsListeningFormatter: outputIsListeningFormatter,
    outputSyncingFormatter: outputSyncingFormatter,
    outputNodeInfoFormatter: outputNodeInfoFormatter,
    outputProtocolVersionFormatter: outputProtocolVersionFormatter,
    outputHashrateFormatter: outputHashrateFormatter
};

