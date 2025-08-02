"use client"

import { useContext } from "react"
import { Space, Tooltip } from "antd"
import { ThemeContext } from "../../theme-context"

interface ColorSelectorProps {
  colors: { id: number; name: string }[]
  selectedColorId: number | null
  onChange?: (colorId: number | null) => void
}

export default function ColorSelector({ colors, selectedColorId, onChange }: ColorSelectorProps) {
  const { isDarkMode } = useContext(ThemeContext)

  // Color mapping for visual representation
  const colorMap: { [key: string]: string } = {
    Red: "#ef4444",
    Blue: "#3b82f6",
    Green: "#10b981",
    Black: "#000000",
    White: "#ffffff",
    Gray: "#6b7280",
    Brown: "#92400e",
    Pink: "#ec4899",
    Purple: "#8b5cf6",
    Yellow: "#f59e0b",
    Orange: "#f97316",
    Navy: "#1e3a8a",
    Beige: "#f5f5dc",
    Cream: "#fffdd0",
    Tan: "#d2b48c",
  }

  const getColorValue = (colorName: string): string => {
    return colorMap[colorName] || "#6b7280"
  }

  const handleColorClick = (colorId: number) => {
    const newSelectedId = selectedColorId === colorId ? null : colorId
    onChange?.(newSelectedId)
  }

  const getColorButtonStyle = (colorId: number, colorName: string) => {
    const isSelected = selectedColorId === colorId
    const colorValue = getColorValue(colorName)

    return {
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      backgroundColor: colorValue,
      border: `1px solid ${isDarkMode ? "#3f3f46" : "#e5e7eb"}`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      boxShadow: isSelected
        ? `0 0 0 2px ${isDarkMode ? "#18181b" : "#ffffff"}, 0 0 0 4px ${isDarkMode ? "#fbbf24" : "#92400e"}`
        : "0 2px 4px rgba(0,0,0,0.1)",
      transform: isSelected ? "scale(1.1)" : "scale(1)",
    }
  }

  return (
    <Space size="middle" wrap>
      {colors.map((color) => (
        <Tooltip key={color.id} title={color.name} placement="top">
          <div
            style={getColorButtonStyle(color.id, color.name)}
            onClick={() => handleColorClick(color.id)}
            className="hover:scale-110 transition-transform duration-200"
            role="button"
            tabIndex={0}
            aria-label={`Select ${color.name} color`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleColorClick(color.id)
              }
            }}
          >
          </div>
        </Tooltip>
      ))}
    </Space>
  )
}
