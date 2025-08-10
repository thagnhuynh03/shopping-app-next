"use client"

import { useState, useMemo, useContext } from "react"
import { Row, Col, Typography, Button, Space, message, Rate } from "antd" // Import Rate
import { ShoppingCartOutlined } from "@ant-design/icons"
import { ThemeContext } from "../../theme-context"
import { ProductImageGallery } from "./ProductImageGallery"
import ColorSelector from "./ColorSelector"
import { SizeSelector } from "./SizeSelector"
import { QuantitySelector } from "./QuantitySelector"
import { ProductTabs } from "./description-review"

const { Title, Text } = Typography

// Helper to format numbers into compact notation (e.g., 1.2k)
// const formatNumberCompact = (num: number | undefined): string => {
//   if (num === undefined || num === null) return "0"
//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
//   }
//   if (num >= 1000) {
//     return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
//   }
//   return num.toString()
// }

type ProductColor = {
  id: number
  colorId: number
  name: string
  sizes: ProductSize[]
}

type ProductSize = {
  id: number
  sizeId: number
  name: string
  stock: number
  price: number
}

interface Review {
  id: number
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  verified?: boolean
}

interface Product {
  id: number
  name: string
  description: string
  detailedDescription?: string
  price: number
  originalPrice?: number // Added for original price
  colors: ProductColor[]
  imageExists: boolean
  averageRating?: number
  totalReviews?: number
  reviews?: Review[]
  soldUnits?: number // Added for sold units
}

interface ProductDetailsClientProps {
  product: Product
  images: string[]
  addToCart: (productSizeId: number, quantity: number, price: number) => Promise<{ error: string; data?: unknown }>
}

