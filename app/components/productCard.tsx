"use client"

import { useContext, useState } from "react"
import { Card, Button, Tag } from "antd"
import { HeartOutlined, HeartFilled, ShoppingOutlined } from "@ant-design/icons"
import Image from "next/image"
import { ThemeContext } from "../theme-context"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number | undefined
  image: string
  colors?: string[]
  isOnSale?: boolean
  isNew?: boolean
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  colors = [],
  isOnSale = false,
  isNew = false,
}: ProductCardProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card
      hoverable
      className={`group w-full mx-auto transition-all duration-300 transform ${
        isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
      }`}
      cover={
        <div className="relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isOnSale && discountPercentage > 0 && <Tag color="#D97706">-${discountPercentage}%</Tag>}
            {isNew && <Tag color="#000">NEW</Tag>}
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-2 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              type="primary"
              icon={isWishlisted ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300`}
            />
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300`}
            />
          </div>
          
        </div>
      }
    >
      <Card.Meta
        description={
          <div className="space-y-3">
            {/* Color Options */}
            {colors.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200`}
                      style={{ backgroundColor: color }}
                      title={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            <h3 className={`text-lg font-semibold truncate ${isDarkMode ? "text-[#FFFFFF]" : "text-[#27272A]"}`}>{name}</h3>
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={`text-lg text-amber-600`}>
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className={`text-sm line-through ${isDarkMode ? "text-zinc-400" : "text-gray-500"}`}>
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            
          </div>
        }
      />
    </Card>
  )
}
