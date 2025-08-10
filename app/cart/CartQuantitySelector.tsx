"use client"

import { useContext } from "react"
import { Button, InputNumber, Space } from "antd"
import { ThemeContext } from "../theme-context"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

interface CartQuantitySelectorProps {
  quantity: number
  cartItemId: number
  onUpdateQuantity: (cartItemId: number, quantity: number) => void
  maxStock?: number
}

export default function CartQuantitySelector({
  quantity,
  cartItemId,
  onUpdateQuantity,
  maxStock = 99,
}: CartQuantitySelectorProps) {
  const { isDarkMode } = useContext(ThemeContext)

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(cartItemId, quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxStock) {
      onUpdateQuantity(cartItemId, quantity + 1)
    }
  }

  const handleInputChange = (value: number | null) => {
    if (value && value >= 1 && value <= maxStock) {
      onUpdateQuantity(cartItemId, value)
    }
  }

  const buttonStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  const inputStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  return (
    <Space.Compact>
      <Button
        icon={<MinusOutlined />}
        onClick={handleDecrease}
        disabled={quantity <= 1}
        size="small"
        style={buttonStyle}
      />
      <InputNumber
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={maxStock}
        size="small"
        controls={false}
        style={{ width: 50, textAlign: "center", ...inputStyle, paddingLeft: 8 }}
      />
      <Button
        icon={<PlusOutlined />}
        onClick={handleIncrease}
        disabled={quantity >= maxStock}
        size="small"
        style={buttonStyle}
      />
    </Space.Compact>
  )
}
