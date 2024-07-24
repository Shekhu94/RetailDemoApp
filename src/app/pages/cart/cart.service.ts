import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartModel } from '../../store/cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getCart(): Observable<CartModel> {
    return this.httpClient.get('http://localhost:3000/api/cart').pipe(
      map((payload) => {
        return payload as CartModel;
      })
    );
  }
}
