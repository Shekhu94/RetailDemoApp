import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { OrderComponent } from '../order/order.component';

export const routes: Routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' },
  { path: 'order', component: OrderComponent, pathMatch: 'full' },
];
