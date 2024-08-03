import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Offer } from './offer.model';
import { off } from 'process';

@Component({
  selector: 'app-offer-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './offer-carousel.component.html',
  styleUrl: './offer-carousel.component.scss',
})
export class OfferCarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoWidth: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  @Input() slides: Offer[] = [];

  trackById(index: number, offer: Offer) {
    return offer.id;
  }

  displayProducts(slide: Offer) {
    console.log(slide);
  }
}