export function ProductDetailsClient({ product, images, addToCart }: ProductDetailsClientProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [messageApi, contextHolder] = message.useMessage()

  // State for selected color and size
  const [selectedColorId, setSelectedColorId] = useState<number | null>(product.colors[0]?.colorId ?? null)
  const selectedColor = useMemo(
    () => product.colors.find((c: ProductColor) => c.colorId === selectedColorId),
    [product.colors, selectedColorId],
  )

  const [selectedSizeName, setSelectedSizeName] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  // Sort sizes in order S, M, L, XL
  const sizeOrder = ["S", "M", "L", "XL"]

  // If no color selected, show all sizes from all colors
  let allSizes: string[] = []
  let allDisabledSizes: string[] = []
  if (!selectedColor) {
    const sizeSet = new Set<string>()
    const disabledSet = new Set<string>()
    product.colors.forEach((color: ProductColor) => {
      color.sizes.forEach((s: ProductSize) => {
        sizeSet.add(s.name)
        if (s.stock === 0) disabledSet.add(s.name)
      })
    })
    allSizes = Array.from(sizeSet).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    allDisabledSizes = Array.from(disabledSet)
  }

  const sortedSizes = selectedColor
    ? (selectedColor.sizes.map((s: ProductSize) => s.name) || []).sort(
        (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b),
      )
    : allSizes

  const disabledSizes = selectedColor
    ? selectedColor.sizes.filter((s: ProductSize) => s.stock === 0).map((s: ProductSize) => s.name) || []
    : allDisabledSizes

  // Find the selected ProductSize object (to get id and price)
  const selectedProductSize = selectedColor?.sizes.find((s: ProductSize) => s.name === selectedSizeName)

  // Determine the price to display (selected size price or base product price)
  // const currentDisplayPrice = selectedProductSize?.price ?? product.price

  const handleAddToCart = async () => {
    if (!selectedProductSize) {
      messageApi.warning("Please select a size before adding to cart")
      return
    }

    setLoading(true)
    try {
      console.log(selectedProductSize.id)
      const res = await addToCart(selectedProductSize.id, quantity, selectedProductSize.price)
      if (res && !res.error) {
        messageApi.success({
          content: "Successfully added to cart!",
          duration: 3,
        })
        // Optional: You might want to update cart state instead of reloading
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        messageApi.error(res.error || "Failed to add to cart")
      }
    } catch (error) {
      messageApi.error("Failed to add to cart" + error)
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  // Default values for demo
  const defaultReviews: Review[] = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      comment:
        "Absolutely love this vintage jacket! The quality is exceptional and it fits perfectly. The distressing looks authentic and the material feels durable. Highly recommend!",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      userName: "Mike Chen",
      rating: 4,
      comment:
        "Great jacket with authentic vintage vibes. The sizing runs a bit large, so I'd recommend sizing down. Overall very satisfied with the purchase.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 3,
      userName: "Emma Wilson",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      comment:
        "This is my third purchase from RetroThreads and they never disappoint. The jacket arrived quickly and was exactly as described. Perfect for layering!",
      date: "2024-01-08",
      verified: true,
    },
    {
      id: 4,
      userName: "David Rodriguez",
      rating: 4,
      comment:
        "Nice quality denim jacket. The color is exactly as shown in the photos. Only minor complaint is that the pockets could be a bit deeper.",
      date: "2024-01-05",
      verified: false,
    },
  ]

  return (
    <>
      {contextHolder}
      <div className="p-4 md:p-6 rounded-lg" style={containerStyle}>
        <Row gutter={[32, 32]} className="mt-8 mb-8">
          {/* Image Gallery */}
          {product.imageExists && (
            <Col xs={24} md={12} className="max-h-screen">
              <ProductImageGallery images={images} />
            </Col>
          )}

          {/* Product Info */}
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" className="w-full pt-7">
              {/* Product Name */}
              <Title
                level={1}
                className="font-serif"
                style={{
                  color: isDarkMode ? "#e4e4e7" : "#18181b",
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: 700,
                }}
              >
                {product.name}
              </Title>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center">
                  <Rate disabled allowHalf value={4.3} style={{ fontSize: "16px" }} />
                  <Text className="text-sm font-bold">4.3</Text>
                </div>
                <span> | </span>
                <Text
                  className="text-sm font-bold"
                  >
                  {/* ({product.totalReviews} reviews) */} 1.2k reviews
                </Text>
                <span> | </span>
                {/* Sold Units */}
                <Text
                  className="text-sm font-bold"
                >
                  {/* • {formatNumberCompact(product.soldUnits)} sold */} 2k sold
                </Text>
              </div>
                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <Title
                    level={2}
                    className="font-serif mb-0"
                    style={{
                      color: isDarkMode ? "#fbbf24" : "#92400e", // Amber color for sale price
                      fontSize: "28px",
                      fontWeight: 600,
                    }}
                  >
                    ${(selectedProductSize?.price ?? product.price).toFixed(2)}
                  </Title>
                  {product.originalPrice && product.originalPrice > (selectedProductSize?.price ?? product.price) && (
                    <Text
                      delete
                      className="text-lg"
                      style={{
                        color: isDarkMode ? "#a1a1aa" : "#6b7280", // Gray for original price
                      }}
                    >
                      ${product.originalPrice.toFixed(2)}
                    </Text>
                  )}
                </div>
              




              {/* Color Selector */}
              <div>
                <Title level={4} className="mb-3" style={{ color: isDarkMode ? "#e4e4e7" : "#18181b" }}>
                  Color
                </Title>
                <ColorSelector
                  colors={product.colors.map((c: ProductColor) => ({
                    id: c.colorId,
                    name: c.name,
                  }))}
                  selectedColorId={selectedColorId}
                  onChange={setSelectedColorId}
                />
              </div>

              {/* Size Selector */}
              <div>
                <Title level={4} className="mb-3" style={{ color: isDarkMode ? "#e4e4e7" : "#18181b" }}>
                  Size
                </Title>
                <SizeSelector
                  sizes={sortedSizes}
                  selected={selectedSizeName}
                  onChange={setSelectedSizeName}
                  disabledSizes={disabledSizes}
                />
              </div>

              {/* Stock Info */}
              {selectedProductSize && (
                <Text
                  style={{
                    color: selectedProductSize.stock > 0 ? "#10b981" : "#ef4444",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {selectedProductSize.stock > 0 ? `${selectedProductSize.stock} items in stock` : "Out of stock"}
                </Text>
              )}

              {/* Quantity Selector */}
              <div>
                <Title level={4} className="mb-3" style={{ color: isDarkMode ? "#e4e4e7" : "#18181b" }}>
                  Quantity
                </Title>
                <QuantitySelector max={selectedProductSize?.stock ?? 1} value={quantity} onChange={setQuantity} />
              </div>

              {/* Add to Cart Button */}
              <Button
                type="primary"
                size="large"
                block
                icon={<ShoppingCartOutlined />}
                loading={loading}
                disabled={!selectedProductSize || selectedProductSize?.stock === 0}
                onClick={handleAddToCart}
                className="h-12 font-semibold text-base rounded-lg"
                style={{
                  backgroundColor: isDarkMode ? "#d97706" : "#f3e8dc",
                  borderColor: isDarkMode ? "#d97706" : "#f3e8dc",
                  color: isDarkMode ? "#ffffff" : "#181510",
                  fontSize: "16px",
                }}
              >
                {loading ? "Adding to Cart..." : "Add to Cart"}
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Product Tabs */}
        <ProductTabs
          description={
            product.detailedDescription ||
            `This ${product.name.toLowerCase()} represents the perfect blend of vintage aesthetics and modern comfort. Crafted with attention to detail, this piece features authentic vintage styling that captures the essence of classic fashion while providing the durability and comfort expected in contemporary clothing.

The design showcases timeless elements that have made vintage fashion so enduring and appealing. Each piece is carefully selected and curated to ensure authenticity and quality, making it a perfect addition to any wardrobe seeking that distinctive vintage charm.

Whether you're looking to make a statement or simply add a touch of retro flair to your everyday style, this piece offers versatility and character that transcends seasonal trends. The quality construction ensures longevity, making it not just a fashion choice, but an investment in timeless style.`
          }
          averageRating={product.averageRating || 4.3}
          totalReviews={product.totalReviews || 127}
          reviews={product.reviews || defaultReviews}
          ratingDistribution={{
            5: 68,
            4: 32,
            3: 18,
            2: 7,
            1: 2,
          }}
        />
      </div>
    </>
  )
}
