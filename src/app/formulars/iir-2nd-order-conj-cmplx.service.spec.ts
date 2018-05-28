import { TestBed, inject } from '@angular/core/testing';

import { Iir2ndOrderConjCmplxService } from './iir-2nd-order-conj-cmplx.service';

describe('Iir2ndOrderConjCmplxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Iir2ndOrderConjCmplxService]
    });
  });

  it('should be created', inject([Iir2ndOrderConjCmplxService], (service: Iir2ndOrderConjCmplxService) => {
    expect(service).toBeTruthy();
  }));
});
