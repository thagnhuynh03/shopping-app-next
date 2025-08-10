"use client"

import { Select } from "antd"
import { updateCartItemProductSize } from "./get-carts"
import { useRouter } from "next/navigation"

const { Option } = Select

interface SizeOption {
  sizeName: string
  productSizeId: number
  stock: number
}

interface CartSizeSelectorProps {
  cartItemId: number
  currentProductSizeId: number
  availableSizesForColor: SizeOption[]
}

export default function CartSizeSelector({
  cartItemId,
  currentProductSizeId,
  availableSizesForColor,
}: CartSizeSelectorProps) {
  const router = useRouter()

  const handleChange = async (newProductSizeId: number) => {
    console.log(cartItemId)
    console.log(newProductSizeId)
    
    await updateCartItemProductSize(cartItemId, newProductSizeId)
    router.refresh()
  }

  return (
    <Select
      value={currentProductSizeId}
      onChange={handleChange}
      style={{ minWidth: 80 }}
      size="small"
    >
      {availableSizesForColor.map((sizeOpt) => (
        <Option key={sizeOpt.productSizeId} value={sizeOpt.productSizeId}>
          {sizeOpt.sizeName}
        </Option>
      ))}
    </Select>
  )
}
