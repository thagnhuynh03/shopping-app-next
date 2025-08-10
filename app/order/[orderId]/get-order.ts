import { get } from "@/app/until/fetch";
import { Order } from "../interfaces/order.interface";

export default async function getOrder(orderId: number) {
    return get<Order>(`order/${orderId}`);
  }