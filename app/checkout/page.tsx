import getAddresses from "./actions/get-addresses";
import { getCarts } from "../cart/get-carts";
import Checkout from "./checkoutPage";

export default async function CheckoutPage(){
  const cart = await getCarts();
  const addresses = await getAddresses();
  return (
    <>
      <Checkout cart={cart} addresses={addresses} />
    </>
  );
}