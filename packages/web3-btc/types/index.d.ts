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
    Transaction,
    TransactionConfig,
    Common,
    chain,
    BlockNumber
} from 'web3-core';
import {Subscription} from 'web3-core-subscriptions';
import {Accounts} from 'web3-btc-accounts';
import {Personal} from 'web3-btc-personal';
import {Network} from 'web3-btc-net';
import {BigNumber} from 'bignumber.js';
import BN = require('bn.js');

export {
    TransactionConfig,
    Transaction,
    Common,
    chain
} from 'web3-core';

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
        callback?: (error: Error, blockHeader: BlockHeader) => void
    ): Subscription<BlockHeader>;
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

    getBlock(blockHashOrBlockNumber: BlockNumber | string): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: true
    ): Promise<BlockTransactionObject>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        callback?: (error: Error, block: BlockTransactionString) => void
    ): Promise<BlockTransactionString>;
    getBlock(
        blockHashOrBlockNumber: BlockNumber | string,
        returnTransactionObjects: true,
        callback?: (error: Error, block: BlockTransactionObject) => void
    ): Promise<BlockTransactionObject>;


    getTransaction(
        transactionHash: string,
        callback?: (error: Error, transaction: Transaction) => void
    ): Promise<Transaction>;

    sendTransaction(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<Transaction>;

    sendSignedTransaction(
        signedTransactionData: string,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<Transaction>;

    sign(
        dataToSign: string,
        address: string | number,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    signTransaction(
        transactionConfig: TransactionConfig,
        callback?: (
            error: Error,
            signedTransaction: Transaction
        ) => void
    ): Promise<Transaction>;
    signTransaction(
        transactionConfig: TransactionConfig,
        address: string
    ): Promise<Transaction>;
    signTransaction(
        transactionConfig: TransactionConfig,
        address: string,
        callback: (
            error: Error,
            signedTransaction: Transaction
        ) => void
    ): Promise<Transaction>;

    call(transactionConfig: TransactionConfig): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
        defaultBlock?: BlockNumber
    ): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
        callback?: (error: Error, data: string) => void
    ): Promise<string>;
    call(
        transactionConfig: TransactionConfig,
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

export interface BlockHeader {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    transactionRoot: string;
    timestamp: number | string;
}

// TODO: This interface does exist to provide backwards-compatibility and can get removed on a minor release
export interface Block extends BlockTransactionBase {
    transactions: Transaction[] | string[];
}

export interface BlockTransactionBase extends BlockHeader {
    size: number;
    difficulty: number;
    totalDifficulty: number;
}

export interface BlockTransactionObject extends BlockTransactionBase {
    transactions: Transaction[];
}

export interface BlockTransactionString extends BlockTransactionBase {
    transactions: string[];
}