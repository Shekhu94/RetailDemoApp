import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductAccordionComponent } from '../../../../shared/components/product-accordion/product-accordion.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  GetProductDetails,
  SetSelectedProductSize,
} from '../../../../store/products/products.action';
import { map, Observable } from 'rxjs';
import {
  Price,
  ProductListModel,
  VariantThumbnail,
} from '../../../../store/products/products.model';
import { ProductListState } from '../../../../store/products/products.state';
import { AccordionModel } from '../../../../shared/components/product-accordion/product-accordion.model';
import { Option } from '../../../../store/products/products.model';
import { SetSelectedProductInCart } from '../../../../store/cart/cart.action';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    ProductAccordionComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  productCaraouselImages: string[] | undefined;

  selectedImage: string = 'carousel/banner1.jpg';
  imageSize = 430;
  mainCarouselOptions: OwlOptions = {
    items: 1,
    dots: false,
    margin: 8,
    autoWidth: true,
    autoHeight: false,
  };
  thumbnailCarouselOptions: OwlOptions = {
    items: 3,
    dots: false,
    margin: 5,
    autoWidth: true,
  };
  private router = inject(ActivatedRoute);
  public store = inject(Store);
  private productService = inject(ProductService);
  productDetails!: ProductListModel;
  productAccordion: AccordionModel[] = [];
  SelectedProductSizes: Option[] | undefined = [];
  SelectedProductThumbnail: VariantThumbnail[] = [];
  selectedProduct: Option = { id: '', size: '' };
  productDetails$: Observable<ProductListModel[]> = this.store.select(
    ProductListState.getProductDetails
  );

  productSelected$: Observable<Option[]> = this.store.select(
    ProductListState.getProductSize
  );

  selectedImageIndex: number = -1;

  selectedSizeIndex: number = -1;

  selectedThumbnail: string = '';

  priceObject: Price = {
    finalPrice: '',
    strikedPrice: '',
  };

  productName: string = '';

  constructor() {}
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

    this.productSelected$.subscribe((product) => {
      this.selectedProduct = product[0];
    });
  }

  createViewModel() {
    const { care, description, material, price, strikedPrice, name } =
      this.productDetails || {};
    this.priceObject.finalPrice = price;
    this.priceObject.strikedPrice = strikedPrice;
    this.productName = name;
    this.productAccordion = [];
    this.productAccordion.push({ key: 'Care', value: care });
    this.productAccordion.push({ key: 'Description', value: description });
    this.productAccordion.push({ key: 'Material', value: material });
    this.SelectedProductThumbnail = this.productDetails?.variants_thumbnail;
    this.setCaraouselImages(+this.productDetails?.variants[0]?.id);
  }

  setCaraouselImages(variantId: number): void {
    this.SelectedProductSizes = this.productDetails?.variants.find(
      (x) => +x.id == variantId
    )?.options;
    this.productCaraouselImages = this.productDetails?.variants?.find(
      (x) => +x.id == variantId
    )?.images;
  }

  selectImage(
    index: number,
    variantId: number,
    selectedThumbnail: string
  ): void {
    this.selectedImageIndex = index;
    this.setCaraouselImages(variantId);
    this.selectedSizeIndex = -1;
    this.selectedThumbnail = selectedThumbnail;
  }

  selectSize(index: number, size: Option): void {
    this.selectedSizeIndex = index;
    this.store.dispatch(new SetSelectedProductSize(size));
  }

  changeimage(image: string) {
    this.selectedImage = image;
  }

  AddToCart() {
    this.productService
      .addToCart(
        this.selectedProduct.id,
        1,
        this.selectedProduct.size,
        this.selectedThumbnail,
        this.priceObject,
        this.productName
      )
      .subscribe((x) => {
        this.store.dispatch(
          new SetSelectedProductInCart({
            productId: this.selectedProduct.id,
            quantity: 1,
            size: this.selectedProduct.size,
            image: this.selectedThumbnail,
            price: this.priceObject,
            productName: this.productName,
          })
        );
      });
  }
}
