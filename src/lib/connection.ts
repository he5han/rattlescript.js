import { Connection as IConnection, onMessageCallback } from "../core";
import { Message } from "./message";
import { ReplayableMessage } from "./replyable";

/**
 * [T]: native signal type
 * Usually string
 */
export class Connection<T>
	implements IConnection<Message<T>, ReplayableMessage<T>> {

    listen(onMessage: onMessageCallback<ReplayableMessage<T>>) {
        console.dir(onMessage)
    }
    
    add(message: Message<T>) {
        console.dir(message)
    }
    
	onError(error: any) {
        console.error(error)
    }
    
    stop() {}
}
