import { TestBed } from '@angular/core/testing';

import { DossierContratService } from './dossier-contrat.service';

describe('DossierContratService', () => {
  let service: DossierContratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierContratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
