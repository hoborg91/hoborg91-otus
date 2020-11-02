import { TestBed } from '@angular/core/testing';
import { getLocalStorage } from './app.module';

import { VocabularyService } from './vocabulary.service';

describe('VocabularyService', () => {
  let service: VocabularyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
      ]
    });
    service = TestBed.inject(VocabularyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
