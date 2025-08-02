import { ProductCard } from "../components/productCard";
import { API_URL } from "../constants/api";
import { notoSerif } from "../constants/fonts";
import getProducts from "./actions/get-products";
import ProductsPagination from "./pagination";
import ProductFilter from "./product-filter";

const PAGE_SIZE = 8;

export default async function ProductsPage(
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
    const page = Number(searchParams?.page) || 1;
    const { products, total } = await getProducts({ page });
    const totalPages = Math.ceil(total / PAGE_SIZE);
    return (
        <div className={`${notoSerif.className} min-h-screen sm:px-12 mt-10`}>
            <h1 className="text-4xl">Products</h1>
            <ProductFilter />
            {products?.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                 {products.map((item) => (
                   <ProductCard
                     key={item.id}
                     id={item.id}
                     name={item.name}
                     price={item.price}
                     image={`${API_URL}/images/products/${item.id}.jpg`}
                   />
                 ))}
               </div>
            ) : (
                <div className="flex justify-center items-center">
                     <h2 className="text-3xl">No products found</h2>
                </div>
            )}
            <ProductsPagination totalPages={totalPages} currentPage={page} />
        </div>
    );
}