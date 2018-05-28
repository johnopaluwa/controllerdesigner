import { TestBed, inject } from '@angular/core/testing';

import { ShelvingCutService } from './shelving-cut.service';

describe('ShelvingCutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShelvingCutService]
    });
  });

  it('should be created', inject([ShelvingCutService], (service: ShelvingCutService) => {
    expect(service).toBeTruthy();
  }));
});
