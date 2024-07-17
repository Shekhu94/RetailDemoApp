import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductAccordionComponent } from '../../../../shared/components/product-accordion/product-accordion.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  GetProductDetails,
  SetSelectedProduct,
} from '../../../../store/products/products.action';
import { map, Observable } from 'rxjs';
import {
  ProductListModel,
  VariantThumbnail,
} from '../../../../store/products/products.model';
import { ProductListState } from '../../../../store/products/products.state';
import { AccordionModel } from '../../../../shared/components/product-accordion/product-accordion.model';

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
  private router = inject(ActivatedRoute);
  public store = inject(Store);
  productDetails!: ProductListModel;
  productAccordion: AccordionModel[] = [];
  SelectedProductSizes: string[] = [];
  SelectedProductThumbnail: VariantThumbnail[] = [];
  productDetails$: Observable<ProductListModel[]> = this.store.select(
    ProductListState.getProductDetails
  );
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(new GetProductDetails(id));
      }
    });

    this.productDetails$
      .pipe(map((items: ProductListModel[]) => items[0]))
      .subscribe((updatedItems) => {
        this.productDetails = updatedItems;
        this.createViewModel();
      });
  }

  createViewModel() {
    const { care, description, material } = this.productDetails || {};
    this.productAccordion.push({ key: 'Care', value: care });
    this.productAccordion.push({ key: 'Description', value: description });
    this.productAccordion.push({ key: 'Material', value: material });
    this.SelectedProductSizes = this.productDetails?.variants[0]?.options.map(
      (x) => x.size
    );
    this.SelectedProductThumbnail = this.productDetails?.variants_thumbnail;
  }
  selectedImageIndex: number | null = null;

  selectedSizeIndex: number | null = null;

  selectImage(index: number, variantId: number): void {
    this.selectedImageIndex = index;
    this.store.dispatch(new SetSelectedProduct(variantId));
  }

  selectSize(index: number): void {
    this.selectedSizeIndex = index;
  }

  changeimage(image: string) {
    this.selectedImage = image;
  }
}
