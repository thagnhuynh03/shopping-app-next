"use client"

import { useState, useContext } from "react"
import { Row, Col } from "antd"
import { PlayCircleOutlined } from "@ant-design/icons"
import { ThemeContext } from "../../theme-context"
import Image from "next/image"

interface MediaItem {
  type: "image" | "video"
  url: string
  thumbnail?: string // For video thumbnails
  alt?: string
}

interface ProductImageGalleryProps {
  images: string[]
  videos?: string[] // Optional video URLs
  videoThumbnails?: string[] // Optional video thumbnail URLs
}

export function ProductImageGallery({ images, videos = ["/video/video.mp4"], videoThumbnails = [] }: ProductImageGalleryProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Combine videos and images into a single media array, with videos first
  const mediaItems: MediaItem[] = [
    // Add videos first
    ...videos.map((video, index) => ({
      type: "video" as const,
      url: video,
      thumbnail: videoThumbnails[index] || video, // Use thumbnail if provided, otherwise use video URL
      alt: `Product video ${index + 1}`,
    })),
    // Then add images
    ...images.map((image, index) => ({
      type: "image" as const,
      url: image,
      alt: `Product image ${index + 1}`,
    })),
  ]

  const mainImageStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    border: `1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
    borderRadius: "12px",
    overflow: "hidden",
  }

  const thumbnailStyle = (isSelected: boolean) => ({
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    border: `2px solid ${isSelected ? (isDarkMode ? "#fbbf24" : "#92400e") : isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: isSelected ? 1 : 0.7,
  })

  const selectedMedia = mediaItems[selectedIndex]

  const renderMainMedia = () => {
    if (!selectedMedia) return null

    if (selectedMedia.type === "video") {
      return (
        <div className="w-full mb-4 h-[500px]">
          <video
            src={selectedMedia.url}
            controls
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain p-4"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
            }}
            poster={selectedMedia.thumbnail !== selectedMedia.url ? selectedMedia.thumbnail : undefined}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    return (
      <div className="w-full mb-4 h-[500px]">
        <Image
          src={selectedMedia.url || "/placeholder.svg"}
          alt={selectedMedia.alt || `Product media ${selectedIndex + 1}`}
          width={100}
          height={100}
          className="object-contain h-full w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />
      </div>
    )
  }

  const renderThumbnail = (media: MediaItem, index: number) => {
    const isSelected = selectedIndex === index

    if (media.type === "video") {
      return (
        <div
          key={index}
          style={thumbnailStyle(isSelected)}
          onClick={() => setSelectedIndex(index)}
          className="hover:opacity-100 transition-opacity duration-200 relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px]"
        >
          <div className="relative aspect-square w-full">
            {/* Video thumbnail */}
            {media.thumbnail && media.thumbnail !== media.url ? (
              <Image
                src={media.thumbnail || "/placeholder.svg"}
                alt={media.alt || `Video thumbnail ${index + 1}`}
                className="object-contain w-full h-full"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            ) : (
              <video src={media.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
            )}

            {/* Play overlay icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  width: "32px",
                  height: "32px",
                }}
              >
                <PlayCircleOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        key={index}
        style={thumbnailStyle(isSelected)}
        onClick={() => setSelectedIndex(index)}
        className="hover:opacity-100 transition-opacity duration-200 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px]"
      >
        <div className="relative aspect-square w-full">
          <Image
            src={media.url || "/placeholder.svg"}
            alt={media.alt || `Thumbnail ${index + 1}`}
            width={90}
            height={90}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 25vw, 12vw"
          />
        </div>
      </div>
    )
  }

  if (mediaItems.length === 0) {
    return (
      <div className="w-full">
        <div style={mainImageStyle}>
          <div className="relative aspect-square w-full">
            <Image
              src="/placeholder.svg"
              alt="No media available"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      {/* Main Media Display */}
      {renderMainMedia()}
      {/* Thumbnails */}
      {mediaItems.length > 1 && (
        <Row gutter={[8, 8]} justify="start">
          {mediaItems.map((media, index) => (
            <Col key={index} span={6} xs={6} sm={6} md={6} lg={4}>
              {renderThumbnail(media, index)}
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
