export interface CartItem {
    id: number;
    productSizeId: number;
    userId: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      color?: {
        product?: {
          id: number;
          name: string;
        };
        color?: {
          name: string;
        };
      };
      size?: {
        name: string;
      };
      product?: {
        id: number;
        name: string;
      };
    };
  }