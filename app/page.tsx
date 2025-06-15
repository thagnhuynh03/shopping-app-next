import CreateProductFab from "./products/create-product/create-product-fab";
import Products from "./products/products";
import SearchFilter from "./SearchFilter/SearchFilter";
export default async function Home(
  props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  return (
    <>
      <SearchFilter />
      <Products query={query} />
      <CreateProductFab />
    </>
  );
}
