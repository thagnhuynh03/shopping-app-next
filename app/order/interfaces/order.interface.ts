export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    productSize: {
      size: {
        name: string;
      };
      color: {
        color: {
          name: string;
        };
        product: {
          id: number;
          name: string;
          description?: string;
        };
      };
    };
  }
  
  export interface Order {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    address: {
      name: string;
      phoneNumber: string;
      address: string;
      district: number | string;
      ward: number | string;
      city: number | string;
    };
    paymentMethod: {
      name: string;
    };
    orderItems: OrderItem[];
  }