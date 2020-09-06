import { WsConnection } from "./connection";
import { Option, Address, ReplayableMessage } from '../lib';
export declare class WsRemoteOption extends Option<string> {
    constructor(address: Address, connection: WsConnection);
    onMessage(message: ReplayableMessage<string>): void;
}
