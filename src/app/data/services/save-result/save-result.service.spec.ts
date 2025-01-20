import { TestBed } from '@angular/core/testing';

import { SaveResultService } from './save-result.service';

describe('SaveResultService', () => {
  let service: SaveResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
