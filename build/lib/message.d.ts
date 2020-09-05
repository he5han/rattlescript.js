import { Message as IMessage } from "../core";
import { Address } from "./address";
export declare class Message<T> implements IMessage<T> {
    readonly target: Address;
    readonly source: Address;
    body: T;
    constructor(target: Address, source: Address, body: T);
    static toString<T>(message: Message<T>): string;
    static fromString(value: string): Message<string>;
}
