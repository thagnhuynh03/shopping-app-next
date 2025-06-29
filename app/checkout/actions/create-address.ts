"use server";

import { post } from "@/app/until/fetch";
import { Address } from "../interfaces/address.interface";

export default async function createAddress(address: Address){
    return post("users/addresses", address);
}