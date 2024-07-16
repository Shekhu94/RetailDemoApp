import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductAccordionComponent } from '../../../../shared/components/product-accordion/product-accordion.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ProductAccordionComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  productImages = [
    { url: 'carousel/banner1.jpg' },
    { url: 'carousel/banner2.jpg' },
    { url: 'carousel/banner3.jpg' },
  ];

  selectedImage: string = 'carousel/banner1.jpg';
  imageSize = 430;
  mainCarouselOptions: OwlOptions = {
    items: 1,
    dots: false,
    margin: 8,
    autoWidth: true,
    autoHeight: true,
  };
  thumbnailCarouselOptions: OwlOptions = {
    items: 3,
    dots: false,
    margin: 5,
    autoWidth: true,
  };
  constructor() {}

  ngOnInit() {}

  changeimage(image: string) {
    this.selectedImage = image;
  }
}
