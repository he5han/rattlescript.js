import { WsConnection } from "./connection";
import { Option } from '../lib/option';
import { Address } from "../lib/address";
import { ReplayableMessage } from "../lib/replyable";

export class WsRemoteOption extends Option<string> {
	constructor(address: Address, connection: WsConnection) {
		super(address, connection)
	}

	onMessage(message: ReplayableMessage<string>){
		if (message.target.is(this.address))
			this.deferred && this.deferred.resolve(message);
	}
}
