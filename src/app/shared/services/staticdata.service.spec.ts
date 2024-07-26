import { TestBed } from '@angular/core/testing';

import { StaticdataService } from './staticdata.service';

describe('StaticdataService', () => {
  let service: StaticdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
