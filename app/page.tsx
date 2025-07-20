"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { Button, Tabs } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { notoSerif } from "./constants/fonts";
import { CustomArrowProps } from "react-slick";
import ProductCard from "./components/productCard";

const categories = [
  'Shirts',
  'Shorts',
  'Jackets',
  'Hoodies',
  'Trousers',
  'Shoes',
  'Accessories',
];

const bestSellers = [
  {
    title: 'Floral Dress',
    price: '$49.99',
    image: '/images/bestsellers/floral-dress.jpg',
  },
  {
    title: 'Striped Shirt',
    price: '$29.99',
    image: '/images/bestsellers/striped-shirt.jpg',
  },
  {
    title: 'Denim Jeans',
    price: '$59.99',
    image: '/images/bestsellers/denim-jeans.jpg',
  },
  {
    title: 'Leather Jacket',
    price: '$79.99',
    image: '/images/bestsellers/leather-jacket.jpg',
  },
];

const tShirtProducts = [
  {
    title: 'Vintage Graphic Tee',
    price: '$24.99',
    salePrice: '$19.99',
    image: '/images/tshirts/vintage-graphic-tee.jpeg',
  },
  {
    title: 'Retro Stripe Tee',
    price: '$22.99',
    salePrice: '$17.99',
    image: '/images/tshirts/retro-stripe-tee.jpeg',
  },
  {
    title: 'Classic White Tee',
    price: '$18.99',
    salePrice: '$14.99',
    image: '/images/tshirts/classic-white-tee.jpeg',
  },
  {
    title: 'Washed Black Tee',
    price: '$20.99',
    salePrice: '$15.99',
    image: '/images/tshirts/washed-black-tee.jpeg',
  },
  {
    title: 'Retro Logo Tee',
    price: '$26.99',
    salePrice: '$21.99',
    image: '/images/tshirts/retro-logo-tee.jpeg',
  },
  {
    title: 'Color Block Tee',
    price: '$23.99',
    salePrice: '$18.99',
    image: '/images/tshirts/color-black-tee.jpeg',
  },
  {
    title: 'Tie-Dye Tee',
    price: '$27.99',
    salePrice: '$22.99',
    image: '/images/tshirts/tie-dye-tee.jpeg',
  },
  {
    title: 'Graphic Print Tee',
    price: '$25.99',
    salePrice: '$20.99',
    image: '/images/tshirts/graphic-print-tee.jpeg',
  },
];

export default function Home(
) {
  const [activeTab, setActiveTab] = useState('Shirts');
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
    <div className={`${notoSerif.className} px-10 flex justify-center`}>
      <div className="w-full max-w-screen-lg flex flex-col">
        {/* Hero Section */}
        <div className="rounded-xl bg-cover bg-center text-white text-center p-6 min-h-[480px] flex flex-col justify-center items-center gap-4"
             style={{
               backgroundImage:
                 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCnCxrf8HaFUyrXMY7hjPMRVpTas1Gy9FmVNj7zzTeU1LxJIlfLmlNXxEQVNGXt9rBwOrq9vodw6m7373NEquWhylYtBxHQpbUjzCydsH71r6-cJPVB6HJmP6JAuRT9Lbep0xMRLDKXmGVowlDOKe9qgWANTCkfNLlumxHpMQlvAVUHjBiPd2EUSCbYDN9iBXr4SH7g6Lv4nKHawv76-SmVtt46GI7IFhg_oaVIzE9DarP3fx9gLDK_82eitzT7vl_aGvQN4oFdeg)'
             }}>
          <h1 className="text-4xl md:text-5xl font-black">Vintage Finds, Modern Style</h1>
          <p className="text-sm md:text-base">Discover unique pieces from the past, curated for today fashion.</p>
          <Button type="default" className="!bg-[#f3e8dc] hover:!bg-[#e2dcd4] hover:!text-black hover:!border-none hover:scale-105 transition-all duration-200 text-black !font-bold">Shop Now</Button>
        </div>

        {/* Curated Collection */}
        <h2 className="text-xl font-bold mt-6 mb-3 px-4">Curated Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
          <CollectionCard title="Retro Summer Vibes" img="/images/curated/shear-bomber.jpg" />
          <CollectionCard title="Collection for Girls" img="/images/curated/couple.jpg" />
          <CollectionCard title="Urban Explorer" img="/images/curated/explorer.jpg" />
          <CollectionCard title="Sheer Bomber Jacket" img="/images/curated/retro.jpg" />
        </div>

        {/* Best Sellers */}
        <h2 className="text-xl font-bold mt-6 mb-3 px-4">Best Sellers</h2>
        
        <div className="px-4">
          <Slider
            arrows
            infinite
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            swipeToSlide
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {bestSellers.map((item, index) => (
              <div key={index} className="px-2">
                <ProductCard {...item} salePrice="" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Categories Tabs */}
        <h2 className="text-xl font-bold mt-6 mb-3 px-4">Latest Arrivals by Categories</h2>
        <Tabs
          defaultActiveKey={categories[0]}
          items={categories.map((cat) => ({ key: cat, label: cat }))}
          onChange={setActiveTab}
        />

        {/* Category Content (mock) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
          {tShirtProducts.map((item, i) => (
            <ProductCard
              key={i}
              title={`${activeTab} Item ${i + 1}`}
              price={`$${(20 + i * 10).toFixed(2)}`}
              salePrice={item.salePrice}
              image={item.image}
            />
          ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-center py-6">
          <Button className="bg-[#f3e8dc] hover:!text-[#8a745c] hover:!border-[#8a745c] text-black ">See All</Button>
        </div>
      </div>
    </div>
  );
}

function CollectionCard({ title, img, square }: { title: string; img: string; square?: boolean }) {
  return (
    <div
      className={`bg-cover bg-center rounded-xl flex flex-col justify-end p-4 text-white ${
        square ? 'aspect-square' : 'aspect-[3/4]'
      }`}
      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.4), transparent), url(${img})` }}
    >
      <p className="font-bold text-base line-clamp-3">{title}</p>
    </div>
  );
}

const NextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
      <RightOutlined
        style={{ fontSize: '20px', color: '#8a745c' }}
        onClick={onClick}
      />
    </div>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
      <LeftOutlined
        style={{ fontSize: '20px', color: '#8a745c' }}
        onClick={onClick}
      />
    </div>
  );
};

