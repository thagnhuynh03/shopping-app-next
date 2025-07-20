"use client";
import React from "react";
import { updateCartItemProductSize } from "./get-carts";
import { useRouter } from "next/navigation";

interface ColorOption {
  colorName: string;
  productSizeId: number;
  stock: number;
}

interface CartColorSelectorProps {
  cartItemId: number;
  currentProductSizeId: number;
  availableColorsForSize: ColorOption[];
}

export default function CartColorSelector({
  cartItemId,
  currentProductSizeId,
  availableColorsForSize,
}: CartColorSelectorProps) {
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProductSizeId = Number(e.target.value);
    await updateCartItemProductSize(cartItemId, newProductSizeId);
    router.refresh(); // Refresh the page to show updated cart
  };

  return (
    <select
      value={currentProductSizeId}
      onChange={handleChange}
      style={{ minWidth: 120, padding: '4px 8px', borderRadius: 4 }}
    >
      {availableColorsForSize.map((colorOpt) => (
        <option key={colorOpt.productSizeId} value={colorOpt.productSizeId}>
          {colorOpt.colorName} (stock: {colorOpt.stock})
        </option>
      ))}
    </select>
  );
}
