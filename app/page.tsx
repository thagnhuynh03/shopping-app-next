import CreateProductFab from "./products/create-product/create-product-fab";
import Products from "./products/products";
import SearchFilter from "./SearchFilter/SearchFilter";
export default async function Home() {
  return (
    <>
      <SearchFilter />
      <Products />
      <CreateProductFab />
    </>
  );
}
