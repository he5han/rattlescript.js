import { Message as IMessage } from "../core";
import { Address } from "./address";

export class Message<T> implements IMessage<T> {
	readonly target: Address;
	readonly source: Address;
	body: T;

	constructor(target: Address, source: Address, body: T) {
		this.target = target;
		this.source = source;
		this.body = body;
	}

	static toString<T>(message: Message<T>) {
		return `${message.target}::${message.source}::${message.body}`;
	}

	static fromString(value: string): Message<string> {
		const _splited = value.split("::");
		return new Message(
			Address.fromString(_splited[0]),
			Address.fromString(_splited[1]),
			_splited[2]
		);
	}
}
