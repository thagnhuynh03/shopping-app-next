"use client"

import { useContext, useRef } from "react"
import { Button, Typography } from "antd"
import Image from "next/image"
import Link from "next/link"
import Slider from "react-slick"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ThemeContext } from "../theme-context"
import { ArrowButton } from "./arrowButton"

const { Title } = Typography

interface CategoryCardProps {
  name: string
  image: string
  link?: string
}

interface Settings {
  dots: boolean
  infinite: boolean
  speed: number
  slidesToShow: number
  slidesToScroll: number
  autoplay: boolean
  arrows: boolean
  swipeToSlide: boolean
  responsive: Array<{
    breakpoint: number
    settings: {
      slidesToShow: number
      slidesToScroll: number
      centerMode?: boolean
      centerPadding?: string
    }
  }>
}

export function CategoryCard({ name, image, link = "#" }: CategoryCardProps) {

  return (
    <div className="relative rounded-lg overflow-hidden group h-[280px] flex-shrink-0">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        style={{
          filter: "contrast(1.1) brightness(0.9) grayscale(0.1)",
        }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
      <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2 z-10">
        <Title
          level={3}
          className="font-serif text-2xl font-bold mb-4"
          style={{ color: "white", margin: 0 }}
        >
          {name}
        </Title>
        <Link href={link} passHref>
          <Button
            type="primary"
            className={`w-fit px-6 py-2 h-auto font-serif transition-colors uppercase tracking-wider`}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function CategorySection() {
  const { isDarkMode } = useContext(ThemeContext)
  const sliderRef = useRef<Slider>(null)

  const scrollLeft = () => {
    sliderRef.current?.slickPrev()
  }

  const scrollRight = () => {
    sliderRef.current?.slickNext()
  }

  const categories = [
    {
      name: "Shirts & T-Shirts",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
      link: "/shop/shirts-tshirts",
    },
    {
      name: "Dresses",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
      link: "/shop/dresses",
    },
    {
      name: "Outerwear",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      link: "/shop/outerwear",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070&auto=format&fit=crop",
      link: "/shop/accessories",
    },
    {
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=2070&auto=format&fit=crop",
      link: "/shop/footwear",
    },
    {
      name: "Vintage Denim",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7ed11?q=80&w=2070&auto=format&fit=crop",
      link: "/shop/denim",
    },
  ]

  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false, // We'll use custom arrows
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
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1.5, // Show 1.5 cards to indicate more content
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
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
    <section className={`py-12 md:py-16 sm:px-12 ${isDarkMode ? "bg-zinc-800" : "bg-amber-100/50"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Title
              level={2}
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
            >
              Shop by Category
            </Title>
            <Typography.Text>
              Find your style in our curated collections
            </Typography.Text>
          </div>
          <div className="flex space-x-2">
            <ArrowButton
              isDarkMode={isDarkMode}
              type="primary"
              icon={<LeftOutlined />}
              onClick={scrollLeft}
            />
            <ArrowButton
              isDarkMode={isDarkMode}
              type="primary"
              icon={<RightOutlined />}
              onClick={scrollRight}
            />
          </div>
        </div>
        <div>
          <Slider ref={sliderRef} {...sliderSettings}>
            {categories.map((category, index) => (
              <div key={index} className="px-2">
                <CategoryCard {...category} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
