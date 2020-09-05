import { ReplayableMessage as IReplayableMessage } from "../core";
import { Address } from "./address";
import { Message } from "./message";
import { Reply } from "./reply";
import { Connection } from "./connection";
export declare class ReplayableMessage<T> extends Message<T> implements IReplayableMessage<T> {
    readonly reply: Reply<T>;
    constructor(connection: Connection<T>, target: Address, source: Address, body: T);
    static fromMessage<T>(message: Message<T>, connection: Connection<T>): ReplayableMessage<T>;
}
