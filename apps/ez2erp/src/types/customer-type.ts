import { AddressType } from "./address-type";

export type CustomerType = {
    id: string;
    name: string;
    fname: string;
    lname: string;
    contact_no: string;
    email: string;
    address: AddressType;
    image: string;
};
