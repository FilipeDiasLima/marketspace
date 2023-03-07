export interface ProductDTO {
  id?: string;
  name: string;
  price: number;
  description: string;
  is_new: boolean;
  accept_trade: boolean;
  is_active?: boolean;
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
    name: string;
    tel: string;
  };
}
