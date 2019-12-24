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
 * @file getNetworkType.js
 * @author Jagdeep Sidhu <jsidhu@blockchainfoundry.co>
 * @date 2020
 */

"use strict";

var _ = require('underscore');

var getNetworkType = function (callback) {
    var _this = this,
        id;

    return this.net.getId()
        .then(function (givenId) {

            id = givenId;
            var returnValue = 'private';

            if (id === 1) {
                returnValue = 'main';
            }
            if (id === 2) {
                returnValue = 'testnet';
            }
            if (id === 3) {
                returnValue = 'regtest';
            }

            if (_.isFunction(callback)) {
                callback(null, returnValue);
            }

            return returnValue;
        })
        
        .catch(function (err) {
            if (_.isFunction(callback)) {
                callback(err);
            } else {
                throw err;
            }
        });
};

module.exports = getNetworkType;
