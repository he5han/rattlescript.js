import { WsConnection } from "./connection";
import { Option } from '../lib/option';
import { Address } from "../lib/address";
import { ReplayableMessage } from "../lib/replyable";
export declare class WsRemoteOption extends Option<string> {
    constructor(address: Address, connection: WsConnection);
    onMessage(message: ReplayableMessage<string>): void;
}
