"use server";

import { get } from "@/app/until/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts({
  query = "",
  page = 1,
  pageSize = 8,
  minPrice,
  maxPrice,
}: {
  query?: string,
  page?: number,
  pageSize?: number,
  minPrice?: number,
  maxPrice?: number,
}) {
  const params = new URLSearchParams();
  if (query) {
    params.set("query", query);
  }
  params.set("page", page.toString());
  params.set("pageSize", pageSize.toString());
  if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
  if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());
  return get<{ products: Product[], total: number }>("products", ["products"], params);
}