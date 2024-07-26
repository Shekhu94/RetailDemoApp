import { Price } from '../../store/products/products.model';
import { Cart } from './cart.model';
export class SetSelectedProductInCart {
  static readonly type = '[ProductDetail page] SetSelectedProductInCart';
  constructor(
    public payload: {
      productId: string;
      quantity: number;
      size: string;
      image: string;
      price: Price;
      productName: string;
    }
  ) {}
}

export class GetCart {
  static readonly type = '[Cart page] GetCart';
  constructor() {}
}

export class DeleteSelectedProductFromCart {
  static readonly type = '[Cart page] DeleteSelectedProductFromCart';
  constructor(public id: string) {}
}

export class ClearCartAfterSuccessfulOrder {
  static readonly type = '[Checkout page] ClearCartAfterSuccessfulOrder';
  constructor() {}
}
