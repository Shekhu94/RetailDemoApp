import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { ProfileState } from '../../../../store/profile/profile.state';
import { NgxsModule } from '@ngxs/store';
import { ProductListState } from '../../../../store/products/products.state';
import { CartState } from '../../../../store/cart/cart.state';
import { environment } from '../../../../../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RouterModule } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), ProductListComponent],
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

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
