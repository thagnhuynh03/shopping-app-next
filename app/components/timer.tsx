"use client"

import { useState, useEffect, useContext } from "react"
import { Typography } from "antd"
import { ClockCircleOutlined } from "@ant-design/icons"
import { ThemeContext } from "../theme-context"

const { Text } = Typography

interface CountdownTimerFlashProps {
  endTime: number // Unix timestamp
  onEnd?: () => void
  size?: "small" | "medium" | "large"
  showCaption?: boolean
  backgroundColor?: string // Custom background color for blocks
  textColor?: string // Custom text color for blocks
}

interface TimeUnit {
  value: number
  label: string
  key: string
}

export function CountdownTimerFlash({
  endTime,
  onEnd
}: CountdownTimerFlashProps) {
  const { isDarkMode } = useContext(ThemeContext)
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([])
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const difference = endTime - now

      if (difference <= 0) {
        const endUnits = [
          { value: 0, label: "Days", key: "days" },
          { value: 0, label: "Hours", key: "hours" },
          { value: 0, label: "Minutes", key: "minutes" },
          { value: 0, label: "Seconds", key: "seconds" },
        ]
        // Use the current shouldShowDays value instead of the state
        const shouldShowDays = difference > 24 * 60 * 60 * 1000
        setTimeLeft(shouldShowDays ? endUnits : endUnits.slice(1))
        if (!isEnded) {
          setIsEnded(true)
          onEnd?.()
        }
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Determine if we should show days (more than 24 hours remaining)
      const shouldShowDays = difference > 24 * 60 * 60 * 1000

      const allUnits = [
        { value: days, label: "Days", key: "days" },
        { value: hours, label: "Hours", key: "hours" },
        { value: minutes, label: "Minutes", key: "minutes" },
        { value: seconds, label: "Seconds", key: "seconds" },
      ]

      const newTimeLeft = shouldShowDays ? allUnits : allUnits.slice(1)

      setTimeLeft(newTimeLeft)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime, onEnd, isEnded])

  if (timeLeft.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current opacity-50"></div>
      </div>
    )
  }

  const formatTimeDisplay = () => {
    return timeLeft.map((unit, index) => {
      const isLast = index === timeLeft.length - 1

      return (
        <div key={unit.key} className="flex items-center">
          {/* Time Block */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10
                h-10
                rounded-lg 
                flex items-center justify-center 
                font-bold
                shadow-lg
                relative overflow-hidden
                ${isEnded ? "opacity-50" : ""}
              `}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.2)"}`,
              }}
            >
              {/* Animated number */}
              <span
                key={`${unit.key}-${unit.value}`}
              >
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Colon separator (except for last item) */}
          {!isLast && (
            <div
              className={`text-2xl mx-1 font-bold font-mono flex items-center justify-center`}
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                marginTop: "-5px",
              }}
            >
              :
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="flex flex-col">
      {/* Timer Display */}
      <div className="flex items-center mb-2">
        {/* Clock Icon */}
        <ClockCircleOutlined
          className={`text-base mr-3`}
        />
        <Text className="mr-4 font-medium">End time: </Text>
        {/* Timer Blocks with Colons */}
        <div className={`flex items-center gap-1.5`}>{formatTimeDisplay()}</div>
      </div>

      {/* Sale Ended Message */}
      {isEnded && (
        <div
          className="mt-3 px-4 py-2 rounded-full text-center font-bold animate-bounce"
          style={{
            backgroundColor: "rgba(220, 38, 38, 0.2)",
            color: "#fca5a5",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Text className="text-sm font-bold">⏰ FLASH SALE ENDED</Text>
        </div>
      )}
    </div>
  )
}
