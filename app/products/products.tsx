import getProducts from "./actions/get-products";
import ProductsPagination from "./pagination";
import ProductsGrid from "./products-grid";

export default async function Products({ query, page, pageSize, minPrice, maxPrice }: { query: string, page: number, pageSize: number, minPrice?: number, maxPrice?: number }) {
  const { products, total } = await getProducts({ query, page, pageSize, minPrice, maxPrice });
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <ProductsGrid products={products} />
      <ProductsPagination totalPages={totalPages} currentPage={page} />
    </>
  );
}