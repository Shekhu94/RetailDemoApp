import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OfferCarouselComponent } from '../../../shared/components/offer-carousel/offer-carousel.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, OfferCarouselComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
