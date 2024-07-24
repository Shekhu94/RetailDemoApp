import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from './cart.service';
import { Cart, CartModel } from '../../store/cart/cart.model';

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
  cartModel!: CartModel;
  cartItems: Cart[] = [];
  totalPrice: string = '';
  deliveryCharge = 149;
  ngOnInit() {
    this.cartSerivce.getCart().subscribe((cart: CartModel) => {
      this.cartModel = cart;
      this.totalPrice = cart.totalPrice;
    });
  }
}
