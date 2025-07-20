import * as React from "react";
import { getCarts, removeFromCart, updateCartQuantity } from "./get-carts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { getProductImage } from "../products/product-image";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { CartItem } from "./interface/cart.interface";
import CartColorSelector from "./CartColorSelector";
import CartSizeSelector from "./CartSizeSelector";

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

async function handleRemoveCartItem(formData: FormData) {
  "use server";
  const cartItemId = Number(formData.get("cartItemId"));
  await removeFromCart(cartItemId);
  revalidatePath("/cart");
}

async function handleUpdateQuantity(formData: FormData) {
  "use server";
  const cartItemId = Number(formData.get("cartItemId"));
  const quantity = Number(formData.get("quantity"));
  if (quantity > 0) {
    await updateCartQuantity(cartItemId, quantity);
    revalidatePath("/cart");
  }
}

// async function handleColorChange(cartItemId: number, newProductSizeId: number) {
//   'use server';
//   await updateCartItemProductSize(cartItemId, newProductSizeId);
//   revalidatePath('/cart');
// }

export default async function CartPage() {
  const cart = await getCarts();

  if (!cart || cart.length === 0) {
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      </>
    );
  }

  // Map cart items to table rows
  const rows = cart.map((item: CartItem)=> {
    const productId = item.product?.color?.product?.id || item.product?.product?.id;
    return {
      id: item.id,
      image: getProductImage(productId ?? 0),
      name: item.product?.color?.product?.name || item.product?.product?.name || "-",
      color: item.product?.color?.color?.name || "-",
      size: item.product?.size?.name || "-",
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      availableColorsForSize: item.availableColorsForSize || [],
      currentProductSizeId: item.productSizeId,
      availableSizesForColor: item.availableSizesForColor || [],
    };
  });

  const subtotal = rows.reduce((sum, row) => sum + row.total, 0);

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Image src={row.image} alt={row.name} width={60} height={60} style={{ objectFit: "cover", borderRadius: 4 }} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <CartColorSelector
                    cartItemId={row.id}
                    currentProductSizeId={row.currentProductSizeId}
                    availableColorsForSize={row.availableColorsForSize}
                  />
                </TableCell>
                <TableCell>
                  <CartSizeSelector
                    cartItemId={row.id}
                    currentProductSizeId={row.currentProductSizeId}
                    availableSizesForColor={row.availableSizesForColor}
                  />
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                    <form action={handleUpdateQuantity} style={{ display: 'inline' }}>
                      <input type="hidden" name="cartItemId" value={row.id} />
                      <input type="hidden" name="quantity" value={row.quantity - 1} />
                      <button type="submit" style={{ border: '1px solid #ccc', background: '#1e1e1e', borderRadius: 4, cursor: row.quantity === 1 ? 'not-allowed' : 'pointer', padding: '2px 8px' }} disabled={row.quantity === 1}>-</button>
                    </form>
                    <span style={{ minWidth: 24, textAlign: 'center', display: 'inline-block' }}>{row.quantity}</span>
                    <form action={handleUpdateQuantity} style={{ display: 'inline' }}>
                      <input type="hidden" name="cartItemId" value={row.id} />
                      <input type="hidden" name="quantity" value={row.quantity + 1} />
                      <button type="submit" style={{ border: '1px solid #ccc', background: '#1e1e1e', borderRadius: 4, cursor: 'pointer', padding: '2px 8px' }}>+</button>
                    </form>
                  </div>
                </TableCell>
                <TableCell align="right">${ccyFormat(row.price)}</TableCell>
                <TableCell align="right">${ccyFormat(row.total)}</TableCell>
                <TableCell align="center">
                  <form action={handleRemoveCartItem}>
                    <input type="hidden" name="cartItemId" value={row.id} />
                    <button type="submit" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={5}>Subtotal</TableCell>
              <TableCell align="right">${ccyFormat(subtotal)}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}><b>Total</b></TableCell>
              <TableCell align="right"><b>${ccyFormat(subtotal)}</b></TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <Link href="/checkout" style={{ padding: '8px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Checkout
        </Link>
      </div>
    </>
  );
}
