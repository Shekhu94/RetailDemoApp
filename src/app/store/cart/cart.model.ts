export interface Cart {
  productId: string;
  quantity: number;
  size: string;
}

export interface CartStateModel {
  items: Cart[];
}
