import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _translated = new Subject<{
    src: string,
    dst: string,
    langFrom: string,
    langTo: string,
  }>();

  constructor() { }

  translate = (word: string, langFrom: string, langTo: string) => {
    fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=${langFrom}|${langTo}`)
      .then(r => r.json())
      .then(j => {
        this._translated.next({
          src: word,
          dst: j.responseData.translatedText,
          langFrom,
          langTo
        });
      });
  }

  subscr = (callback: (record: {
    src: string,
    dst: string,
    langFrom: string,
    langTo: string,
  }) => any) => {
    this._translated.subscribe(callback);
  }
}
