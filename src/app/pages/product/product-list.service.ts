import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductListModel } from '../../store/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private httpClient: HttpClient) {}

  getProductList(menu?: string): Observable<ProductListModel[]> {
    return this.httpClient.get('http://localhost:3000/data').pipe(
      map((payload) => {
        return payload as ProductListModel[];
      })
    );
  }
}
