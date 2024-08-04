import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { StaticdataService } from '../../shared/services/staticdata.service';
import { NgxsModule, Store } from '@ngxs/store';
import { importProvidersFrom } from '@angular/core';
import { ProfileState } from '../../store/profile/profile.state';
import { ProductListState } from '../../store/products/products.state';
import { CartState } from '../../store/cart/cart.state';
import { environment } from '../../../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        CheckoutComponent,
      ],
      providers: [
        StaticdataService,
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

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
