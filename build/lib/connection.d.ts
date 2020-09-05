import { Connection as IConnection, onMessageCallback } from "../core";
import { Message } from "./message";
import { ReplayableMessage } from "./replyable";
/**
 * [T]: native signal type
 * Usually string
 */
export declare class Connection<T> implements IConnection<Message<T>, ReplayableMessage<T>> {
    listen(onMessage: onMessageCallback<ReplayableMessage<T>>): void;
    add(message: Message<T>): void;
    onError(error: any): void;
    stop(): void;
}
