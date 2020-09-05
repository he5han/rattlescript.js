import { Connection as IConnection, onMessageCallback } from "../core";
import { Message } from "./message";
import { ReplayableMessage } from "./replyable";

/**
 * [T]: native signal type
 * Usually string
 */
export abstract class Connection<T>
	implements IConnection<Message<T>, ReplayableMessage<T>> {
	abstract listen(onMessage: onMessageCallback<ReplayableMessage<T>>): any;

	abstract add(message: Message<T>): void;

	abstract onError(error: any): void;

	abstract stop(): void;
}
