import { Price } from '../products/products.model';

export interface Cart {
  productId: string;
  quantity: number;
  size: string;
  image: string;
  productName: string;
  price: Price;
}

export interface CartStateModel {
  items: Cart[];
}

export interface CartModel {
  cartData: Cart[];
  totalPrice: string;
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
