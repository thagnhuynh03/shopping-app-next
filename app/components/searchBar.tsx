"use client"

import { useEffect, useRef, useCallback } from "react"
import { Input, InputRef } from "antd"
import { SearchOutlined } from "@ant-design/icons"

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
}

export function SearchBar({ isOpen, onClose, isDarkMode }: SearchBarProps) {
  const searchBarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<InputRef>(null)

  // Close on click outside
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        onClose()
      }
    },
    [onClose],
  )

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
      // Focus the input when the search bar opens
      if (inputRef.current) {
        inputRef.current.focus()
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClickOutside, handleKeyDown])

  return (
    <div
      ref={searchBarRef}
      className={`
        absolute top-full left-0 right-0 z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        shadow-lg bg-transparent
      `}
    >
      <div className="container mx-auto px-8 pt-2">
        <Input
          ref={inputRef}
          placeholder="Search for products..."
          prefix={<SearchOutlined style={{ color: isDarkMode ? "#a1a1aa" : "#6b7280" }} />}
          size="large"
          className={`
            w-full rounded-md
            ${isDarkMode ? "bg-zinc-700 text-zinc-100 border-zinc-600" : "bg-gray-100 text-zinc-800 border-gray-300"}
            focus:border-amber-500 focus:ring-amber-500
          `}
          style={{
            backgroundColor: isDarkMode ? "#3f3f46" : "#f3f4f6",
            borderColor: isDarkMode ? "#52525b" : "#d1d5db",
            color: isDarkMode ? "#e4e4e7" : "#18181b",
          }}
        />
      </div>
    </div>
  )
}
