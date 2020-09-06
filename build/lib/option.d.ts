import { Option as IOption, Connection } from "../core";
import { Address } from "./address";
import { Message } from "./message";
import { Deferred, Promise } from "q";
import { ReplayableMessage } from "./replyable";
export declare abstract class Option<T> implements IOption<ReplayableMessage<T>> {
    domain: string;
    connection: Connection<Message<T>, ReplayableMessage<T>>;
    protected deferred?: Deferred<any>;
    constructor(domain: string);
    start(connection: Connection<Message<T>, ReplayableMessage<T>>): void;
    dispose(): void;
    onMessage(message: ReplayableMessage<T>): void;
    request(target: Address, b?: any): Promise<Message<T>>;
}
