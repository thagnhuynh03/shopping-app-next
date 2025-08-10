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

export interface CartTableItem {
  key: number;
  id: number;
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
  availableColorsForSize: {
    colorName: string;
    productSizeId: number;
    stock: number;
  }[];
  currentProductSizeId: number;
  availableSizesForColor: {
    sizeName: string;
    productSizeId: number;
    stock: number;
  }[];
}