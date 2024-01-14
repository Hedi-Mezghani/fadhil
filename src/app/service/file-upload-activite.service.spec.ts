import { TestBed } from '@angular/core/testing';

import { FileUploadActiviteService } from './file-upload-activite.service';

describe('FileUploadActiviteService', () => {
  let service: FileUploadActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
