import { WsConnection } from "./connection";
import { Option, Address, ReplayableMessage } from '../lib'

export class WsRemoteOption extends Option<string> {
	constructor(address: Address, connection: WsConnection) {
		super(address, connection)
	}

	onMessage(message: ReplayableMessage<string>){
		if (message.target.is(this.address))
			this.deferred && this.deferred.resolve(message);
	}
}
