import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full',
  },
];
