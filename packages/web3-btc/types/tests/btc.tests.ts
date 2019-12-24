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
 * @file eth-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018
 */

import {Log} from 'web3-core';
import {
    BlockTransactionObject,
    BlockTransactionString,
    BlockHeader,
    Syncing,
    Transaction,
    TransactionConfig,
    Common,
    chain
} from 'web3-eth';
import BN = require('bn.js');
import BigNumber from 'bignumber.js';

// $ExpectType Btc
const btc_empty = new Btc();

// $ExpectType Eth
const btc = new Btc('http://localhost:8545');

// $ExpectType provider
btc.currentProvider;

// $ExpectType any
btc.givenProvider;

// $ExpectType string | null
btc.defaultAccount;

// $ExpectType BlockNumber
btc.defaultBlock;

// $ExpectType Common
btc.defaultCommon;

// $ExpectType hardfork
btc.defaultHardfork;

// $ExpectType chain
btc.defaultChain;

// $ExpectType number
btc.transactionPollingTimeout;

// $ExpectType number
btc.transactionConfirmationBlocks;

// $ExpectType number
btc.transactionBlockTimeout;

// $ExpectType new (jsonInterface: AbiItem | AbiItem[], address?: string | undefined, options?: ContractOptions | undefined) => Contract
btc.Contract;

// $ExpectType new (iban: string) => Iban
btc.Iban;

// $ExpectType Personal
btc.personal;

// $ExpectType Accounts
btc.accounts;

// $ExpectType any
btc.extend({property: 'test', methods: [{name: 'method', call: 'method'}]});

// $ExpectType Network
btc.net;

// $ExpectType void
btc.clearSubscriptions(() => {});

// $ExpectType Subscription<Syncing>
btc.subscribe('syncing');
// $ExpectType Subscription<Syncing>
btc.subscribe(
    'syncing',
    (error: Error, result: Syncing) => {}
);

// $ExpectType Subscription<BlockHeader>
btc.subscribe('newBlockHeaders');
// $ExpectType Subscription<BlockHeader>
btc.subscribe(
    'newBlockHeaders',
    (error: Error, blockHeader: BlockHeader) => {}
);

// $ExpectType Subscription<string>
btc.subscribe('pendingTransactions');
// $ExpectType Subscription<string>
btc.subscribe(
    'pendingTransactions',
    (error: Error, transactionHash: string) => {}
);

// $ExpectType boolean
btc.setProvider('https://localhost:2100');

// $ExpectType BatchRequest
new btc.BatchRequest();

// $ExpectType Promise<string>
btc.getProtocolVersion();
// $ExpectType Promise<string>
btc.getProtocolVersion((error: Error, protocolVersion: string) => {});

// $ExpectType Promise<boolean | Syncing>
btc.isSyncing();
// $ExpectType Promise<boolean | Syncing>
btc.isSyncing((error: Error, syncing: Syncing) => {});

// $ExpectType Promise<number>
btc.getHashrate();
// $ExpectType Promise<number>
btc.getHashrate((error: Error, hashes: number) => {});

// $ExpectType Promise<string>
btc.getNodeInfo();
// $ExpectType Promise<string>
btc.getNodeInfo((error: Error, version: string) => {});

// $ExpectType Promise<string[]>
btc.getAccounts();
// $ExpectType Promise<string[]>
btc.getAccounts((error: Error, accounts: string[]) => {});

// $ExpectType Promise<number>
btc.getBlockNumber();
// $ExpectType Promise<number>
btc.getBlockNumber((error: Error, blockNumber: number) => {});

// $ExpectType Promise<string>
btc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
btc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
btc.getBalance(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    '1000',
    (error: Error, balance: string) => {}
);
// $ExpectType Promise<string>
btc.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
btc.getBalance(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    1000,
    (error: Error, balance: string) => {}
);


// $ExpectType Promise<BlockTransactionString>
btc.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<BlockTransactionString>
btc.getBlock(345);
// $ExpectType Promise<BlockTransactionObject>
btc.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true);
// $ExpectType Promise<BlockTransactionString>
btc.getBlock(345);
// $ExpectType Promise<BlockTransactionObject>
btc.getBlock(345, true);
// $ExpectType Promise<BlockTransactionString>
btc.getBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, block: BlockTransactionString) => {}
);
// $ExpectType Promise<BlockTransactionString>
btc.getBlock(345, (error: Error, block: BlockTransactionString) => {});
// $ExpectType Promise<BlockTransactionObject>
btc.getBlock(345, true, (error: Error, block: BlockTransactionObject) => {});
// $ExpectType Promise<BlockTransactionObject>
btc.getBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    true,
    (error: Error, block: BlockTransactionObject) => {}
);

// $ExpectType Promise<Transaction>
btc.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Transaction>
btc.getTransaction(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transaction: Transaction) => {}
);


const code = '603d80600c6000396000f3007c0';

// $ExpectType PromiEvent<TransactionReceipt | TransactionRevertInstructionError>
btc.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    data: 'code'
});
// $ExpectType PromiEvent<TransactionReceipt | TransactionRevertInstructionError>
btc.sendTransaction(
    {
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: 'code'
    },
    (error: Error, hash: string) => {}
);

// $ExpectType PromiEvent<TransactionReceipt>
btc.sendSignedTransaction('0xf889808609184e72a0008227109');
// $ExpectType PromiEvent<TransactionReceipt>
btc.sendSignedTransaction(
    '0xf889808609184e72a0008227109',
    (error: Error, hash: string) => {}
);

// $ExpectType Promise<string>
btc.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
// $ExpectType Promise<string>
btc.sign('Hello world', 3);
// $ExpectType Promise<string>
btc.sign(
    'Hello world',
    '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    (error: Error, signature: string) => {}
);
// $ExpectType Promise<string>
btc.sign('Hello world', 3, (error: Error, signature: string) => {});

// $ExpectType Promise<RLPEncodedTransaction>
btc.signTransaction({
    from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: '0x3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: ''
});
// $ExpectType Promise<RLPEncodedTransaction>
btc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0'
);
// $ExpectType Promise<RLPEncodedTransaction>
btc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    (error: Error, signedTransaction: Transaction) => {}
);
// $ExpectType Promise<RLPEncodedTransaction>
btc.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    (error: Error, signedTransaction: Transaction) => {}
);

// $ExpectType Promise<Transaction[]>
btc.getPendingTransactions();

// $ExpectType Promise<Transaction[]>
btc.getPendingTransactions((error: Error, result: Transaction[]) => {});
