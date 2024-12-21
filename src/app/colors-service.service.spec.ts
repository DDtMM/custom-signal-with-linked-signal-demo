import { TestBed } from '@angular/core/testing';

import { ColorsServiceService } from './colors-service.service';

describe('ColorsServiceService', () => {
  let service: ColorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
