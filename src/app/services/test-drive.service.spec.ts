import { TestBed } from '@angular/core/testing';

import { TestDriveService } from './test-drive.service';

describe('TestDriveService', () => {
  let service: TestDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
