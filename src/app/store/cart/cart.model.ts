export interface Cart {
  productId: string;
  quantity: number;
  size: string;
}

export interface CartStateModel {
  items: Cart[];
}

export interface CartDetails {
  productId: string;
  productName: string;
  size: string;
  quantity: string;
  price: string;
  cart: CartTotal;
}

export interface CartTotal {
  totalPrice: string;
  priceWithoutDeliveryCharges: string;
  deliveryCharges: string;
}
