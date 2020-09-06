import { StirngReplayableMessage, StringMessage } from "./message";
import { WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import { Subscription } from "rxjs/internal/Subscription";
import { Connection } from "../lib/connection";
declare type onMessageCallback = (message: StirngReplayableMessage) => void;
export declare class WsConnection extends Connection<string> {
    connection: WebSocketSubject<string>;
    constructor(config: WebSocketSubjectConfig<string>);
    stop(): void;
    onError(error: any): void;
    listen(onMessage: onMessageCallback): Subscription;
    add(message: StringMessage): void;
}
export {};
