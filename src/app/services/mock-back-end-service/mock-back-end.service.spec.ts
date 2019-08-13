import { TestBed } from '@angular/core/testing';

import { MockBackEndService } from './mock-back-end.service';

describe('MockBackEndService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockBackEndService = TestBed.get(MockBackEndService);
    expect(service).toBeTruthy();
  });
});
