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
 * @file index.js
 * @author Jagdeep Sidhu <jsidhu@blockchainfoundry.co>
 * @date 2020
 */

"use strict";

var core = require('web3-core');
var Method = require('web3-core-method');
var helpers = require('web3-btc-core-helpers');

var Net = function () {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);


    [
        new Method({
            name: 'getId',
            call: 'getblockchaininfo',
            params: 0,
            outputFormatter: helpers.formatters.outputChainIdFormatter
        }),
        new Method({
            name: 'isListening',
            call: 'getconnectioncount',
            params: 0,
            outputFormatter: helpers.formatters.outputIsListeningFormatter
        }),
        new Method({
            name: 'getPeerCount',
            call: 'getconnectioncount',
            params: 0
        })
    ].forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager);
    });

};

core.addProviders(Net);


module.exports = Net;


