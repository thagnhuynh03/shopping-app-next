"use server";

import { post } from "@/app/until/fetch";
import { OrderCreateInput } from "../interfaces/orderCreateInput.interface";

export default async function checkout(data: OrderCreateInput) {
  return post("checkout/session", data);
}