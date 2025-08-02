"use client"

import { useContext } from "react"
import { Space, Button } from "antd"
import { ThemeContext } from "../../theme-context"

interface SizeSelectorProps {
  sizes: string[]
  selected: string | null
  onChange: (value: string | null) => void
  disabledSizes?: string[]
}

export function SizeSelector({ sizes, selected, onChange, disabledSizes = [] }: SizeSelectorProps) {
  const { isDarkMode } = useContext(ThemeContext)

  const handleSizeClick = (size: string) => {
    const newSelected = selected === size ? null : size
    onChange(newSelected)
  }

  const getSizeButtonStyle = (size: string) => {
    const isSelected = selected === size
    const isDisabled = disabledSizes.includes(size)

    if (isDisabled) {
      return {
        backgroundColor: isDarkMode ? "#1f1f23" : "#f5f5f5",
        borderColor: isDarkMode ? "#2d2d30" : "#d9d9d9",
        color: isDarkMode ? "#4a4a4a" : "#bfbfbf",
        cursor: "not-allowed",
        opacity: 0.5,
      }
    }

    if (isSelected) {
      return {
        backgroundColor: isDarkMode ? "#fbbf24" : "#92400e",
        borderColor: isDarkMode ? "#fbbf24" : "#92400e",
        color: "#ffffff",
        fontWeight: "600",
        boxShadow: `0 0 0 2px ${isDarkMode ? "#18181b" : "#ffffff"}, 0 0 0 4px ${isDarkMode ? "#fbbf24" : "#92400e"}`,
      }
    }

    return {
      backgroundColor: isDarkMode ? "#27272a" : "#ffffff",
      borderColor: isDarkMode ? "#3f3f46" : "#d9d9d9",
      color: isDarkMode ? "#e4e4e7" : "#18181b",
    }
  }

  return (
    <Space size="middle" wrap>
      {sizes.map((size) => (
        <Button
          key={size}
          size="large"
          disabled={disabledSizes.includes(size)}
          onClick={() => handleSizeClick(size)}
          style={{
            minWidth: "40px",
            height: "40px",
            borderRadius: "8px",
            fontWeight: selected === size ? "600" : "500",
            transition: "all 0.3s ease",
            ...getSizeButtonStyle(size),
          }}
          className={`
            ${selected === size ? "shadow-lg" : ""}
            ${!disabledSizes.includes(size) ? "hover:scale-105" : ""}
            transition-transform duration-200
          `}
        >
          {size}
        </Button>
      ))}
    </Space>
  )
}
