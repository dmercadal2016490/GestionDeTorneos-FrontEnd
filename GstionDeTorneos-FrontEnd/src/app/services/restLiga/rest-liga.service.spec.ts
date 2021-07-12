import { TestBed } from '@angular/core/testing';

import { RestLigaService } from './rest-liga.service';

describe('RestLigaService', () => {
  let service: RestLigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
