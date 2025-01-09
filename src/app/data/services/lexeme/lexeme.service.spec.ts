import { TestBed } from '@angular/core/testing';

import { LexemeService } from './lexeme.service';

describe('LexemeService', () => {
  let service: LexemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LexemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
