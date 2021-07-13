import { TestBed } from '@angular/core/testing';

import { RestMarcadorService } from './rest-marcador.service';

describe('RestMarcadorService', () => {
  let service: RestMarcadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestMarcadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
