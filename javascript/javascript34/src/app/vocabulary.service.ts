import { Injectable } from '@angular/core';
import { DictionaryStorageService } from './dictionary-storage.service';
import { TranslationService } from './translation.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private _splittedWords = new Subject<{
    word: string,
    langFrom: string,
    langTo: string,
  }>();

  constructor(
    private readonly _translation: TranslationService,
    private readonly _dictStorage: DictionaryStorageService
  ) { 
    this._splittedWords.subscribe(({word, langFrom, langTo}) => {
      _translation.translate(word, langFrom, langTo);
    });
    this._translation.subscr(record => this._dictStorage.saveOrUpdate(record));
  }

  analyze = (text: string, langFrom: string, langTo: string) => {
    const words = this._splitIntoWords(text);
    words.forEach(word => this._splittedWords.next({
      word,
      langFrom,
      langTo,
    }));
  }

  private _splitIntoWords = (text: string) => {
    return text.split(' ')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length > 0);
  }
}
