import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from './order.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrderDetails(): Observable<OrderDetails[]> {
    return this.httpClient.get('http://localhost:3000/api/order').pipe(
      map((payload) => {
        return payload as OrderDetails[];
      })
    );
  }
}
