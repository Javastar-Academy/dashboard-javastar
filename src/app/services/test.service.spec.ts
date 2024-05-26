import { TestBed } from '@angular/core/testing';

import { TestsService } from './test.service';

describe('TestService', () => {
  let service: TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
