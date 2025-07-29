"use client"

import { Typography } from "antd"
import { ProductCard } from "./productCard"

const { Title, Text } = Typography

export function TodaysPicks() {
  // Sample products for Today's Picks
  const products = [
    {
      id: 1,
      name: "Vintage Checkered Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=988&auto=format&fit=crop",
      colors: ["#B91C1C", "#1E40AF", "#365314"],
      isNew: true,
    },
    {
      id: 2,
      name: "Classic Wool Coat",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=987&auto=format&fit=crop",
      colors: ["#1F2937", "#78716C", "#92400E"],
    },
    {
      id: 3,
      name: "Retro HighWaist Jeans",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=987&auto=format&fit=crop",
      colors: ["#1E40AF", "#1F2937", "#7C2D12"],
    },
    {
      id: 4,
      name: "Suede Chelsea Boots",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1035&auto=format&fit=crop",
      colors: ["#92400E", "#1F2937"],
      isNew: true,
    },
    {
      id: 5,
      name: "Retro Graphic Tee",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=987&auto=format&fit=crop",
      colors: ["#FFFFFF", "#1F2937", "#B91C1C"],
    },
    {
      id: 6,
      name: "Corduroy Pants",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=987&auto=format&fit=crop",
      colors: ["#7C2D12", "#365314", "#1F2937"],
    },
    {
      id: 7,
      name: "Leather Crossbody Bag",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=996&auto=format&fit=crop",
      colors: ["#92400E", "#1F2937", "#78716C"],
    },
    {
      id: 8,
      name: "Knit Beanie",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=987&auto=format&fit=crop",
      colors: ["#1F2937", "#B91C1C", "#365314", "#1E40AF"],
    },
  ]
  return (
    <section className={`py-12 md:py-16 sm:px-12`}>
      <div className="container mx-auto px-4">
        <Title
          level={2}
          className="font-serif text-3xl md:text-4xl font-bold mb-2"
        >
          Today&apos;s Picks
        </Title>
        <Text className={`mb-8 block`}>
          Handpicked items we think you&apos;ll love
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
