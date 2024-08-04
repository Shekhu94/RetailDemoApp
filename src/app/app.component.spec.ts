import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalService,
} from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { MSALInstanceFactory, MSALGuardConfigFactory } from './app.config';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './store/profile/profile.state';
import { ProductListState } from './store/products/products.state';
import { CartState } from './store/cart/cart.state';
import { environment } from '../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
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
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory,
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'yCompany' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('yCompany');
  });
});
