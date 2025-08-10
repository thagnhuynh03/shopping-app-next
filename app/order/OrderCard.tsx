"use client"

import { useState, useEffect, useContext } from "react"
import { Card, Tag, Button, Typography, Divider } from "antd"
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons"
import Image from "next/image"
import type { Order } from "./interfaces/order.interface"
import { getProductImage } from "../products/product-image"
import { cancelOrder } from "./action/cancel-order"
import { ThemeContext } from "../theme-context"
import Link from "next/link"

const { Text, Title } = Typography

interface OrderCardProps {
  order: Order
  onOrderUpdate?: () => void
}

interface Province {
  code: number
  name: string
}

interface District {
  code: number
  name: string
}

interface Ward {
  code: number
  name: string
}

interface ProvinceWithDistricts {
  districts?: District[]
}

interface DistrictWithWards {
  wards?: Ward[]
}

interface LocationData {
  city: string
  district: string
  ward: string
}

// Helper function to get location text from API
const getLocationText = async (city: number, district: number, ward: number): Promise<LocationData> => {
  try {
    const provincesResponse = await fetch("https://provinces.open-api.vn/api/p/")
    const provinces: Province[] = await provincesResponse.json()

    const province = provinces.find((p: Province) => p.code === city)
    if (!province) {
      return {
        city: `City ${city}`,
        district: `District ${district}`,
        ward: `Ward ${ward}`,
      }
    }

    const districtsResponse = await fetch(`https://provinces.open-api.vn/api/p/${city}?depth=2`)
    const provinceWithDistricts: ProvinceWithDistricts = await districtsResponse.json()

    const districtData = provinceWithDistricts.districts?.find((d: District) => d.code === district)
    if (!districtData) {
      return {
        city: province.name,
        district: `District ${district}`,
        ward: `Ward ${ward}`,
      }
    }

    const wardsResponse = await fetch(`https://provinces.open-api.vn/api/d/${district}?depth=2`)
    const districtWithWards: DistrictWithWards = await wardsResponse.json()

    const wardData = districtWithWards.wards?.find((w: Ward) => w.code === ward)

    return {
      city: province.name,
      district: districtData.name,
      ward: wardData ? wardData.name : `Ward ${ward}`,
    }
  } catch (error) {
    console.error("Error fetching location data:", error)
    return {
      city: `City ${city}`,
      district: `District ${district}`,
      ward: `Ward ${ward}`,
    }
  }
}

const getStatusTag = (status: string) => {
  const statusLower = status.toLowerCase()

  if (statusLower.includes("pending")) {
    return <Tag color="green">On Pending</Tag>
  } else if (statusLower.includes("processing")) {
    return <Tag color="processing">On Processing</Tag>
  } else if (statusLower.includes("shipping")) {
    return <Tag color="blue">On Shipping</Tag>
  } if (statusLower.includes("delivered")) {
    return <Tag color="gold">Delivered</Tag>
  } else if (statusLower.includes("canceled")) {
    return <Tag color="red">Canceled</Tag>
  } else {
    return <Tag color="default">{status}</Tag>
  }
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const getEstimatedArrival = (createdAt: string) => {
  const orderDate = new Date(createdAt)
  const estimatedDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000) // Add 7 days
  return formatDate(estimatedDate.toISOString())
}

export default function OrderCard({ order, onOrderUpdate }: OrderCardProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)
  const [locationText, setLocationText] = useState({
    city: `City ${order.address.city}`,
    district: `District ${order.address.district}`,
    ward: `Ward ${order.address.ward}`,
  })

  useEffect(() => {
    const fetchLocationData = async () => {
      const location = await getLocationText(
        Number(order.address.city),
        Number(order.address.district),
        Number(order.address.ward),
      )
      setLocationText(location)
    }

    fetchLocationData()
  }, [order.address.city, order.address.district, order.address.ward])

  const handleCancelOrder = async () => {
    setLoading(true)
    try {
      await cancelOrder(order.id)
      if (onOrderUpdate) {
        onOrderUpdate()
      }
    } catch (error) {
      console.error("Failed to cancel order:", error)
    } finally {
      setLoading(false)
    }
  }

  const isPending = order.status.toLowerCase() === "pending"
  const estimatedArrival = getEstimatedArrival(order.createdAt.toString())

  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col" styles={{ body: { padding: "10px 20px" } }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <Text className="text-sm">Order ID</Text>
          <Title level={4} className="!mb-0 !mt-1">
            #{order.id}
          </Title>
        </div>
        <div className="text-right flex gap-2">
          <div className="flex items-center gap-2">
            <CalendarOutlined />
            <Text className="text-sm">Estimated arrival: {estimatedArrival}</Text>
          </div>
          {getStatusTag(order.status)}
        </div>
      </div>

      {/* Shipping Route */}
      <div className="mb-4 flex justify-end">
        <div className={`${isDarkMode ? "bg-gray-700 border-gray-500" : "bg-gray-50 border-gray-200"}  border rounded-2xl py-1.5 px-3 space-x-2`}>
          <EnvironmentOutlined />
          <Text>
            {order.address.name}&apos;House, {locationText.city}
          </Text>
        </div>

      </div>

      {/* Products */}
      <div className={`${order.orderItems.length > 2 ? "overflow-x-auto" : ""} mb-2 pb-2`}>
        <div className={`flex gap-4 ${order.orderItems.length > 2 ? "w-max" : "grid grid-cols-1 md:grid-cols-2"}`}>
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className={`${order.orderItems.length > 2 ? "min-w-[280px]" : "w-full"} ${isDarkMode ? "bg-[#2C2933] border-gray-500" : "bg-white border-gray-100"} border rounded-xl p-4`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={getProductImage(item.productSize.color.product.id) || "/placeholder.svg"}
                  alt={item.productSize.color.product.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Title level={5} className="!mb-1 truncate">
                    {item.productSize.color.product.name}
                  </Title>
                  <Text className="text-lg font-semibold">
                    ${item.price.toLocaleString()} <Text className="text-sm">x{item.quantity}</Text>
                  </Text>
                  <div className="mt-1">
                    <Text className="text-sm">Size: {item.productSize.size.name}</Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider className="my-2" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div>
          <Text className="text-lg font-semibold">
            ${order.total.toLocaleString()}
            <Text className="text-sm ml-1">
              ({order.orderItems.length} {order.orderItems.length === 1 ? "item" : "items"})
            </Text>
          </Text>
        </div>
        <div className="space-x-2">
          {isPending && (
            <Button danger loading={loading} onClick={handleCancelOrder} className="!rounded-full px-6">
              Cancel Order
            </Button>
          )}
          <Link href={`/order/${order.id}`}>
            <Button type="primary" className="!rounded-full px-6">
              Details
            </Button>
          </Link>
          
        </div>
      </div>
    </Card>
  )
}
