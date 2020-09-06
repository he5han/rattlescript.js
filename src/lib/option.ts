import { Option as IOption, Connection } from "../core";
import { Address } from "./address";
import { Message } from "./message";
import Q, { Deferred, Promise } from "q";
import { ReplayableMessage } from "./replyable";

export abstract class Option<T> implements IOption<ReplayableMessage<T>> {
	domain: string;
	connection: Connection<Message<T>, ReplayableMessage<T>>;
	protected deferred?: Deferred<any>;

	constructor(domain: string) {
		this.domain = domain;
	}

	start(connection: Connection<Message<T>, ReplayableMessage<T>>) {
		this.connection = connection;
		this.connection.listen(this.onMessage);
	}

	dispose() {
		this.connection.stop();
	}

	onMessage(message: ReplayableMessage<T>) {
		if (message.target.domain === this.domain)
			this.deferred && this.deferred.resolve(message);
	}

	request(target: Address, b?: any): Promise<Message<T>> {
		this.deferred = Q.defer();
		this.connection.add(
			new Message(target, Address.fromString(`${this.domain}..*`), b)
		);
		return this.deferred.promise;
	}
}
