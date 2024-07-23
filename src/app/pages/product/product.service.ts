import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductListModel } from '../../store/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductList(): Observable<ProductListModel[]> {
    return this.httpClient.get('http://localhost:3000/api/products').pipe(
      map((payload) => {
        return payload as ProductListModel[];
      })
    );
  }

  getProductDetails(id: string): Observable<ProductListModel[]> {
    return this.httpClient.get('http://localhost:3000/api/products').pipe(
      map((payload) => {
        return payload as ProductListModel[];
      })
    );
  }

  addToCart(
    productId: string,
    quantity: number,
    size: string
  ): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/cart', {
      productId,
      quantity,
      size,
    });
  }
}
