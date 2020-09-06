'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Q = require('q');
var webSocket = require('rxjs/webSocket');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Q__default = /*#__PURE__*/_interopDefaultLegacy(Q);

var Address = /** @class */ (function () {
    function Address(domain, namespace, action) {
        this.domain = domain;
        this.namespace = namespace;
        this.action = action;
    }
    Address.fromString = function (value) {
        var _a = value.split("."), domain = _a[0], namespace = _a[1], action = _a[2];
        return new Address(domain, namespace, action);
    };
    Address.prototype.is = function (address) {
        return address.toString() === this.toString();
    };
    Address.prototype.toString = function () {
        return this.domain + "." + this.namespace + "." + this.action;
    };
    return Address;
}());

/**
 * [T]: native signal type
 * Usually string
 */
var Connection = /** @class */ (function () {
    function Connection() {
    }
    return Connection;
}());

var Message = /** @class */ (function () {
    function Message(target, source, body) {
        this.target = target;
        this.source = source;
        this.body = body;
    }
    Message.toString = function (message) {
        return message.target + "::" + message.source + "::" + message.body;
    };
    Message.fromString = function (value) {
        var _splited = value.split("::");
        return new Message(Address.fromString(_splited[0]), Address.fromString(_splited[1]), _splited[3]);
    };
    return Message;
}());

var Reply = /** @class */ (function () {
    function Reply(connection, message) {
        this.connection = connection;
        this.message = message;
    }
    Reply.prototype.write = function (value) {
        ///address swapped message
        this.connection.add(new Message(this.message.source, this.message.target, value));
    };
    return Reply;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var ReplayableMessage = /** @class */ (function (_super) {
    __extends(ReplayableMessage, _super);
    function ReplayableMessage(connection, target, source, body) {
        var _this = _super.call(this, target, source, body) || this;
        _this.reply = new Reply(connection, _this);
        return _this;
    }
    ReplayableMessage.fromMessage = function (message, connection) {
        return new ReplayableMessage(connection, message.target, message.source, message.body);
    };
    return ReplayableMessage;
}(Message));

var Option = /** @class */ (function () {
    function Option(domain) {
        this.domain = domain;
    }
    Option.prototype.start = function (connection) {
        this.connection = connection;
        this.connection.listen(this.onMessage.bind(this));
    };
    Option.prototype.dispose = function () {
        this.connection.stop();
    };
    Option.prototype.onMessage = function (message) {
        if (message.target.domain === this.domain)
            this.deferred && this.deferred.resolve(message);
    };
    Option.prototype.request = function (target, b) {
        this.deferred = Q__default['default'].defer();
        this.connection.add(new Message(target, Address.fromString(this.domain + "..*"), b));
        return this.deferred.promise;
    };
    return Option;
}());

var face = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Address: Address,
	Connection: Connection,
	Message: Message,
	Reply: Reply,
	ReplayableMessage: ReplayableMessage,
	Option: Option
});

var stringToWsReplyableMessage = function (value, connection) {
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
var WsConnection = /** @class */ (function (_super) {
    __extends(WsConnection, _super);
    function WsConnection(config) {
        var _this = _super.call(this) || this;
        _this.connection = webSocket.webSocket(config);
        return _this;
    }
    WsConnection.prototype.stop = function () {
        this.connection.complete();
    };
    WsConnection.prototype.onError = function (error) {
        console.error(error);
    };
    WsConnection.prototype.listen = function (onMessage) {
        var _this = this;
        return this.connection.subscribe(function (data) { return onMessage(stringToWsReplyableMessage(data, _this)); }, this.onError);
    };
    WsConnection.prototype.add = function (message) {
        this.connection.next(Message.toString(message));
    };
    return WsConnection;
}(Connection));

var WsRemoteOption = /** @class */ (function (_super) {
    __extends(WsRemoteOption, _super);
    function WsRemoteOption(domain) {
        return _super.call(this, domain) || this;
    }
    return WsRemoteOption;
}(Option));

exports.WsConnection = WsConnection;
exports.WsRemoteOption = WsRemoteOption;
exports.default = face;
//# sourceMappingURL=index.js.map
