import { TestBed } from '@angular/core/testing';

import { UploadLexemeService } from './upload-lexeme.service';

describe('UploadLexemeService', () => {
  let service: UploadLexemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadLexemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
