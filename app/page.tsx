"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroCarousel } from "./components/slider";
import { FlashSaleSection } from "./components/flashSale";
import { PromotionalCampaigns } from "./components/Campaign";
import { TodaysPicks } from "./components/todayPick";
import { CategorySection } from "./components/category";
import { CollectionSection } from "./components/collection";
import { Newsletter } from "./components/newsLetter";

// const categories = [
//   'Shirts',
//   'Shorts',
//   'Jackets',
//   'Hoodies',
//   'Trousers',
//   'Shoes',
//   'Accessories',
// ];

// const bestSellers = [
//   {
//     title: 'Floral Dress',
//     price: '$49.99',
//     image: '/images/bestsellers/floral-dress.jpg',
//   },
//   {
//     title: 'Striped Shirt',
//     price: '$29.99',
//     image: '/images/bestsellers/striped-shirt.jpg',
//   },
//   {
//     title: 'Denim Jeans',
//     price: '$59.99',
//     image: '/images/bestsellers/denim-jeans.jpg',
//   },
//   {
//     title: 'Leather Jacket',
//     price: '$79.99',
//     image: '/images/bestsellers/leather-jacket.jpg',
//   },
// ];

// const tShirtProducts = [
//   {
//     title: 'Vintage Graphic Tee',
//     price: '$24.99',
//     salePrice: '$19.99',
//     image: '/images/tshirts/vintage-graphic-tee.jpeg',
//   },
//   {
//     title: 'Retro Stripe Tee',
//     price: '$22.99',
//     salePrice: '$17.99',
//     image: '/images/tshirts/retro-stripe-tee.jpeg',
//   },
//   {
//     title: 'Classic White Tee',
//     price: '$18.99',
//     salePrice: '$14.99',
//     image: '/images/tshirts/classic-white-tee.jpeg',
//   },
//   {
//     title: 'Washed Black Tee',
//     price: '$20.99',
//     salePrice: '$15.99',
//     image: '/images/tshirts/washed-black-tee.jpeg',
//   },
//   {
//     title: 'Retro Logo Tee',
//     price: '$26.99',
//     salePrice: '$21.99',
//     image: '/images/tshirts/retro-logo-tee.jpeg',
//   },
//   {
//     title: 'Color Block Tee',
//     price: '$23.99',
//     salePrice: '$18.99',
//     image: '/images/tshirts/color-black-tee.jpeg',
//   },
//   {
//     title: 'Tie-Dye Tee',
//     price: '$27.99',
//     salePrice: '$22.99',
//     image: '/images/tshirts/tie-dye-tee.jpeg',
//   },
//   {
//     title: 'Graphic Print Tee',
//     price: '$25.99',
//     salePrice: '$20.99',
//     image: '/images/tshirts/graphic-print-tee.jpeg',
//   },
// ];

export default function Home(
) {
  // const searchParams = props.searchParams;
  // const query = await searchParams?.query || '';
  // const page = Number(searchParams?.page) || 1;
  // const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : undefined;
  // const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined;
  return (
    // <>
    //   <SearchFilter />
    //   <Products query={query} page={page} pageSize={PAGE_SIZE} minPrice={minPrice} maxPrice={maxPrice} />
    //   {/* <CreateProductFab /> */}
    // </>
    <div>
      <HeroCarousel />
      <FlashSaleSection />
      <PromotionalCampaigns />
      <TodaysPicks />
      <CategorySection />
      <CollectionSection />
      <Newsletter />
    </div>
  );
}

// function CollectionCard({ title, img, square }: { title: string; img: string; square?: boolean }) {
//   return (
//     <div
//       className={`bg-cover bg-center rounded-xl flex flex-col justify-end p-4 text-white ${
//         square ? 'aspect-square' : 'aspect-[3/4]'
//       }`}
//       style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.4), transparent), url(${img})` }}
//     >
//       <p className="font-bold text-base line-clamp-3">{title}</p>
//     </div>
//   );
// }

// const NextArrow = (props: CustomArrowProps) => {
//   const { onClick } = props;
//   return (
//     <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
//       <RightOutlined
//         style={{ fontSize: '20px', color: '#8a745c' }}
//         onClick={onClick}
//       />
//     </div>
//   );
// };

// const PrevArrow = (props: CustomArrowProps) => {
//   const { onClick } = props;
//   return (
//     <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
//       <LeftOutlined
//         style={{ fontSize: '20px', color: '#8a745c' }}
//         onClick={onClick}
//       />
//     </div>
//   );
// };

