import { TestBed } from '@angular/core/testing';

import { MsalloginService } from './msallogin.service';

describe('MsalloginService', () => {
  let service: MsalloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
