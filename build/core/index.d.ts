export interface Address {
    domain: string;
    namespace: string;
    action: string;
    toString: () => string;
    is: (address: Address) => boolean;
}
export interface Message<T> {
    target: Address;
    source: Address;
    body: T;
}
export interface Reply<T> {
    write: (message: T) => void;
}
export interface ReplayableMessage<T> extends Message<T> {
    reply: Reply<T>;
}
export declare type onMessageCallback<T> = (message: T) => void;
/**
 * [S]: Read type
 * [T]: Write type
 */
export interface Connection<T, S> {
    stop: () => void;
    listen: (onMessage: onMessageCallback<S>) => any;
    onError: (error: any) => void;
    add: (message: T) => void;
}
export interface Option<T> {
    domain: string;
    onMessage: (message: T) => void;
    request: (target: Address, body?: any) => any;
}
