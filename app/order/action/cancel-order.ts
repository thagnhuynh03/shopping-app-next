"use server";
import { patch } from "@/app/until/fetch";

export async function cancelOrder(orderId: number) {
  return await patch(`order/${orderId}/cancel`);
}
