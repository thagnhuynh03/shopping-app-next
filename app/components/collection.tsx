"use client"

import { Button, Typography } from "antd"
import Image from "next/image"
import Link from "next/link"

const { Title, Text } = Typography

interface CollectionBlockProps {
  title: string
  description?: string
  image: string
  isLarge?: boolean
  link?: string
}

export function CollectionBlock({ title, description, image, isLarge = false, link = "#" }: CollectionBlockProps) {

  return (
    <div className={`relative overflow-hidden rounded-lg group ${isLarge ? "h-full" : "h-[240px] md:h-[280px]"}`}>
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{
          filter: "contrast(1.1) brightness(0.8) grayscale(0.2)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="relative h-full p-6 flex flex-col gap-3 justify-end z-10">
        <Title
          level={3}
          className="text-white font-serif text-2xl md:text-3xl font-bold mb-2"
          style={{ color: "white", margin: 0 }}
        >
          {title}
        </Title>
        {description && <Text className="!text-white mb-4 max-w-xs block">{description}</Text>}
        <Link href={link} passHref>
          <Button
            type="primary"
            className={`w-fit px-6 py-2 h-auto text-white font-serif transition-colors uppercase tracking-wider`}
          >
            View Collection
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function CollectionSection() {
  return (
    <section className={`py-12 md:py-16 sm:px-12`}>
      <div className="container mx-auto px-4">
        <Title
          level={2}
          className="font-serif text-3xl md:text-4xl font-bold mb-2"
        >
          Featured Collections
        </Title>
        <Typography.Text>
          Explore our carefully curated vintage selections
        </Typography.Text>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
          {/* Large feature block */}
          <div className="lg:col-span-1 h-[600px]">
            <CollectionBlock
              title="Men's Essentials"
              description="Timeless pieces for the modern gentleman. Discover our premium selection of vintage menswear."
              image="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=1780&auto=format&fit=crop"
              isLarge={true}
              link="/collections/men"
            />
          </div>
          {/* 2x2 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CollectionBlock
              title="Women's Collection"
              image="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"
              link="/collections/women"
            />
            <CollectionBlock
              title="Vintage Denim"
              image="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2070&auto=format&fit=crop"
              link="/collections/denim"
            />
            <CollectionBlock
              title="Accessories"
              image="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1965&auto=format&fit=crop"
              link="/collections/accessories"
            />
            <CollectionBlock
              title="Limited Edition"
              image="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2071&auto=format&fit=crop"
              link="/collections/limited"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
