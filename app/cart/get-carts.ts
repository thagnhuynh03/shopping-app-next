"use server";
import { revalidateTag } from "next/cache";
import { get, post, put } from "../until/fetch";
import { CartItem } from "./interface/cart.interface";

export async function getCarts(): Promise<CartItem[]> {
  return await get("cart", ["cart"]) as CartItem[];
}

export async function addToCart(productSizeId: number, quantity: number, price: number) {
  "use server";
  const result = await post("cart", { productSizeId, quantity, price });
  revalidateTag("cart");
  return result;
}

export async function removeFromCart(cartItemId: number) {
  return await post(`cart/${cartItemId}`, { cartItemId });
}

export async function updateCartQuantity(cartItemId: number, quantity: number) {
  return await put("cart", { cartItemId, quantity });
}

export async function updateCartItemProductSize(cartItemId: number, newProductSizeId: number) {
  return await put("cart/product-size", { cartItemId, newProductSizeId });
}
