import { Option as IOption, Connection } from "../core";
import { Address } from "./address";
import { Message } from "./message";
import { Deferred, defer, Promise } from "q";
import { ReplayableMessage } from "./replyable";

export class Option<T> implements IOption<Message<T>> {
	address: Address;
	connection: Connection<Message<T>, ReplayableMessage<T>>;
	protected deferred?: Deferred<any>;

	constructor(
		address: Address,
		connection: Connection<Message<T>, ReplayableMessage<T>>
	) {
		this.address = address;
		connection.listen(this.onMessage);
	}

	onMessage(message: ReplayableMessage<T>) {}

	request(target: Address, b?: any): Promise<Message<T>> {
		this.deferred = defer();
		this.connection.add(new Message(target, this.address, b));
		return this.deferred.promise;
	}
}
