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
        id: number;
        name: string;
      };
      product?: {
        id: number;
        name: string;
      };
    };
    availableColorsForSize?: {
      colorName: string;
      productSizeId: number;
      stock: number;
    }[];
    availableSizesForColor?: {
      sizeName: string;
      productSizeId: number;
      stock: number;
    }[];
  }