import {
	ReplayableMessage as IReplayableMessage
} from "../core";
import { Address } from "./address";
import { Message } from "./message";
import { Reply } from "./reply";
import { Connection } from "./connection";

export class ReplayableMessage<T> extends Message<T>
	implements IReplayableMessage<T> {
	readonly reply: Reply<T>;

	constructor(
		connection: Connection<T>,
		target: Address,
		source: Address,
		body: T
	) {
		super(target, source, body);
		this.reply = new Reply(connection, this);
	}

	static fromMessage<T>(
		message: Message<T>,
		connection: Connection<T>
	): ReplayableMessage<T> {
		return new ReplayableMessage<T>(
			connection,
			message.target,
			message.source,
			message.body
		);
	}
}
