
import CartPage from "./CartPage"
import { getCarts } from "./get-carts"


export default async function CartPageWrapper() {

  const cart = await getCarts();
  return <CartPage cart={cart} />
}
