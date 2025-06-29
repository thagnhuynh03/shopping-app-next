"use client";
import { useState, useMemo } from "react";
import { Stack, Typography, Button, Box, Grid, Snackbar, Alert } from "@mui/material";
import ProductImageGallery from "./ProductImageGallery";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ColorSelector from "./ColorSelector";
import { Product } from "../interfaces/product.interface";

type ProductColor = {
  id: number;
  colorId: number;
  name: string;
  sizes: ProductSize[];
};
type ProductSize = {
  id: number;
  sizeId: number;
  name: string;
  stock: number;
  price: number;
};

interface ProductDetailsClientProps {
  product: Product;
  images: string[];
  addToCart: (productSizeId: number, quantity: number, price: number) => Promise<{ error: string, data?: unknown}>;
}

export default function ProductDetailsClient({ product, images, addToCart }: ProductDetailsClientProps) {
  // State for selected color and size
  const [selectedColorId, setSelectedColorId] = useState<number | null>(product.colors[0]?.colorId ?? null);
  const selectedColor = useMemo(
    () => product.colors.find((c: ProductColor) => c.colorId === selectedColorId),
    [product.colors, selectedColorId]
  );
  const [selectedSizeName, setSelectedSizeName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  // Sort sizes in order S, M, L, XL
  const sizeOrder = ["S", "M", "L", "XL"];
  console.log("Colors:", product.colors);
  console.log(selectedColorId);

  // If no color selected, show all sizes from all colors
  let allSizes: string[] = [];
  let allDisabledSizes: string[] = [];
  if (!selectedColor) {
    const sizeSet = new Set<string>();
    const disabledSet = new Set<string>();
    product.colors.forEach((color: ProductColor) => {
      color.sizes.forEach((s: ProductSize) => {
        sizeSet.add(s.name);
        if (s.stock === 0) disabledSet.add(s.name);
      });
    });
    allSizes = Array.from(sizeSet).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
    allDisabledSizes = Array.from(disabledSet);
  }
  const sortedSizes = selectedColor
    ? (selectedColor.sizes.map((s: ProductSize) => s.name) || []).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
    : allSizes;
  const disabledSizes = selectedColor
    ? selectedColor.sizes.filter((s: ProductSize) => s.stock === 0).map((s: ProductSize) => s.name) || []
    : allDisabledSizes;
  console.log("Product sizename " + selectedSizeName);
  console.log("Color" + selectedColor);
  // Find the selected ProductSize object (to get id and price)
  const selectedProductSize = selectedColor?.sizes.find((s: ProductSize) => s.name === selectedSizeName);
  console.log("Product size " + selectedProductSize);
  const handleAddToCart = async () => {
    if (!selectedProductSize) return;
    setLoading(true);
    try {
      console.log(selectedProductSize.id);
      const res = await addToCart(selectedProductSize.id, quantity, selectedProductSize.price);
      if (res && !res.error) {
        setSnackbar({ open: true, message: "Added to cart!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: res.error || "Failed to add to cart", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Failed to add to cart", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container marginBottom={"2rem"} rowGap={3} spacing={4}>
      {/* Image and thumbnails */}
      {product.imageExists && (
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductImageGallery images={images} />
        </Grid>
      )}
      {/* Product Info */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack gap={2}>
          <Typography variant="h4" fontWeight={700}>{product.name}</Typography>
          <Typography color="text.secondary">{product.description}</Typography>
          <Typography variant="h5">${selectedProductSize?.price ?? product.price}</Typography>
          {/* Color Selector */}
          <Box>
            <Typography variant="h6" fontWeight='bold' mb={1}>Color</Typography>
            <ColorSelector
              colors={product.colors.map((c: ProductColor) => ({
                id: c.colorId,
                name: c.name
              }))}
              onChange={setSelectedColorId}
            />
          </Box>
          {/* Size Selector (depends on selected color) */}
          <Box>
            <Typography variant="h6" fontWeight='bold' mb={1}>Size</Typography>
            <SizeSelector
              sizes={sortedSizes}
              selected={selectedSizeName}
              onChange={setSelectedSizeName}
              disabledSizes={disabledSizes}
            />
          </Box>
          {/* Price and Stock (for selected color/size) */}
          {/* Quantity Selector */}
          <Box gap={2}>
            <Typography variant="h6" fontWeight='bold' mb={1}>Quantity</Typography>
            <QuantitySelector max={selectedProductSize?.stock ?? 1} value={quantity} onChange={setQuantity} />
            {/* Custom quantity input for add to cart */}
            <Box mt={1}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ flex: 1, borderRadius: 2 }}
                disabled={!selectedProductSize || selectedProductSize.stock === 0 || loading}
                onClick={handleAddToCart}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
} 