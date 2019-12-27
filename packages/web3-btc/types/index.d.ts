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
 * @author Samuel Furter <samuel@ethereum.org>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018
 */

import * as net from 'net';
import {
    BatchRequest,
    Extension,
    PromiEvent,
    provider,
    Providers,
    Common,
    chain,
    BlockNumber
} from 'web3-btc-core';
import {Subscription} from 'web3-core-subscriptions';
import {Accounts} from 'web3-btc-accounts';
import {Personal} from 'web3-btc-personal';
import {Network} from 'web3-btc-net';
import {BigNumber} from 'bignumber.js';
import BN = require('bn.js');

export {
    Common,
    chain
} from 'web3-btc-core';

export class Btc {
    constructor();
    constructor(provider: provider);
    constructor(provider: provider, net: net.Socket);

    personal: Personal;
    accounts: Accounts;
    net: Network;

    readonly givenProvider: any;
    static readonly givenProvider: any;
    defaultAccount: string | null;
    defaultBlock: BlockNumber;
    defaultCommon: Common;
    defaultChain: chain;
    transactionPollingTimeout: number;
    transactionConfirmationBlocks: number;
    transactionBlockTimeout: number;
    readonly currentProvider: provider;

    setProvider(provider: provider): boolean;

    BatchRequest: new () => BatchRequest;
    static readonly providers: Providers;

    extend(extension: Extension): any;

    clearSubscriptions(callback: (error: Error, result: boolean) => void): void;

    subscribe(
        type: 'syncing',
        callback?: (error: Error, result: Syncing) => void
    ): Subscription<Syncing>;
    subscribe(
        type: 'newBlockHeaders',
        callback?: (error: Error, blockHeader: string) => void
    ): Subscription<string>;
    subscribe(
        type: 'pendingTransactions',
        callback?: (error: Error, transactionHash: string) => void
    ): Subscription<string>;

    getProtocolVersion(
        callback?: (error: Error, protocolVersion: string) => void
    ): Promise<string>;

    isSyncing(
        callback?: (error: Error, syncing: Syncing) => void
    ): Promise<Syncing | boolean>;

    getHashrate(
        callback?: (error: Error, hashes: number) => void
    ): Promise<number>;

    getNodeInfo(
        callback?: (error: Error, version: string) => void
    ): Promise<string>;

    getAccounts(
        callback?: (error: Error, accounts: string[]) => void
    ): Promise<string[]>;

    getBlockNumber(
        callback?: (error: Error, blockNumber: number) => void
    ): Promise<number>;

    getBalance(
        address: string
    ): Promise<string>;
    getBalance(
        address: string,
        callback?: (error: Error, balance: string) => void
    ): Promise<string>;

    getBlock(blockHash: string): Promise<string>;
    getBlock(
        blockHash: string,
        callback?: (error: Error, block: string) => void
    ): Promise<string>;


    getTransaction(
        transactionHash: string,
        callback?: (error: Error, transaction: string) => void
    ): Promise<string>;

    sendTransaction(
        transaction: string,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<string>;

    sendSignedTransaction(
        signedTransactionData: string,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<string>;

    sign(
        dataToSign: string,
        address: string | number,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    signTransaction(
        transaction: string,
        callback?: (
            error: Error,
            signedTransaction: string
        ) => void
    ): Promise<string>;
    signTransaction(
        transaction: string,
        address: string
    ): Promise<string>;
    signTransaction(
        transaction: string,
        address: string,
        callback: (
            error: Error,
            signedTransaction: string
        ) => void
    ): Promise<string>;

    call(transaction: string): Promise<string>;
    call(
        transaction: string,
        defaultBlock?: BlockNumber
    ): Promise<string>;
    call(
        transactionConfig: string,
        callback?: (error: Error, data: string) => void
    ): Promise<string>;
    call(
        transactionConfig: string,
        defaultBlock: BlockNumber,
        callback: (error: Error, data: string) => void
    ): Promise<string>;

    requestAccounts(): Promise<string[]>
    requestAccounts(callback: (error: Error, result: string[]) => void): Promise<string[]>
}

export interface Syncing {
    CurrentBlock: number;
    VerificationProgress: number;
}
