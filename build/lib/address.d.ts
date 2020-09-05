import { Address as IAddress } from "../core";
export declare class Address implements IAddress {
    domain: string;
    namespace: string;
    action: string;
    constructor(domain: string, namespace: string, action: string);
    static fromString(value: string): Address;
    is(address: Address): boolean;
    toString(): string;
}
