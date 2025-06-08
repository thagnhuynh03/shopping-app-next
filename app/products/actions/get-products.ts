"use server";

import { get } from "@/app/until/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts() {
  return get<Product[]>("products", ["products"], new URLSearchParams({ status: "availible" }));
}