"use client"

import { useState, useContext } from "react"
import { ThemeContext } from "../../theme-context"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const thumbnailStyle = (isSelected: boolean) => ({
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    border: `2px solid ${isSelected ? (isDarkMode ? "#fbbf24" : "#92400e") : isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: isSelected ? 1 : 0.7,
  })

  return (
    <div className="w-full">
      {/* Main Image */}
      <Image
        src={images[selectedIndex] || "/placeholder.svg"}
        alt={`Product image ${selectedIndex + 1}`}
        width={600}
        height={400}
        className="object-cover p-4 w-full"
        priority={selectedIndex === 0}
        />

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
              <div
                key={index}
                style={thumbnailStyle(selectedIndex === index)}
                onClick={() => setSelectedIndex(index)}
                className="hover:opacity-100 transition-opacity duration-200"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={70}
                    height={70}
                    className="object-cover"
                  />
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  )
}
