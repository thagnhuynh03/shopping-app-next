"use client";
import { useActionState, useState } from "react";
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
import { redirect } from "next/navigation";
import { applyVoucher } from "./actions/apply-voucher";
import { Button, Col, message, Row } from "antd";
import OrderSummary from "./orderSumary";

const shippingFee = 1;

interface CheckoutProps {
  cart: CartItem[];
  addresses: Address[];
}

export default function Checkout({ cart, addresses }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
        const { city, district, ward, ...rest } = addressState.formData;

        const newAddress = await createAddress({
          ...rest,
          city: Number(city),
          district: Number(district),
          ward: Number(ward),
        });

        if (newAddress.error) {
          setLoading(false);
          messageApi.error({
            content: newAddress.error,
            duration: 3,
            style: {
              position: "fixed",
              top: 20,
              left: 20
            }
          })
          return { error: newAddress.error };
        }
        addressId = newAddress.data.id;
      }
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
      if (paymentMethod === 2) {

        const result = await createOrder(orderData);
        if (!result.error) {
          await removeCart();
          redirect("/order");
        }
        setLoading(false);
        messageApi.error({
          content: result.error,
          duration: 3,
          style: {
            position: 'fixed',
            top: 20,
            left: 20
          }
        })
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
        messageApi.error({
          content: session.error,
          duration: 3,
          style: {
            position: 'fixed',
            top: 20,
            left: 20
          }
        })
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
        <Alert variant="outlined" severity="warning" className="!hidden">
          {state.error}
        </Alert>
      )}
      {loading ?? <Loader />}
      {contextHolder}
      <div className="w-full px-10 mt-5">
        <form action={formAction} onSubmit={() => setLoading(true)}>
          <Row gutter={[16, 24]}>
            {/* Left Column - Address & Payment */}
            <Col xs={24} lg={11}>
              <AddressForm
                addresses={addresses}
                onChange={setAddressState}
              />
            </Col>
            <Col xs={24} lg={5}>
              <PaymentSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </Col>

            {/* Right Column - Order Summary */}
            <Col xs={24} lg={8}>
              <div className="flex flex-col justify-between h-full">
                <OrderSummary
                  cart={cart}
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  voucher={voucher}
                  voucherError={voucherError}
                  onVoucherChange={setVoucher}
                  onApplyVoucher={handleApplyVoucher}
                />

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 text-lg font-semibold mt-5"
                  disabled={cart.length === 0}
                >
                  {loading ? 'Processing...' : `Place Order - $${total.toLocaleString()}`}
                </Button>
              </div>

            </Col>
          </Row>
        </form>
      </div>
    </>
  );
}