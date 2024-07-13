import { Routes } from '@angular/router';
import { ProductListComponent } from '../features/product-list/pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [],
  },
];
