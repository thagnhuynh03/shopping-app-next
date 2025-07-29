"use client"

import { useContext, useRef } from "react"
import { Statistic, Typography } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import Slider from "react-slick"
import type { Settings } from "react-slick"
import { ThemeContext } from "../theme-context"
import { ProductCard } from "./productCard"
import { ArrowButton } from "./arrowButton"

const { Title, Text } = Typography

// Sample flash sale products
const flashSaleProducts = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: 59.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=987&auto=format&fit=crop",
    colors: ["#1E40AF", "#1F2937", "#7C2D12"],
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Retro Striped Sweater",
    price: 45.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1005&auto=format&fit=crop",
    colors: ["#B91C1C", "#F59E0B", "#064E3B"],
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Classic Leather Boots",
    price: 129.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=987&auto=format&fit=crop",
    colors: ["#92400E", "#000000"],
    isOnSale: true,
    isHot: true,
  },
  {
    id: 4,
    name: "Wool Fedora Hat",
    price: 34.99,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=987&auto=format&fit=crop",
    colors: ["#1F2937", "#92400E", "#78716C"],
    isOnSale: true,
  },
  {
    id: 5,
    name: "Vintage Sunglasses",
    price: 24.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=987&auto=format&fit=crop",
    colors: ["#000000", "#92400E"],
    isOnSale: true,
  },
  {
    id: 6,
    name: "Retro Band T-Shirt",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=987&auto=format&fit=crop",
    colors: ["#000000", "#1F2937", "#7C2D12"],
    isOnSale: true,
  },
]

export function FlashSaleSection() {
  const { isDarkMode } = useContext(ThemeContext)
  const sliderRef = useRef<Slider>(null)
  const { Timer } = Statistic;

  // Set end time for flash sale (24 hours from now)
  const flashSaleEndTime = Date.now() + 24 * 60 * 60 * 1000

  const handlePrevious = () => {
    sliderRef.current?.slickPrev()
  }

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handleSaleEnd = () => {
    console.log("Flash sale has ended!")
    // You can add logic here to handle when the sale ends
    // For example: redirect to regular products, show a message, etc.
  }

  // React Slick settings
  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  }

  return (
    <section className={`py-12 md:py-16 sm:px-12 ${isDarkMode ? "bg-zinc-900" : "bg-amber-50"} relative overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <div className="flex items-center gap-10">
              <Title
                level={1}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{ marginBottom: '0px' }}
              >
                Flash Sale
              </Title>
              <div className="bg-amber-500 px-2 py-1">
                <Timer type="countdown" value={flashSaleEndTime} onFinish={handleSaleEnd} />
              </div>
            </div>
            <Text className="text-base md:text-lg block">
              Grab these deals before they&apos;re gone! Limited time offers with huge discounts.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <ArrowButton
                isDarkMode={isDarkMode}
                type="primary"
                icon={<LeftOutlined />}
                onClick={handlePrevious}
              />
              <ArrowButton
                isDarkMode={isDarkMode}
                type="primary"
                icon={<RightOutlined />}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="flash-sale-carousel">
          <Slider ref={sliderRef} {...sliderSettings}>
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="px-2">
                <div className="h-full">
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        </div>
    </section>
  )
}
