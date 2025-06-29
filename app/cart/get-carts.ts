import { get, post, put } from "../until/fetch";
import { CartItem } from "./interface/cart.interface";

export async function getCarts(): Promise<CartItem[]> {
  return await get("cart") as CartItem[];
}

export async function addToCart(productSizeId: number, quantity: number, price: number) {
  return await post("cart", { productSizeId, quantity, price });
}

export async function removeFromCart(cartItemId: number) {
  return await post(`cart/${cartItemId}`, { cartItemId });
}

export async function updateCartQuantity(cartItemId: number, quantity: number) {
  return await put("cart", { cartItemId, quantity });
}
