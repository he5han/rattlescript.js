import { Option, Address, ReplayableMessage } from '../lib';
export declare class WsRemoteOption extends Option<string> {
    constructor(address: Address);
    onMessage(message: ReplayableMessage<string>): void;
}
