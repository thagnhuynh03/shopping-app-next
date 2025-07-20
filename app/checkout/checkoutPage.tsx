"use client";
import { useActionState, useState } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { getProductImage } from "../products/product-image";
import AddressForm from "./AddressForm";
import PaymentSelector from "./PaymentSelector";
import createAddress from "./actions/create-address";
import createOrder from "./actions/create-order";
import Alert from "@mui/material/Alert";
import checkout from "./actions/checkout";
import getStripe from "./stripe";
import removeCart from "./actions/remove-cart";
import Loader from "../components/loader";
import { CartItem } from "../cart/interface/cart.interface";
import { Address } from "./interfaces/address.interface";
import Image from "next/image";
import { redirect } from "next/navigation";
import { applyVoucher } from "./actions/apply-voucher";

// Dummy data for payment methods and shipping

const shippingFee = 1;

interface CheckoutProps {
  cart: CartItem[];
  addresses: Address[];
}

export default function Checkout({ cart, addresses }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  // Voucher state
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");
  const [voucherId, setVoucherId] = useState<number | undefined>(undefined);
  // Cart summary
  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const shipping = shippingFee;
  const total = subtotal + shipping - discount;

  // State for address and payment method
  const [addressState, setAddressState] = useState<{ selectedAddressId: string; formData: Address }>({
    selectedAddressId: "",
    formData: {
      name: "",
      phoneNumber: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    }
  });
  const [paymentMethod, setPaymentMethod] = useState<number>(2); // 2 = COD, 1 = Online

  const [state, formAction] = useActionState(
    async () => {
      setLoading(true);
      let addressId = addressState.selectedAddressId;
      if (!addressId) {
        const newAddress = await createAddress(addressState.formData);
        if (newAddress.error) {
          setLoading(false);
          return { error: newAddress.error };
        }
        addressId = newAddress.data.id;
      }
      console.log(typeof discount);
      const orderData = {
        addressId: Number(addressId),
        paymentMethodId: paymentMethod,
        status: "pending",
        discount: discount,
        voucherId: voucherId,
        cart: cart.map((item) => ({
          productSizeId: item.productSizeId,
          quantity: item.quantity,
          price: Math.round(item.price),
        })),
      };
      if (paymentMethod === 2){
        
        const result = await createOrder(orderData);
        if (!result.error) {
          await removeCart();
          redirect("/order");
        }
        setLoading(false);
        return { error: result.error };
      }
      if (paymentMethod === 1) {
        const session = await checkout(orderData);
        if (!session.error) {
          await removeCart();
          const stripe = await getStripe();
          await stripe?.redirectToCheckout({ sessionId: session.data.id });
        }
        setLoading(false);
        return session;
      }
    },
    { error: "" }
  );

  // Voucher apply handler
  async function handleApplyVoucher() {
    setVoucherError("");
    const result = await applyVoucher({ code: voucher, subtotal: subtotal });
    if (!result.error) {
      setDiscount(result.data.discount);
      setVoucherId(result.data.voucherId);
    } else {
        setDiscount(0);
        setVoucherId(undefined);
        setVoucherError(result.error);
    }
  }

  return (
    <>
      {state?.error && (
        <Alert variant="outlined" severity="warning">
          {state.error}
        </Alert>
      )}
      {loading ?? <Loader />}
      <form action={formAction} onSubmit={() => setLoading(true)}>
        <Box display="flex" gap={4} mt={4}>
          {/* Left: Address & Payment */}
          <Paper sx={{ flex: 2, p: 3 }}>
            <AddressForm addresses={addresses} onChange={setAddressState} />
          </Paper>
          <Paper sx={{ flex: 1, p: 3 }}>
            <PaymentSelector value={paymentMethod} onChange={setPaymentMethod} />
          </Paper>

          {/* Right: Order Summary */}
          <Paper sx={{ flex: 2, p: 3 }}>
            <Typography variant="h6" mb={2}>Order ({cart.length} pruducts)</Typography>
            {cart.map((item: CartItem) => (
              <Box key={item.id} display="flex" alignItems="center" mb={2}>
                <Image
                  src={getProductImage(item.product?.color?.product?.id ?? 0)}
                  alt={item.product?.color?.product?.name ?? "Product images"}
                  width={48}
                  height={48}
                  style={{ marginRight: 8 }}
                />
                <Box>
                  <Typography>{item.product?.color?.product?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Size: {item.product?.size?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Color: {item.product?.color?.color?.name}</Typography>
                </Box>
                <Box ml="auto">
                  <Typography>${item.price.toLocaleString()}{item.quantity > 1 ? ` x${item.quantity}` : ""}</Typography>
                </Box>
              </Box>
            ))}
            {/* Voucher input */}
            <Box display="flex" alignItems="center" mt={2} mb={1} gap={1}>
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={voucher}
                onChange={e => setVoucher(e.target.value)}
                style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <Button
                type="button"
                variant="contained"
                sx={{ ml: 1, minWidth: 100 }}
                onClick={handleApplyVoucher}
              >
                Áp dụng
              </Button>
            </Box>
            {voucherError && <Typography color="error" fontSize={13}>{voucherError}</Typography>}
            {/* Summary */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping fee</Typography>
              <Typography>${shipping.toLocaleString()}</Typography>
            </Box>
            {discount > 0 && (
              <Box display="flex" justifyContent="space-between">
                <Typography color="primary">Discount</Typography>
                <Typography color="primary">- ${discount.toLocaleString()}</Typography>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold" color="primary">${total.toLocaleString()}</Typography>
            </Box>
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} type="submit">
              Place order
            </Button>
          </Paper>
        </Box>
      </form>
    </>
  );
}