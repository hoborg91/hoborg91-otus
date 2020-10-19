import { TestBed } from '@angular/core/testing';

import { DictionaryStorageService } from './dictionary-storage.service';

describe('DictionaryStorageService', () => {
  let service: DictionaryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
