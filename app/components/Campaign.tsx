"use client"

import { useContext } from "react"
import { Button, Typography } from "antd"
import Image from "next/image"
import Link from "next/link"
import { ThemeContext } from "../theme-context"

const { Title, Text } = Typography

interface CampaignCardProps {
  title: string
  description: string
  discount: string
  image: string
  startDate: string
  endDate: string
  link?: string
}

export function CampaignCard({
  title,
  description,
  discount,
  image,
  startDate,
  endDate,
  link = "#",
}: CampaignCardProps) {

  return (
    <div className="relative overflow-hidden rounded-lg group h-[300px] md:h-[400px]">
      {/* Background Image */}
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{
          filter: "contrast(1.1) brightness(0.8) grayscale(0.2)",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <div className="mb-3 inline-block bg-amber-600 text-white px-3 py-1 text-sm font-bold rounded-sm">
          {discount}
        </div>
        <Title
          level={3}
          className="text-white font-serif text-2xl md:text-3xl font-bold mb-2"
          style={{ color: "white" }}
        >
          {title}
        </Title>
        <Text className="!text-white mb-4 max-w-xs block">{description}</Text>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link href={link} passHref>
            <Button
              type="primary"
              className={`px-6 py-2 h-auto font-serif rounded-none transition-colors uppercase tracking-wider`}
            >
              Explore Now
            </Button>
          </Link>
          <Text className="!text-white text-sm">
            {startDate} - {endDate}
          </Text>
        </div>
      </div>
    </div>
  )
}

export function PromotionalCampaigns() {
  const { isDarkMode } = useContext(ThemeContext)
  const campaigns = [
    {
      title: "Mid-Year Sale",
      description: "Discover our curated selection of timeless vintage pieces at unbeatable prices.",
      discount: "Up to 50% Off",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
      startDate: "June 15",
      endDate: "July 15",
      link: "/sale/mid-year",
    },
    {
      title: "Vintage Weekend",
      description: "Celebrate the golden era of fashion with our exclusive weekend deals.",
      discount: "30% Off Everything",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2071&auto=format&fit=crop",
      startDate: "August 5",
      endDate: "August 7",
      link: "/sale/vintage-weekend",
    },
    {
      title: "Summer Deals",
      description: "Beat the heat with our coolest vintage summer collection.",
      discount: "Buy 2 Get 1 Free",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
      startDate: "July 1",
      endDate: "August 31",
      link: "/sale/summer-deals",
    },
  ]

  return (
    <section className={`py-12 md:py-16 sm:px-12 ${isDarkMode ? "bg-zinc-800" : "bg-amber-100/50"}`}>
      <div className="container mx-auto px-4">
        <Title
          level={2}
          className="font-serif text-3xl md:text-4xl font-bold mb-2"
        >
          Promotional Campaigns
        </Title>
        <Text className={`mb-8 block`}>
          Don&apos;t miss out on these limited-time offers
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
