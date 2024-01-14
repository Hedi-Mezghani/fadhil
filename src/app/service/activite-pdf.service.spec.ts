import { TestBed } from '@angular/core/testing';

import { ActivitePdfService } from './activite-pdf.service';

describe('ActivitePdfService', () => {
  let service: ActivitePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
