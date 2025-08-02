"use client"

import { useContext, useState, useMemo } from "react"
import {
  Tabs,
  Typography,
  Rate,
  Avatar,
  Divider,
  Row,
  Col,
  Progress,
  Card,
  Image,
  Dropdown,
  Menu,
  Button,
} from "antd"
import { UserOutlined, StarFilled, DownOutlined } from "@ant-design/icons"
import { ThemeContext } from "../../theme-context"
import type { MenuProps } from "antd"

const { Title, Text, Paragraph } = Typography

interface ReviewImage {
  id: number
  url: string
  alt?: string
}

interface Review {
  id: number
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  images?: ReviewImage[]
}

interface ProductTabsProps {
  description: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
  ratingDistribution?: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

const filterOptions = ["All", "5", "4", "3", "2", "1"]

export function ProductTabs({
  description,
  averageRating,
  totalReviews,
  reviews,
  ratingDistribution = { 5: 45, 4: 25, 3: 15, 2: 10, 1: 5 },
}: ProductTabsProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | "All">("All")

  const tabsStyle = {
    backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  const cardStyle = {
    backgroundColor: "transparent",
    borderColor: isDarkMode ? "#3f3f46" : "#e5e7eb",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderRadius: 0
  }

  // Filter reviews based on selected rating
  const filteredReviews = useMemo(() => {
    if (selectedRatingFilter === "All") {
      return reviews
    }
    return reviews.filter((review) => review.rating === selectedRatingFilter)
  }, [reviews, selectedRatingFilter])

  // Get count for each rating for the filter badges
  const ratingCounts = useMemo(() => {
    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1
    })
    return counts
  }, [reviews])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "#52c41a" // Green
    if (rating >= 3) return "#faad14" // Yellow
    return "#ff4d4f" // Red
  }

  const handleRatingFilterChange: MenuProps["onClick"] = (e) => {
    setSelectedRatingFilter(e.key === "All" ? "All" : Number.parseInt(e.key))
  }

  const renderReviewImages = (images: ReviewImage[]) => {
    if (!images || images.length === 0) return null

    return (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <Image.PreviewGroup>
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: isDarkMode ? "#3f3f46" : "#f3f4f6",
                  border: `1px solid ${isDarkMode ? "#52525b" : "#e5e7eb"}`,
                }}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || `Review image ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    borderRadius: "6px",
                  }}
                  preview={{
                    mask: (
                      <div
                        className="flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        View
                      </div>
                    ),
                  }}
                />
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
        {images.length > 4 && (
          <Text
            className="text-xs mt-2 block"
            style={{
              color: isDarkMode ? "#a1a1aa" : "#6b7280",
            }}
          >
            +{images.length - 4} more images
          </Text>
        )}
      </div>
    )
  }

  const getFilterLabel = (filter: number | "All") => {
    if (filter === "All") {
      return `All Reviews (${totalReviews})`
    }
    return (<span>{filter} <StarFilled style={{
        color: "#faad14",
        fontSize: "12px",
      }}
    /> ({ratingCounts[filter]})</span>)
  }

  const filterMenu = (
    <Menu
      onClick={handleRatingFilterChange}
      selectedKeys={[selectedRatingFilter.toString()]}
      items={filterOptions.map((option) => ({
        key: option,
        label: (<div>{option} <span>({option == "All" ? totalReviews: ratingCounts[parseInt(option)]})</span></div>),
      }))}
      style={{
        backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
        borderColor: isDarkMode ? "#3f3f46" : "#e5e7eb",
        color: isDarkMode ? "#e4e4e7" : "#18181b",
      }}
      theme={isDarkMode ? "dark" : "light"}
    />
  )

  const renderDescription = () => (
    <div className="py-6">
      <Title
        level={3}
        className="mb-4"
        style={{
          color: isDarkMode ? "#e4e4e7" : "#18181b",
          fontFamily: "serif",
        }}
      >
        Product Description
      </Title>
      <Paragraph
        className="text-base leading-relaxed"
        style={{
          color: isDarkMode ? "#d4d4d8" : "#374151",
          fontSize: "16px",
          lineHeight: "1.7",
        }}
      >
        {description}
      </Paragraph>

      {/* Additional product details */}
      <div className="mt-8">
        <Title
          level={4}
          className="mb-4"
          style={{
            color: isDarkMode ? "#e4e4e7" : "#18181b",
            fontFamily: "serif",
          }}
        >
          Product Features
        </Title>
        <ul
          className="space-y-2"
          style={{
            color: isDarkMode ? "#d4d4d8" : "#374151",
          }}
        >
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
            Authentic vintage design with modern comfort
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
            High-quality materials and craftsmanship
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
            Sustainable and eco-friendly fashion choice
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
            Perfect for layering and versatile styling
          </li>
        </ul>
      </div>

      {/* Care Instructions */}
      <div className="mt-8">
        <Title
          level={4}
          className="mb-4"
          style={{
            color: isDarkMode ? "#e4e4e7" : "#18181b",
            fontFamily: "serif",
          }}
        >
          Care Instructions
        </Title>
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: isDarkMode ? "#27272a" : "#f9fafb",
            border: `1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
          }}
        >
          <ul
            className="space-y-1 text-sm"
            style={{
              color: isDarkMode ? "#d4d4d8" : "#374151",
            }}
          >
            <li>• Machine wash cold with like colors</li>
            <li>• Do not bleach or use fabric softener</li>
            <li>• Tumble dry low or hang to dry</li>
            <li>• Iron on low heat if needed</li>
            <li>• Store in a cool, dry place</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderRatingsAndReviews = () => (
    <div className="py-6">
      <Title
        level={3}
        className="mb-6"
        style={{
          color: isDarkMode ? "#e4e4e7" : "#18181b",
          fontFamily: "serif",
        }}
      >
        Ratings
      </Title>

      {/* Rating Summary */}
      <Row gutter={[32, 24]} className="mb-8">
        <Col xs={24} md={8}>
          <div className="text-center">
            <div className="mb-2">
              <span
                className="text-4xl font-bold"
                style={{
                  color: isDarkMode ? "#e4e4e7" : "#18181b",
                }}
              >
                {averageRating.toFixed(1)}
              </span>
            </div>
            <Rate disabled allowHalf value={averageRating} className="mb-2" style={{ fontSize: "20px" }} />
            <Text
              className="block"
              style={{
                color: isDarkMode ? "#a1a1aa" : "#6b7280",
                fontSize: "14px",
              }}
            >
              Based on {totalReviews} reviews
            </Text>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <Text
                    style={{
                      color: isDarkMode ? "#d4d4d8" : "#374151",
                      fontSize: "14px",
                    }}
                  >
                    {star}
                  </Text>
                  <StarFilled
                    style={{
                      color: "#faad14",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <Progress
                  percent={(ratingDistribution[star as keyof typeof ratingDistribution] / totalReviews) * 100}
                  showInfo={false}
                  strokeColor={getRatingColor(star)}
                  trailColor={isDarkMode ? "#3f3f46" : "#f0f0f0"}
                  className="flex-1"
                />
                <Text
                  className="w-8 text-right"
                  style={{
                    color: isDarkMode ? "#a1a1aa" : "#6b7280",
                    fontSize: "12px",
                  }}
                >
                  {ratingDistribution[star as keyof typeof ratingDistribution]}
                </Text>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <Divider style={{ borderColor: isDarkMode ? "#3f3f46" : "#e5e7eb" }} />

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Title
            level={4}
            style={{
              color: isDarkMode ? "#e4e4e7" : "#18181b",
              fontFamily: "serif",
              margin: 0,
            }}
          >
            Reivews
          </Title>
          <Dropdown popupRender={() => filterMenu} trigger={["click"]} placement="bottomRight">
          <Button
            className="filter-dropdown-button"
            style={{
              backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
              borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
              color: isDarkMode ? "#e4e4e7" : "#18181b",
              minWidth: "180px",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            {getFilterLabel(selectedRatingFilter)}
            <DownOutlined />
          </Button>
        </Dropdown>
        </div>

        {filteredReviews.length === 0 ? (
          <div
            className="text-center py-12"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#f9fafb",
              borderRadius: "8px",
              border: `1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
            }}
          >
            <Text
              style={{
                color: isDarkMode ? "#a1a1aa" : "#6b7280",
                fontSize: "16px",
              }}
            >
              No reviews found for {selectedRatingFilter} <StarFilled style={{
                      color: "#faad14",
                      fontSize: "12px",
                    }}
                  /> rating.
            </Text>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id} className="review-card" style={cardStyle} styles={{ body: { padding: "20px" } }}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar and User Info */}
                <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center sm:min-w-[100px]">
                  <Avatar
                    size={48}
                    src={review.userAvatar}
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: isDarkMode ? "#3f3f46" : "#f0f0f0",
                      color: isDarkMode ? "#d4d4d8" : "#374151",
                    }}
                  />
                  <div className="sm:mt-2">
                    <Text
                      className="block font-medium"
                      style={{
                        color: isDarkMode ? "#e4e4e7" : "#18181b",
                        fontSize: "14px",
                      }}
                    >
                      {review.userName}
                    </Text>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <Rate disabled value={review.rating} style={{ fontSize: "16px" }} />
                    <Text
                      className="text-sm mt-1 sm:mt-0"
                      style={{
                        color: isDarkMode ? "#a1a1aa" : "#6b7280",
                      }}
                    >
                      {formatDate(review.date)}
                    </Text>
                  </div>
                  <Paragraph
                    className="mb-0"
                    style={{
                      color: isDarkMode ? "#d4d4d8" : "#374151",
                      fontSize: "15px",
                      lineHeight: "1.6",
                    }}
                  >
                    {review.comment}
                  </Paragraph>

                  {/* Review Images */}
                  {review.images && renderReviewImages(review.images)}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Load More Reviews Button */}
      {reviews.length < totalReviews && selectedRatingFilter === "All" && (
        <div className="text-center mt-8">
          <button
            className="px-6 py-2 rounded-lg border transition-colors"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
              borderColor: isDarkMode ? "#3f3f46" : "#d1d5db",
              color: isDarkMode ? "#e4e4e7" : "#374151",
            }}
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full mt-8">
      <Tabs
        defaultActiveKey="description"
        size="large"
        items={[{ 
            key: "description",
            label: "Description",
            children: renderDescription()
        },
        {
            key: "reviews",
            label: "Reviews",
            children: renderRatingsAndReviews()
        }]}
        className="product-tabs"
        style={tabsStyle}
        tabBarStyle={{
          borderBottom: `1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
          marginBottom: 0,
        }}
      />

      <style jsx global>{`
        .product-tabs .ant-tabs-tab {
          font-size: 16px !important;
          font-weight: 500 !important;
          padding: 12px 24px !important;
          color: ${isDarkMode ? "#a1a1aa" : "#6b7280"} !important;
        }

        .product-tabs .ant-tabs-tab-active {
          color: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
        }

        .product-tabs .ant-tabs-ink-bar {
          background: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
          height: 3px !important;
        }

        .product-tabs .ant-tabs-content-holder {
          background: ${isDarkMode ? "#18181b" : "#ffffff"} !important;
        }

        .filter-dropdown-button {
          background: ${isDarkMode ? "#18181b" : "#ffffff"} !important;
          border-color: ${isDarkMode ? "#3f3f46" : "#d9d9d9"} !important;
          color: ${isDarkMode ? "#e4e4e7" : "#18181b"} !important;
          transition: all 0.3s ease !important;
        }

        .filter-dropdown-button:hover {
          border-color: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
          color: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
        }

        .ant-dropdown-menu {
          background-color: ${isDarkMode ? "#27272a" : "#ffffff"} !important;
          border: 1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"} !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, ${isDarkMode ? "0.3" : "0.1"}) !important;
        }

        .ant-dropdown-menu-item {
          color: ${isDarkMode ? "#d4d4d8" : "#374151"} !important;
        }

        .ant-dropdown-menu-item:hover {
          background-color: ${isDarkMode ? "#3f3f46" : "#f0f0f0"} !important;
        }

        .ant-dropdown-menu-item-selected {
          background-color: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
          color: ${isDarkMode ? "#18181b" : "#ffffff"} !important;
        }

        .ant-dropdown-menu-item-selected .ant-badge-count {
          background-color: ${isDarkMode ? "#18181b" : "#ffffff"} !important;
          color: ${isDarkMode ? "#fbbf24" : "#92400e"} !important;
        }

        .ant-badge-count {
          font-size: 10px !important;
          min-width: 16px !important;
          height: 16px !important;
          line-height: 14px !important;
          padding: 0 4px !important;
        }

        @media (max-width: 768px) {
          .product-tabs .ant-tabs-tab {
            padding: 12px 16px !important;
            font-size: 14px !important;
          }

          .filter-dropdown-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
