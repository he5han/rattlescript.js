import { Option, Address, ReplayableMessage } from '../lib'

export class WsRemoteOption extends Option<string> {
	constructor(address: Address) {
		super(address)
	}

	onMessage(message: ReplayableMessage<string>){
		if (message.target.is(this.address))
			this.deferred && this.deferred.resolve(message);
	}
}
