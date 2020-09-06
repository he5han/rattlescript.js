import { Option as IOption, Connection } from "../core";
import { Address } from "./address";
import { Message } from "./message";
import Q, { Deferred, Promise } from "q";
import { ReplayableMessage } from "./replyable";

export abstract class Option<T> implements IOption<Message<T>> {
	address: Address;
	connection: Connection<Message<T>, ReplayableMessage<T>>;
	protected deferred?: Deferred<any>;

	constructor(address: Address) {
		this.address = address;
	}

	start(connection: Connection<Message<T>, ReplayableMessage<T>>) {
		this.connection = connection;
		this.connection.listen(this.onMessage);
	}

	dispose(){
		this.connection.stop();
	}

	abstract onMessage(message: ReplayableMessage<T>): void;

	request(target: Address, b?: any): Promise<Message<T>> {
		this.deferred = Q.defer();
		this.connection.add(new Message(target, this.address, b));
		return this.deferred.promise;
	}
}
