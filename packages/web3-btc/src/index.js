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
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Jagdeep Sidhu <jsidhu@blockchainfoundry.co>
 * @date 2017-2020
 */

"use strict";

var _ = require('underscore');
var core = require('web3-core');
var helpers = require('web3-btc-core-helpers');
var helpersEth = require('web3-core-helpers');
var Subscriptions = require('web3-core-subscriptions').subscriptions;
var Method = require('web3-core-method');
var utils = require('web3-btc-utils');
var Net = require('web3-btc-net');

var Personal = require('web3-btc-personal');
var Accounts = require('web3-btc-accounts');

var getNetworkType = require('./getNetworkType.js');
var formatter = helpers.formatters;
var formatterEth = helpersEth.formatters;


var Btc = function Btc() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);
    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
    };

    var network = arguments[1];
    var defaultAccount = null;
    var defaultBlock = 'latest';
    var transactionBlockTimeout = 50;
    var transactionConfirmationBlocks = 6;
    var transactionPollingTimeout = 750;
    var defaultChain, defaultCommon;

    Object.defineProperty(this, 'defaultCommon', {
        get: function () {
            return defaultCommon;
        },
        set: function (val) {
            defaultCommon = val;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultCommon = defaultCommon;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultChain', {
        get: function () {
            return defaultChain;
        },
        set: function (val) {
            defaultChain = val;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultChain = defaultChain;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionPollingTimeout', {
        get: function () {
            return transactionPollingTimeout;
        },
        set: function (val) {
            transactionPollingTimeout = val;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionPollingTimeout = transactionPollingTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionConfirmationBlocks', {
        get: function () {
            return transactionConfirmationBlocks;
        },
        set: function (val) {
            transactionConfirmationBlocks = val;
            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionConfirmationBlocks = transactionConfirmationBlocks;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionBlockTimeout', {
        get: function () {
            return transactionBlockTimeout;
        },
        set: function (val) {
            transactionBlockTimeout = val;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionBlockTimeout = transactionBlockTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val && utils.isAddress(val, _this.network)) {
                defaultAccount = val;
            }

            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    this.clearSubscriptions = _this._requestManager.clearSubscriptions;

    // add net
    this.net = new Net(this.currentProvider);
    // add chain detection
    this.net.getNetworkType = getNetworkType.bind(this);

    // add accounts
    this.accounts = new Accounts(this.currentProvider);

    // add personal
    this.personal = new Personal(this.currentProvider);
    this.personal.defaultAccount = this.defaultAccount;

    // create a proxy Contract type for this instance, as a Contract's provider
    // is stored as a class member rather than an instance variable. If we do
    // not create this proxy type, changing the provider in one instance of
    // web3-eth would subsequently change the provider for _all_ contract
    // instances!
    var self = this;
    var Contract = function Contract() {
        BaseContract.apply(this, arguments);

        // when Eth.setProvider is called, call packageInit
        // on all contract instances instantiated via this Eth
        // instances. This will update the currentProvider for
        // the contract instances
        var _this = this;
        var setProvider = self.setProvider;
        self.setProvider = function() {
          setProvider.apply(self, arguments);
          core.packageInit(_this, [self.currentProvider]);
        };
    };

    Contract.setProvider = function() {
        BaseContract.setProvider.apply(this, arguments);
    };


    var methods = [
        new Method({
            name: 'getNodeInfo',
            call: 'getnetworkinfo',
            params: 0,
            outputFormatter: formatter.outputNodeInfoFormatter
        }),
        new Method({
            name: 'getProtocolVersion',
            call: 'getnetworkinfo',
            params: 0,
            outputFormatter: formatter.outputProtocolVersionFormatter
        }),
        new Method({
            name: 'getAccounts',
            call: 'eth_accounts',
            params: 0
        }),
        new Method({
            name: 'getBlockNumber',
            call: 'getblockcount',
            params: 0
        }),
        new Method({
            name: 'isSyncing',
            call: 'getblockchaininfo',
            params: 0,
            outputFormatter: formatter.outputSyncingFormatter
        }),
        new Method({
            name: 'getHashrate',
            call: 'getmininginfo',
            params: 0,
            outputFormatter: formatter.outputHashrateFormatter
        }),
        new Method({
            name: 'getBalance',
            call: 'addressbalance',
            params: 1,
            inputFormatter: [function(address) {
                if (utils.isAddress(address, _this.network)) {
                    return address;
                } else {
                    throw new Error('Address ' + address + ' is not a valid address to get "addressbalance".');
                }
            }],
            outputFormatter: formatterEth.outputBigNumberFormatter
        }),
        new Method({
            name: 'getBlock',
            call: 'getblock',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'getTransaction',
            call: 'getrawtransaction',
            params: 1,
            inputFormatter: [null],
        }),
        new Method({
            name: 'sendSignedTransaction',
            call: 'sendrawtransaction',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'signTransaction',
            call: 'signrawtransactionwithwallet',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'sendTransaction',
            call: 'sendrawtransaction',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'sign',
            call: 'signrawtransactionwithkey',
            params: 2,
            inputFormatter: [null, function(address) {
                if (utils.isAddress(address, _this.network)) {
                    return address;
                } else {
                    throw new Error('Address ' + address + ' is not a valid address to sign.');
                }
            }]
        }),

        // subscriptions
        new Subscriptions({
            name: 'subscribe',
            type: 'btc',
            subscriptions: {
                'newBlockHeaders': {
                    // TODO rename on RPC side?
                    subscriptionName: 'newHeads', // replace subscription with this name
                    params: 0
                },
                'pendingTransactions': {
                    subscriptionName: 'newPendingTransactions', // replace subscription with this name
                    params: 0
                },
                'syncing': {
                    params: 0,
                    subscriptionHandler: function (output) {
                        var _this = this;

                        // fire TRUE at start
                        if(this._isSyncing !== true) {
                            this._isSyncing = true;
                            this.emit('changed', _this._isSyncing);

                            if (_.isFunction(this.callback)) {
                                this.callback(null, _this._isSyncing, this);
                            }

                            setTimeout(function () {
                                _this.emit('data', output);

                                if (_.isFunction(_this.callback)) {
                                    _this.callback(null, output, _this);
                                }
                            }, 0);

                            // fire sync status
                        } else {
                            this.emit('data', output);
                            if (_.isFunction(_this.callback)) {
                                this.callback(null, output, this);
                            }

                            // wait for some time before fireing the FALSE
                            clearTimeout(this._isSyncingTimeout);
                            this._isSyncingTimeout = setTimeout(function () {
                                if(output.verificationProgress >= 1) {
                                    _this._isSyncing = false;
                                    _this.emit('changed', _this._isSyncing);

                                    if (_.isFunction(_this.callback)) {
                                        _this.callback(null, _this._isSyncing, _this);
                                    }
                                }
                            }, 500);
                        }
                    }
                }
            }
        })
    ];

    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is btc.accounts (necessary for wallet signing)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
        method.transactionBlockTimeout = _this.transactionBlockTimeout;
        method.transactionConfirmationBlocks = _this.transactionConfirmationBlocks;
        method.transactionPollingTimeout = _this.transactionPollingTimeout;
    });

};

core.addProviders(Btc);


module.exports = Btc;

