import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

export default async function Products({ query } : { query: string }) {
  const products = await getProducts(query);

  return (
    <ProductsGrid products={products} />
  );
}