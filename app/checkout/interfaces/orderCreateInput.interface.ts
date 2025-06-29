export interface OrderCreateInput {
    addressId: number;
    paymentMethodId: number;
    status: string;
    cart: { productSizeId: number; quantity: number; price: number }[];
  }