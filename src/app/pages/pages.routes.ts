import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./product/products.routes').then((p) => p.routes),
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.routes').then((p) => p.routes),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./checkout/checkout.routes').then((p) => p.routes),
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
