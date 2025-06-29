"use server";

import { post } from "@/app/until/fetch";
import { OrderCreateInput } from "../interfaces/orderCreateInput.interface";

export default async function createOrder(data: OrderCreateInput) {
    const { error } = await post("order", data);
    if (error) {
        return { error };
    }

    return {error: ""}
}