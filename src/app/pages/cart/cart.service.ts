import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart, CartStateModel } from '../../store/cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getCart(): Observable<CartStateModel> {
    return this.httpClient.get('http://localhost:3000/api/cart').pipe(
      map((payload) => {
        return payload as CartStateModel;
      })
    );
  }

  DeleteProductFromCart(productId: string): Observable<CartStateModel> {
    return this.httpClient
      .delete('http://localhost:3000/api/cart/delete/' + productId)
      .pipe(
        map((payload) => {
          return payload as CartStateModel;
        })
      );
  }
}
