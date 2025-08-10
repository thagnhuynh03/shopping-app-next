"use client"

import { useContext } from "react"
import { Table, Button, Typography, Space, Card, Row, Col, Divider, Empty, Image, Popconfirm, message } from "antd"
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Link from "next/link"
import { getProductImage } from "../products/product-image"
import { removeFromCart, updateCartQuantity } from "./get-carts"
import { useRouter } from "next/navigation"
import { ThemeContext } from "../theme-context"
import { CartItem, CartTableItem } from "./interface/cart.interface"
import CartColorSelector from "./CartColorSelector"
import CartSizeSelector from "./CartSizeSelector"
import CartQuantitySelector from "./CartQuantitySelector"

const { Title, Text } = Typography
const { Column } = Table

interface CartPageProps {
  cart: CartItem[]
}

function ccyFormat(num: number) {
  return `$${num.toFixed(2)}`
}

export default function CartPage({ cart }: CartPageProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId)
      messageApi.success("Item removed from cart")
      router.refresh()
    } catch (error) {
      messageApi.error("Failed to remove item" + error)
    }
  }

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartQuantity(cartItemId, quantity)
      router.refresh()
    } catch (error) {
      messageApi.error("Failed to update quantity" + error)
    }
  }

  if (!cart || cart.length === 0) {
    return (
      <>
        {contextHolder}
        <div className="container mx-auto px-4 py-8">
          <Card
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text
                  style={{
                    color: isDarkMode ? "#a1a1aa" : "#6b7280",
                    fontSize: "16px",
                  }}
                >
                  Your cart is empty
                </Text>
              }
            >
              <Link href="/products">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    backgroundColor: isDarkMode ? "#d97706" : "#f59e0b",
                    borderColor: isDarkMode ? "#d97706" : "#f59e0b",
                  }}
                >
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </Card>
        </div>
      </>
    )
  }

  // Transform cart items for table
  const dataSource: CartTableItem[] = cart.map((item: CartItem) => {
    const productId = item.product?.color?.product?.id || item.product?.product?.id
    return {
      key: item.id,
      id: item.id,
      image: getProductImage(productId ?? 0),
      name: item.product?.color?.product?.name || item.product?.product?.name || "-",
      color: item.product?.color?.color?.name || "-",
      size: item.product?.size?.name || "-",
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      availableColorsForSize: item.availableColorsForSize || [],
      currentProductSizeId: item.productSizeId,
      availableSizesForColor: item.availableSizesForColor || [],
    }
  })

  const subtotal = dataSource.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const cardStyle = {
    backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
    borderColor: isDarkMode ? "#3f3f46" : "#e5e7eb",
  }

  const tableStyle = {
    backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
  }

  return (
    <>
      {contextHolder}
      <div className="container mx-1 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Title
            level={1}
            style={{
              color: isDarkMode ? "#e4e4e7" : "#18181b",
              fontFamily: "serif",
              marginBottom: "8px",
            }}
          >
            Shopping Cart
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          {/* Cart Items - Desktop Table View */}
          <Col xs={24} lg={16}>
            <Card style={cardStyle} className="hidden md:block">
              <Table
                dataSource={dataSource}
                pagination={false}
                style={tableStyle}
                className={isDarkMode ? "dark-table" : ""}
                scroll={{ x: 800 }}
              >
                <Column
                  title="Product"
                  key="product"
                  width={300}
                  render={(_, record: CartTableItem) => (
                    <Space>
                      <Image
                        src={record.image || "/placeholder.svg"}
                        alt={record.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        preview={false}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            color: isDarkMode ? "#e4e4e7" : "#18181b",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          {record.name}
                        </Text>
                      </div>
                    </Space>
                  )}
                />

                <Column
                  title="Color"
                  key="color"
                  width={140}
                  render={(_, record: CartTableItem) => (
                    <CartColorSelector
                      cartItemId={record.id}
                      currentProductSizeId={record.currentProductSizeId}
                      availableColorsForSize={record.availableColorsForSize}
                    />
                  )}
                />

                <Column
                  title="Size"
                  key="size"
                  width={100}
                  render={(_, record: CartTableItem) => (
                    <CartSizeSelector
                      cartItemId={record.id}
                      currentProductSizeId={record.currentProductSizeId}
                      availableSizesForColor={record.availableSizesForColor}
                    />
                  )}
                />

                <Column
                  title="Quantity"
                  key="quantity"
                  width={140}
                  render={(_, record: CartTableItem) => (
                    <CartQuantitySelector
                      quantity={record.quantity}
                      cartItemId={record.id}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  )}
                />

                <Column
                  title="Price"
                  key="price"
                  width={100}
                  render={(_, record: CartTableItem) => (
                    <Text
                      style={{
                        color: isDarkMode ? "#10b981" : "#059669",
                        fontWeight: 600,
                      }}
                    >
                      {ccyFormat(record.price)}
                    </Text>
                  )}
                />

                <Column
                  title="Total"
                  key="total"
                  width={120}
                  render={(_, record: CartTableItem) => (
                    <Text
                      strong
                      style={{
                        color: isDarkMode ? "#10b981" : "#059669",
                        fontSize: "16px",
                      }}
                    >
                      {ccyFormat(record.total)}
                    </Text>
                  )}
                />

                <Column
                  title=""
                  key="action"
                  width={60}
                  render={(_, record: CartTableItem) => (
                    <Popconfirm
                      title="Remove item"
                      description="Are you sure you want to remove this item?"
                      onConfirm={() => handleRemoveItem(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                  )}
                />
              </Table>
            </Card>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
              {dataSource.map((item) => (
                <Card key={item.id} style={cardStyle} size="small">
                  <Row gutter={[16, 16]} align="middle">
                    <Col span={6}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                        preview={false}
                      />
                    </Col>
                    <Col span={18}>
                      <div className="space-y-2">
                        <Text
                          strong
                          style={{
                            color: isDarkMode ? "#e4e4e7" : "#18181b",
                            display: "block",
                          }}
                        >
                          {item.name}
                        </Text>

                        <Row gutter={[8, 8]}>
                          <Col span={12}>
                            <Text
                              style={{
                                color: isDarkMode ? "#a1a1aa" : "#6b7280",
                                fontSize: "12px",
                                display: "block",
                              }}
                            >
                              Color:
                            </Text>
                            <CartColorSelector
                              cartItemId={item.id}
                              currentProductSizeId={item.currentProductSizeId}
                              availableColorsForSize={item.availableColorsForSize}
                            />
                          </Col>
                          <Col span={12}>
                            <Text
                              style={{
                                color: isDarkMode ? "#a1a1aa" : "#6b7280",
                                fontSize: "12px",
                                display: "block",
                              }}
                            >
                              Size:
                            </Text>
                            <CartSizeSelector
                              cartItemId={item.id}
                              currentProductSizeId={item.currentProductSizeId}
                              availableSizesForColor={item.availableSizesForColor}
                            />
                          </Col>
                        </Row>

                        <Row justify="space-between" align="middle">
                          <Col>
                            <CartQuantitySelector
                              quantity={item.quantity}
                              cartItemId={item.id}
                              onUpdateQuantity={handleUpdateQuantity}
                            />
                          </Col>
                          <Col>
                            <Text
                              strong
                              style={{
                                color: isDarkMode ? "#10b981" : "#059669",
                                fontSize: "16px",
                              }}
                            >
                              {ccyFormat(item.total)}
                            </Text>
                          </Col>
                          <Col>
                            <Popconfirm
                              title="Remove item"
                              description="Are you sure?"
                              onConfirm={() => handleRemoveItem(item.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card
              title={
                <Text
                  style={{
                    color: isDarkMode ? "#e4e4e7" : "#18181b",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Order Summary
                </Text>
              }
              style={cardStyle}
            >
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <Row justify="space-between">
                  <Text style={{ color: isDarkMode ? "#d4d4d8" : "#374151" }}>Subtotal ({cart.length} items)</Text>
                  <Text
                    style={{
                      color: isDarkMode ? "#10b981" : "#059669",
                      fontWeight: 600,
                    }}
                  >
                    {ccyFormat(subtotal)}
                  </Text>
                </Row>

                <Row justify="space-between">
                  <Text style={{ color: isDarkMode ? "#d4d4d8" : "#374151" }}>Tax (8%)</Text>
                  <Text
                    style={{
                      color: isDarkMode ? "#d4d4d8" : "#374151",
                    }}
                  >
                    {ccyFormat(tax)}
                  </Text>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Row justify="space-between">
                  <Text
                    strong
                    style={{
                      color: isDarkMode ? "#e4e4e7" : "#18181b",
                      fontSize: "18px",
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    strong
                    style={{
                      color: isDarkMode ? "#10b981" : "#059669",
                      fontSize: "20px",
                    }}
                  >
                    {ccyFormat(total)}
                  </Text>
                </Row>

                <Link href="/checkout" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      backgroundColor: isDarkMode ? "#d97706" : "#f59e0b",
                      borderColor: isDarkMode ? "#d97706" : "#f59e0b",
                      height: "48px",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    type="default"
                    size="large"
                    block
                    style={{
                      backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
                      borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
                      color: isDarkMode ? "#e4e4e7" : "#18181b",
                      height: "40px",
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .dark-table .ant-table {
          background-color: #18181b !important;
          color: #e4e4e7 !important;
        }

        .dark-table .ant-table-thead > tr > th {
          background-color: #27272a !important;
          color: #e4e4e7 !important;
          border-bottom: 1px solid #3f3f46 !important;
        }

        .dark-table .ant-table-tbody > tr > td {
          background-color: #18181b !important;
          color: #e4e4e7 !important;
          border-bottom: 1px solid #3f3f46 !important;
        }

        .dark-table .ant-table-tbody > tr:hover > td {
          background-color: #27272a !important;
        }

        .dark-select .ant-select-selector {
          background-color: #27272a !important;
          border-color: #3f3f46 !important;
          color: #e4e4e7 !important;
        }

        .dark-select .ant-select-arrow {
          color: #e4e4e7 !important;
        }

        @media (max-width: 768px) {
          .ant-table-scroll {
            overflow-x: auto;
          }
        }
      `}</style>
    </>
  )
}
