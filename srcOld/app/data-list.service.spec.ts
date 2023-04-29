import { TestBed } from '@angular/core/testing';

import { DataListService } from './data-list.service';

describe('DataListService', () => {
  let service: DataListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
