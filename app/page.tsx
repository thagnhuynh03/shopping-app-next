import Products from "./products/products";
import SearchFilter from "./SearchFilter/SearchFilter";

const PAGE_SIZE = 8;

export default async function Home(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
      minPrice?: string;
      maxPrice?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;
  const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined;
  return (
    <>
      <SearchFilter />
      <Products query={query} page={page} pageSize={PAGE_SIZE} minPrice={minPrice} maxPrice={maxPrice} />
      {/* <CreateProductFab /> */}
    </>
  );
}
