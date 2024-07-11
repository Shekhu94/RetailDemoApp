import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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

  public slides = [
    {
      title: 'The biggest sale',
      subtitle: 'Special for today',
      image: 'carousel/banner1.jpg',
    },
    {
      title: 'Summer collection',
      subtitle: 'New Arrivals On Sale',
      image: 'carousel/banner2.jpg',
    },
    {
      title: 'The biggest sale',
      subtitle: 'Special for today',
      image: 'carousel/banner3.jpg',
    },
    {
      title: 'Summer collection',
      subtitle: 'New Arrivals On Sale',
      image: 'carousel/banner4.jpg',
    },
    {
      title: 'The biggest sale',
      subtitle: 'Special for today',
      image: 'carousel/banner5.jpg',
    },
  ];
}
