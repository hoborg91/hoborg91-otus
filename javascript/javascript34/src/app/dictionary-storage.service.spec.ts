import { TestBed } from '@angular/core/testing';
import { getLocalStorage } from './app.module';

import { DictionaryStorageService } from './dictionary-storage.service';

describe('DictionaryStorageService', () => {
  let service: DictionaryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DictionaryStorageService,
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
      ]
    });
    service = TestBed.inject(DictionaryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
