import { get } from "@/app/until/fetch";
import { Address } from "../interfaces/address.interface";

export default async function getAddresses() {
    return get<Address[]>("users/addresses");
}