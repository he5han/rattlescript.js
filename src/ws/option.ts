import { Option } from '../lib'

export class WsRemoteOption extends Option<string> {
	constructor(domain: string) {
		super(domain)
	}
}
