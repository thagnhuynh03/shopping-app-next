export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageExists: boolean;
    colors: {
      id: number;
      colorId: number;
      name: string;
      sizes: {
        id: number;
        sizeId: number;
        name: string;
        stock: number;
        price: number;
      }[];
    }[];
  }