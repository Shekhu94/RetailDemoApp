import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from './checkout.model';

@Injectable()
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  createOrder(amount: number): Observable<Order> {
    return this.httpClient
      .post('http://localhost:3000/api/order', {
        amount,
      })
      .pipe(
        map((payload) => {
          return payload as Order;
        })
      );
  }
}
