"use client";
import React from "react";
import { updateCartItemProductSize } from "./get-carts";
import { useRouter } from "next/navigation";

interface SizeOption {
  sizeName: string;
  productSizeId: number;
  stock: number;
}

interface CartSizeSelectorProps {
  cartItemId: number;
  currentProductSizeId: number;
  availableSizesForColor: SizeOption[];
}

export default function CartSizeSelector({
  cartItemId,
  currentProductSizeId,
  availableSizesForColor,
}: CartSizeSelectorProps) {
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProductSizeId = Number(e.target.value);
    await updateCartItemProductSize(cartItemId, newProductSizeId);
    router.refresh();
  };

  return (
    <select
      value={currentProductSizeId}
      onChange={handleChange}
      style={{ minWidth: 80, padding: '4px 8px', borderRadius: 4 }}
    >
      {availableSizesForColor.map((sizeOpt) => (
        <option key={sizeOpt.productSizeId} value={sizeOpt.productSizeId}>
          {sizeOpt.sizeName} (stock: {sizeOpt.stock})
        </option>
      ))}
    </select>
  );
} 