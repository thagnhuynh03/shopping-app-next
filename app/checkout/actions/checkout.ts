"use server";

import { post } from "@/app/until/fetch";

export default async function checkout(productId: number) {
  return post("checkout/session", { productId });
}