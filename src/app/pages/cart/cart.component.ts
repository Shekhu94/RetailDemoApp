import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from './cart.service';
import { Cart, CartStateModel } from '../../store/cart/cart.model';
import { Store } from '@ngxs/store';
import { CartState } from '../../store/cart/cart.state';
import { Observable } from 'rxjs';
import {
  DeleteSelectedProductFromCart,
  GetCart,
} from '../../store/cart/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CurrencyPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  selectedQuantity!: string;
  cartSerivce = inject(CartService);
  store = inject(Store);
  cartModel!: CartStateModel;
  cartItems: Cart[] = [];
  totalPrice: string = '';
  deliveryCharge = 149;

  cartDetails$: Observable<CartStateModel> = this.store.select(
    CartState.getCart
  );

  ngOnInit() {
    this.store.dispatch(new GetCart());
    this.cartDetails$.subscribe((cart: CartStateModel) => {
      this.cartModel = cart;
      this.totalPrice = cart.totalPrice;
    });
  }

  deleteFromCart(productId: string) {
    this.store.dispatch(new DeleteSelectedProductFromCart(productId));
  }
}
