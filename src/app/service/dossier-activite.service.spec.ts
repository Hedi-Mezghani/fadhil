import { TestBed } from '@angular/core/testing';

import { DossierActiviteService } from './dossier-activite.service';

describe('DossierActiviteService', () => {
  let service: DossierActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
