import { Reply as IReply  } from '../core'
import { Message } from './message'
import { Connection } from './connection';

export class Reply<T> implements IReply<T>{
    private message: Message<T>;
	private connection: Connection<T>;

	constructor(connection: Connection<T>, message: Message<T>) {
		this.connection = connection;
		this.message = message;
	}

	write(value: T) {
		///address swapped message
		this.connection.add(
			new Message(this.message.source, this.message.target, value)
		);
	}
}