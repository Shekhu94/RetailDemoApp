import { TestBed } from '@angular/core/testing';
import { MsalloginService } from './msallogin.service';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalService,
} from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory } from '../../app.config';

describe('MsalloginService', () => {
  let service: MsalloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    });
    service = TestBed.inject(MsalloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
