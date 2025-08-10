"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Tag,
  Button,
  Typography,
  Divider,
  Steps,
  Row,
  Col,
  Space,
  Timeline,
  Image,
  Alert,
  message,
} from "antd"
import {
  EnvironmentOutlined,
  CalendarOutlined,
  PhoneOutlined,
  CreditCardOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons"
import { Order } from "../interfaces/order.interface"
import { getProductImage } from "@/app/products/product-image"

const { Title, Text } = Typography
const { Step } = Steps

interface OrderDetailProps {
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

const getStatusInfo = (status: string) => {
  const statusLower = status.toLowerCase()

  if (statusLower.includes("delivered")) {
    return {
      tag: <Tag color="gold">Delivered</Tag>,
      step: 3,
      icon: <CheckCircleOutlined />,
      color: "green",
    }
  } else if (statusLower.includes("shipping")) {
    return {
      tag: <Tag color="blue">Shipping</Tag>,
      step: 2,
      icon: <TruckOutlined />,
      color: "blue",
    }
  } else if (statusLower.includes("pending")) {
    return {
      tag: <Tag color="green">Pending</Tag>,
      step: 0,
      icon: <ClockCircleOutlined />,
      color: "green",
    }
  } else if (statusLower.includes("processing")){
    return {
      tag: <Tag color="processing">Processing</Tag>,
      step: 1,
      icon: <ClockCircleOutlined />,
      color: "orange"  
    }
  } else if (statusLower.includes("canceled")) {
    return {
      tag: <Tag color="red">Canceled</Tag>,
      step: 0,
      icon: <ExclamationCircleOutlined />,
      color: "red",
    }
  } else {
    return {
      tag: <Tag color="default">{status}</Tag>,
      step: 0,
      icon: <ClockCircleOutlined />,
      color: "default",
    }
  }
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const getEstimatedArrival = (createdAt: string | Date) => {
  const orderDate = new Date(createdAt)
  const estimatedDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000) // Add 7 days
  return estimatedDate
}

export default function OrderDetail({ order }: OrderDetailProps) {
  // const [cancelModalVisible, setCancelModalVisible] = useState(false)
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

  const statusInfo = getStatusInfo(order.status)
  const estimatedArrival = getEstimatedArrival(order.createdAt)
  const isPending = order.status.toLowerCase() === "pending" || "processing"
  const isCanceled = order.status.toLowerCase().includes("canceled")

//   const handleCancelOrder = async () => {
//     setLoading(true)
//     try {
//       await cancelOrder(order.id)
//       message.success("Order canceled successfully")
//       setCancelModalVisible(false)
//       if (onOrderUpdate) {
//         onOrderUpdate()
//       }
//     } catch (error) {
//       message.error("Failed to cancel order")
//       console.error("Failed to cancel order:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

  const copyOrderId = () => {
    navigator.clipboard.writeText(`#${order.id}`)
    message.success("Order ID copied to clipboard")
  }

  const subtotal = order.orderItems.reduce((sum: number, item) => sum + item.price * item.quantity, 0)
  const shipping = 1 // Example shipping cost
  const tax = subtotal * 0.1 // 10% tax
  const discount = subtotal - order.total + shipping + tax // Calculate discount

  // Mock tracking timeline
  const trackingEvents = [
    {
      title: "Order Placed",
      description: "Your order has been placed successfully",
      time: formatDate(order.createdAt),
      status: "finish",
    },
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being prepared",
      time: new Date(new Date(order.createdAt).getTime() + 2 * 60 * 60 * 1000).toLocaleString(),
      status: statusInfo.step >= 1 ? "finish" : "wait",
    },
    {
      title: "Shipped",
      description: "Your order has been shipped and is on the way",
      time:
        statusInfo.step >= 2
          ? new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000).toLocaleString()
          : "",
      status: statusInfo.step >= 2 ? "finish" : "wait",
    },
    {
      title: "Delivered",
      description: "Your order has been delivered successfully",
      time: statusInfo.step >= 3 ? formatDate(estimatedArrival) : "",
      status: statusInfo.step >= 3 ? "finish" : "wait",
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Title level={2} className="!mb-0">
                  Order #{order.id}
                </Title>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={copyOrderId}
                />
                {statusInfo.tag}
              </div>
              <Text>Placed on {formatDate(order.createdAt)}</Text>
            </div>
            <div className="flex items-center gap-3">
              {isPending && !isCanceled && (
                <Button danger>
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            {/* Order Status */}
            <Card className="mb-6">
              <Title level={4}>
                Order Status
              </Title>
              {!isCanceled ? (
                <Steps current={statusInfo.step} className="!mb-10">
                  <Step title="Order Placed" icon={<CheckCircleOutlined />} />
                  <Step title="Processing" icon={<ClockCircleOutlined />} />
                  <Step title="Shipped" icon={<TruckOutlined />} />
                  <Step title="Delivered" icon={<CheckCircleOutlined />} />
                </Steps>
              ) : (
                <Alert
                  message="Order Canceled"
                  description="This order has been canceled and will not be processed."
                  type="error"
                  showIcon
                  className="!mb-10"
                />
              )}

              <Timeline
                items={trackingEvents
                  .filter((event) => (isCanceled ? event.title === "Order Placed" : true))
                  .map((event) => ({
                    color: event.status === "finish" ? "green" : "gray",
                    children: (
                      <div>
                        <Text strong>
                          {event.title}
                        </Text>
                        <br />
                        <Text>{event.description}</Text>
                        {event.time && (
                          <>
                            <br />
                            <Text className="text-sm">{event.time}</Text>
                          </>
                        )}
                      </div>
                    ),
                  }))}
              />
            </Card>

            {/* Order Items */}
            <Card className="mb-6">
              <Title level={4}>
                Order Items ({order.orderItems.length})
              </Title>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg">
                    <Image
                      src={getProductImage(item.productSize.color.product.id) || "/placeholder.svg"}
                      alt={item.productSize.color.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <Title level={5} className="!mb-1">
                        {item.productSize.color.product.name}
                      </Title>
                      <Space size="middle">
                        <Text>Size: {item.productSize.size.name}</Text>
                        <Text>
                          Color: {item.productSize.color.color.name}
                        </Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </Space>
                    </div>
                    <div className="text-right">
                      <Text className="text-lg font-semibold text-green-600 dark:text-green-400">
                        ${item.price.toLocaleString()}
                      </Text>
                      {item.quantity > 1 && (
                        <>
                          <br />
                          <Text className="text-sm">
                            ${(item.price * item.quantity).toLocaleString()} total
                          </Text>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={8}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <Title level={4}>
                Shipping Information
              </Title>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarOutlined />
                  <div>
                    <Text className="text-sm">Estimated Delivery</Text>
                    <br />
                    <Text className="font-medium">{formatDate(estimatedArrival)}</Text>
                  </div>
                </div>

                <Divider />

                <div className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1" />
                  <div>
                    <Text className="text-sm">Delivery Address</Text>
                    <br />
                    <Text className="font-medium">{order.address.name}</Text>
                    <br />
                    <Text>{order.address.address}</Text>
                    <br />
                    <Text>
                      {locationText.ward}, {locationText.district}, {locationText.city}
                    </Text>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneOutlined />
                  <div>
                    <Text className="text-sm">Phone Number</Text>
                    <br />
                    <Text className="font-medium">{order.address.phoneNumber}</Text>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Information */}
            <Card className="mb-6">
              <Title level={4}>
                Payment Information
              </Title>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCardOutlined />
                  <div>
                    <Text className="text-sm">Payment Method</Text>
                    <br />
                    <Text className="font-medium">{order.paymentMethod.name}</Text>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card>
              <Title level={4}>
                Order Summary
              </Title>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Subtotal</Text>
                  <Text>${subtotal.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Shipping</Text>
                  <Text>${shipping.toLocaleString()}</Text>
                </div>
                {/* <div className="flex justify-between">
                  <Text>Tax</Text>
                  <Text>${tax.toLocaleString()}</Text>
                </div> */}
                {discount > 0 && (
                  <div className="flex justify-between">
                    <Text className="text-green-600 dark:text-green-400">Discount</Text>
                    <Text className="text-green-600 dark:text-green-400">-${discount.toLocaleString()}</Text>
                  </div>
                )}
                <Divider className="dark:border-gray-600" />
                <div className="flex justify-between">
                  <Text className="text-lg font-semibol">Total</Text>
                  <Text className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${order.total.toLocaleString()}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Cancel Order Modal */}
        {/* <Modal
          title="Cancel Order"
          open={cancelModalVisible}
          onOk={handleCancelOrder}
          onCancel={() => setCancelModalVisible(false)}
          confirmLoading={loading}
          okText="Yes, Cancel Order"
          cancelText="Keep Order"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
          <p>
            <strong>Order #{order.id}</strong> - ${order.total.toLocaleString()}
          </p>
        </Modal> */}
      </div>
    </div>
  )
}
