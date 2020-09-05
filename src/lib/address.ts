import { Address as IAddress } from "../core";

export class Address implements IAddress {
	domain: string;
	namespace: string;
	action: string;

	constructor(domain: string, namespace: string, action: string) {
		this.domain = domain;
		this.namespace = namespace;
		this.action = action;
	}

	public static fromString(value: string): Address {
		const [domain, namespace, action] = value.split(".");
		return new Address(domain, namespace, action);
	}

	public is(address: Address) {
		return address.toString() === this.toString();
	}

	public toString() {
		return `${this.domain}.${this.namespace}.${this.action}`;
	}
}
