import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OfferCarouselComponent } from '../../../../shared/components/offer-carousel/offer-carousel.component';
import { Store } from '@ngxs/store';
import { GetProductList } from '../../../../store/products/products.action';
import { ProductListState } from '../../../../store/products/products.state';
import { Observable } from 'rxjs';
import { ProductListModel } from '../../../../store/products/products.model';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    OfferCarouselComponent,
    AsyncPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public store = inject(Store);
  private router = inject(Router);

  productList$: Observable<ProductListModel[]> = this.store.select(
    ProductListState.getProductList
  );

  ngOnInit(): void {
    this.store.dispatch(new GetProductList());
  }

  openDetailsPage(productid: string) {
    this.router.navigate(['/details'], { queryParams: { id: productid } });
  }
}
