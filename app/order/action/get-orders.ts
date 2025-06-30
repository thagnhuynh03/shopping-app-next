"use server";

import { get } from "@/app/until/fetch";
import { Order } from "../interfaces/order.interface";



export async function getOrders(): Promise<Order[]> {
  return get<Order[]>("order");
} 