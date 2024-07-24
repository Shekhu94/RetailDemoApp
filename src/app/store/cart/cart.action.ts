import { Price } from '../../store/products/products.model';
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
