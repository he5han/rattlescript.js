import { Reply as IReply } from '../core';
import { Message } from './message';
import { Connection } from './connection';
export declare class Reply<T> implements IReply<T> {
    private message;
    private connection;
    constructor(connection: Connection<T>, message: Message<T>);
    write(value: T): void;
}
