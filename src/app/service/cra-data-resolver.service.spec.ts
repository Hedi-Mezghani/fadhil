import { TestBed } from '@angular/core/testing';

import { CraDataResolverService } from './cra-data-resolver.service';

describe('CraDataResolverService', () => {
  let service: CraDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
