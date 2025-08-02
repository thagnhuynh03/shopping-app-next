"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Carousel, Button } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import type { CarouselRef } from "antd/es/carousel"
import Image from "next/image" // Import Next.js Image component
import { ArrowButton } from "./customButton"

interface Slide {
  id: number
  imageUrl: string
  title: string
  subtitle: string
  cta: string
  ctaLink?: string
  blurDataURL: string // Added for placeholder="blur"
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: "https://i.pinimg.com/1200x/3e/54/e9/3e54e99e85f6142f7f1420b47393f1de.jpg",
    title: "Vintage Finds, Modern Style",
    subtitle: "Discover unique pieces from the past, curated for today's fashion.",
    cta: "Shop Now",
    ctaLink: "/shop",
    blurDataURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", // Generic placeholder
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Summer Collection 2023",
    subtitle: "Retro styles reimagined for the modern wardrobe.",
    cta: "Explore Collection",
    ctaLink: "/collections/summer",
    blurDataURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", // Generic placeholder
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Exclusive Vintage Deals",
    subtitle: "Get up to 40% off on selected vintage items this week.",
    cta: "Shop Sale",
    ctaLink: "/sale",
    blurDataURL: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", // Generic placeholder
  },
]

export function HeroCarousel() {
  const carouselRef = useRef<CarouselRef>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrevious = () => {
    carouselRef.current?.prev()
  }

  const handleNext = () => {
    carouselRef.current?.next()
  }

  const handleCtaClick = (ctaLink?: string) => {
    if (ctaLink) {
      // In a real Next.js app, you'd use router.push(ctaLink)
      console.log("Navigate to:", ctaLink)
    }
  }

  const carouselSettings = {
    autoplay: true, // Changed from {dotDuration: true} as it's not a valid prop for Ant Design Carousel
    draggable: true, // Corrected from 'dradable'
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    accessibility: true,
    arrows: false, // We'll use custom arrows
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Carousel
        ref={carouselRef}
        {...carouselSettings}
        dotPosition="bottom"
        effect="fade"
        className="h-full"
        style={
          {
            "--dot-width": "12px",
            "--dot-height": "12px",
            "--dot-active-width": "24px",
          } as React.CSSProperties
        }
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Background Image using next/image */}
            <Image
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover transition-transform duration-700"
              placeholder="blur"
              blurDataURL={slide.blurDataURL}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight font-serif">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                  {slide.subtitle}
                </p>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleCtaClick(slide.ctaLink)}
                  className="bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600 text-white font-medium py-3 px-6 md:px-8 h-auto text-sm md:text-base uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: "#f59e0b",
                    borderColor: "#f59e0b",
                    boxShadow: "0 4px 14px 0 rgba(245, 158, 11, 0.3)",
                  }}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom Navigation Arrows */}
      { isMounted &&
      <ArrowButton
        isDarkMode={true}
        type="primary"
        icon={<LeftOutlined style={{ fontSize: "16px" }} />}
        onClick={handlePrevious}
        className="!absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20"
      />}
      {isMounted && 
      <ArrowButton
        isDarkMode={true}
        type="primary"
        icon={<RightOutlined style={{ fontSize: "16px" }} />}
        onClick={handleNext}
        className="!absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20"
      />}
    </div>
  )
}