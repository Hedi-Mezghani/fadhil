import { TestBed } from '@angular/core/testing';

import { ContratPdfService } from './contrat-pdf.service';

describe('ContratPdfService', () => {
  let service: ContratPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
