import getProduct from "./get-product";
import { getProductImages } from "../product-image";
import { addToCart } from "../../cart/get-carts";
import { ProductDetailsClient } from "./ProductDetailsClient";

export default async function SingleProductPage({ params }: {params: Promise<{ productId: string }>}) {
  const { productId } = await params;
  const product = await getProduct(+productId);
  const images = getProductImages(product.id);

  async function handleAddToCart(productSizeId: number, quantity: number, price: number) {
    "use server";
    return await addToCart(productSizeId, quantity, price);
  }

  return (
    <ProductDetailsClient product={product} images={images} addToCart={handleAddToCart} />
  );
}