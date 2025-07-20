export interface OrderCreateInput {
    addressId: number;
    paymentMethodId: number;
    status: string;
    discount: number;
    cart: { productSizeId: number; quantity: number; price: number }[];
    voucherId?: number;
  }