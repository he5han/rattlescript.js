import { StirngReplayableMessage, StringMessage } from "./message";
import {
	WebSocketSubject,
	webSocket,
	WebSocketSubjectConfig
} from "rxjs/webSocket";
import { Subscription } from "rxjs/internal/Subscription";
import { Message } from "../lib/message";
import { Connection } from "../lib/connection"
import { ReplayableMessage } from "../lib/replyable";

type onMessageCallback = (message: StirngReplayableMessage) => void;

const stringToWsReplyableMessage = (
	value: string,
	connection: WsConnection
) => {
	return ReplayableMessage.fromMessage(Message.fromString(value), connection);
};

// {
// 	url: url,
// 	binaryType: "blob",

// 	// closeObserver: this.remoteStatus,
// 	// openObserver: this.remoteStatus,

// 	serializer: (data: any) => data,
// 	deserializer: ({ data }) => data
// }

export class WsConnection implements Connection<string> {
	connection: WebSocketSubject<string>;
	constructor(config: WebSocketSubjectConfig<string>) {
		this.connection = webSocket(config);
	}

	stop() {
		this.connection.complete();
	}

	onError(error: any) {
		console.error(error);
	}

	listen(onMessage: onMessageCallback): Subscription {
		return this.connection.subscribe(
			data => onMessage(stringToWsReplyableMessage(data, this)),
			this.onError
		);
	}

	add(message: StringMessage) {
		this.connection.next(Message.toString(message));
	}
}
