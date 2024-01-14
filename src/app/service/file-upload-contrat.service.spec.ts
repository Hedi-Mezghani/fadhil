import { TestBed } from '@angular/core/testing';

import { FileUploadContratService } from './file-upload-contrat.service';

describe('FileUploadContratService', () => {
  let service: FileUploadContratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadContratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
