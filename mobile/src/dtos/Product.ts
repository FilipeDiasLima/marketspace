export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: [
    {
      path: string;
      id: string;
    }
  ];
  payment_methods: [
    {
      key: string;
      name: string;
    }
  ];
  user: {
    avatar: string;
  };
}
