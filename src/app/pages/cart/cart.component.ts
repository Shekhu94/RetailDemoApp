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
import { RouterModule } from '@angular/router';
import { ProfileStateModel } from '../../store/profile/profile.model';
import { ProfileState } from '../../store/profile/profile.state';
import { MsalloginService } from '../../shared/services/msallogin.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
  msalService = inject(MsalloginService);
  store = inject(Store);
  cartModel!: CartStateModel;
  cartItems: Cart[] = [];
  totalPrice: string = '';
  deliveryCharge = 149;
  isSignedIn = false;

  cartDetails$: Observable<CartStateModel> = this.store.select(
    CartState.getCart
  );

  userProfileInfo$: Observable<ProfileStateModel> = this.store.select(
    ProfileState.getProfileInfo
  );

  ngOnInit() {
    this.store.dispatch(new GetCart());
    this.cartDetails$.subscribe((cart: CartStateModel) => {
      this.cartModel = cart;
      this.totalPrice = cart.totalPrice;
    });
    this.userProfileInfo$.subscribe((payload) => {
      this.isSignedIn = payload.isSignedIn;
    });
  }

  // this will trigger the login flow from cart page
  signUporInUser() {
    this.msalService.loginPopup();
  }

  deleteFromCart(productId: string) {
    this.store.dispatch(new DeleteSelectedProductFromCart(productId));
  }
}
