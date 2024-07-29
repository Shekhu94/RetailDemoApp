import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Price, ProductListModel } from '../../store/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductList(category?: string): Observable<ProductListModel[]> {
    return this.httpClient
      .get(`http://localhost:3000/api/products/${category}`)
      .pipe(
        map((payload) => {
          return payload as ProductListModel[];
        })
      );
  }

  getProductDetails(id: string): Observable<ProductListModel[]> {
    return this.httpClient
      .get(`http://localhost:3000/api/products/details/${id}`)
      .pipe(
        map((payload) => {
          return payload as ProductListModel[];
        })
      );
  }

  addToCart(
    productId: string,
    quantity: number,
    size: string,
    image: string,
    price: Price,
    productName: string
  ): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/cart', {
      productId,
      quantity,
      size,
      image,
      price,
      productName,
    });
  }
}
