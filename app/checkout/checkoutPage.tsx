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

// Dummy data for payment methods and shipping

const shippingFee = 1;

interface CheckoutProps {
  cart: CartItem[];
  addresses: Address[];
}

export default function Checkout({ cart, addresses }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  // Cart summary
  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

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
      const orderData = {
        addressId: Number(addressId),
        paymentMethodId: paymentMethod,
        status: "pending",
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
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping fee</Typography>
              <Typography>${shippingFee.toLocaleString()}</Typography>
            </Box>
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