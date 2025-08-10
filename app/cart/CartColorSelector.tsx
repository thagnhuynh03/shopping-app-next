"use client"

import { Select } from "antd"
import { updateCartItemProductSize } from "./get-carts"
import { useRouter } from "next/navigation"

const { Option } = Select

interface ColorOption {
  colorName: string
  productSizeId: number
  stock: number
}

interface CartColorSelectorProps {
  cartItemId: number
  currentProductSizeId: number
  availableColorsForSize: ColorOption[]
}

export default function CartColorSelector({
  cartItemId,
  currentProductSizeId,
  availableColorsForSize,
}: CartColorSelectorProps) {
  const router = useRouter()

  const handleChange = async (newProductSizeId: number) => {
    await updateCartItemProductSize(cartItemId, newProductSizeId)
    router.refresh()
  }

  return (
    <Select
      value={currentProductSizeId}
      onChange={handleChange}
      style={{ minWidth: 120 }}
      size="small"
    >
      {availableColorsForSize.map((colorOpt) => (
        <Option key={colorOpt.productSizeId} value={colorOpt.productSizeId}>
          {colorOpt.colorName}
        </Option>
      ))}
    </Select>
  )
}
