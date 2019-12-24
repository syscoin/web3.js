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

import * as net from 'net';

export class formatters {

    static outputChainIdFormatter(blockchaininfo: any): number;

    static outputIsListeningFormatter(connectioncount: number): boolean;
    static outputSyncingFormatter(blockchaininfo: any): any;
    static outputNodeInfoFormatter(networkinfo: any): string;
    static outputProtocolVersionFormatter(networkinfo: any): number;
    static outputHashrateFormatter(mininginfo: any): string;

}

export class errors {
    static ErrorResponse(result: Error): Error;
    static InvalidNumberOfParams(
        got: number,
        expected: number,
        method: string
    ): Error;
    static InvalidConnection(host: string): Error;
    static InvalidProvider(): Error;
    static InvalidResponse(result: Error): Error;
    static ConnectionTimeout(ms: string): Error;
    static TransactionError(message: string): Error;
}

export class WebsocketProviderBase {
    constructor(host: string, options?: WebsocketProviderOptions);

    isConnecting(): boolean;

    responseCallbacks: any;
    notificationCallbacks: any;
    connected: boolean;
    connection: any;

    addDefaultEvents(): void;

    supportsSubscriptions(): boolean;

    send(
        payload: JsonRpcPayload,
        callback: (error: Error | null, result?: JsonRpcResponse) => void
    ): void;

    on(type: string, callback: () => void): void;

    once(type: string, callback: () => void): void;

    removeListener(type: string, callback: () => void): void;

    removeAllListeners(type: string): void;

    reset(): void;

    disconnect(code: number, reason: string): void;
}

export class IpcProviderBase {
    constructor(path: string, net: net.Server);

    responseCallbacks: any;
    notificationCallbacks: any;
    connected: boolean;
    connection: any;

    addDefaultEvents(): void;

    supportsSubscriptions(): boolean;

    send(
        payload: JsonRpcPayload,
        callback: (error: Error | null, result?: JsonRpcResponse) => void
    ): void;

    on(type: string, callback: () => void): void;

    once(type: string, callback: () => void): void;

    removeListener(type: string, callback: () => void): void;

    removeAllListeners(type: string): void;

    reset(): void;

    reconnect(): void;
}

export class HttpProviderBase {
    constructor(host: string, options?: HttpProviderOptions);

    host: string;
    connected: boolean;

    supportsSubscriptions(): boolean;

    send(
        payload: JsonRpcPayload,
        callback: (error: Error | null, result?: JsonRpcResponse) => void
    ): void;

    disconnect(): boolean;
}

export interface HttpProviderOptions {
    keepAlive?: boolean;
    timeout?: number;
    headers?: HttpHeader[];
    withCredentials?: boolean;
}

export interface HttpHeader {
    name: string;
    value: string;
}

export interface WebsocketProviderOptions {
    host?: string;
    timeout?: number;
    reconnectDelay?: number;
    headers?: any;
    protocol?: string;
    clientConfig?: string;
    requestOptions?: any;
    origin?: string;
}

export interface JsonRpcPayload {
    jsonrpc: string;
    method: string;
    params: any[];
    id?: string | number;
}

export interface JsonRpcResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: string;
}
