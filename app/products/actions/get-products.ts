"use server";

import { get } from "@/app/until/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts(query?: string) {
  const params = new URLSearchParams();
  if (query) {
    params.set("query", query);
  }
  console.log(params);
  return get<Product[]>("products", ["products"], params);
}