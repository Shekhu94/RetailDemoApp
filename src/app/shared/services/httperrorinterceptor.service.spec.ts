import { TestBed } from '@angular/core/testing';

import { HttperrorinterceptorService } from './httperrorinterceptor.service';

describe('HttperrorinterceptorService', () => {
  let service: HttperrorinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttperrorinterceptorService],
    });
    service = TestBed.inject(HttperrorinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
