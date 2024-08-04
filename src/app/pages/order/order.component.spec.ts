import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from '../../store/profile/profile.state';
import { ProductListState } from '../../store/products/products.state';
import { CartState } from '../../store/cart/cart.state';
import { environment } from '../../../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(
          NgxsModule.forRoot([ProfileState, ProductListState, CartState], {
            developmentMode: !environment.production,
          }),
          NgxsStoragePluginModule.forRoot({
            keys: ['cart'],
            storage: StorageOption.SessionStorage,
          })
        ),
        importProvidersFrom(
          NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production,
          })
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
