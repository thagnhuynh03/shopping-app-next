"use client"

import { useContext, useState, useEffect } from "react"
import { Button, InputNumber, Space } from "antd"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { ThemeContext } from "../../theme-context"

interface QuantitySelectorProps {
  max: number
  value: number
  onChange: (value: number) => void
  min?: number
  size?: "small" | "middle" | "large"
  disabled?: boolean
}

export function QuantitySelector({
  max,
  value,
  onChange,
  min = 1,
  size = "large",
  disabled = false,
}: QuantitySelectorProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleDecrease = () => {
    if (internalValue > min && !disabled) {
      const newValue = internalValue - 1
      setInternalValue(newValue)
      onChange(newValue)
    }
  }

  const handleIncrease = () => {
    if (internalValue < max && !disabled) {
      const newValue = internalValue + 1
      setInternalValue(newValue)
      onChange(newValue)
    }
  }

  const handleInputChange = (newValue: number | null) => {
    if (newValue === null) return
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setInternalValue(clampedValue)
    onChange(clampedValue)
  }

  const isDecreaseDisabled = disabled || internalValue <= min
  const isIncreaseDisabled = disabled || internalValue >= max

  const buttonStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  const disabledButtonStyle = {
    backgroundColor: isDarkMode ? "#1f1f23" : "#f5f5f5",
    borderColor: isDarkMode ? "#2d2d30" : "#d9d9d9",
    color: isDarkMode ? "#4a4a4a" : "#bfbfbf",
  }

  const inputStyle = {
    backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
    borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
    color: isDarkMode ? "#e4e4e7" : "#18181b",
  }

  return (
    <Space direction="vertical" size="small">
      <Space.Compact>
        <Button
          icon={<MinusOutlined />}
          onClick={handleDecrease}
          disabled={isDecreaseDisabled}
          size={size}
          style={isDecreaseDisabled ? disabledButtonStyle : buttonStyle}
          className="transition-all duration-200"
          aria-label="Decrease quantity"
        />
        <InputNumber
          value={internalValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          size={size}
          disabled={disabled}
          controls={false}
          style={{
            width: 60,
            paddingLeft: 12,
            ...inputStyle
          }}
          aria-label="Quantity"
        />
        <Button
          icon={<PlusOutlined />}
          onClick={handleIncrease}
          disabled={isIncreaseDisabled}
          size={size}
          style={isIncreaseDisabled ? disabledButtonStyle : buttonStyle}
          className="transition-all duration-200"
          aria-label="Increase quantity"
        />
      </Space.Compact>
    </Space>
  )
}
