import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IWordPair } from './contracts/word';
import { distinct } from './infrastructure/utilities';

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  private static Key = 'https://github.com/hoborg91/hoborg91-otus/angular/dictionary';

  private get _recrods(): IWordPair[] {
    let arrStr = localStorage.getItem(DictionaryStorageService.Key);
    let arr = arrStr === null
      ? []
      : JSON.parse(arrStr);
    return arr;
  }

  private _changed = new Subject<void>();
  
  constructor() { }

  saveOrUpdate = (record: IWordPair) => {
    this._check(record);
    let arr = this._recrods;
    arr.push(record);
    localStorage.setItem(DictionaryStorageService.Key, JSON.stringify(distinct(arr)));
    this._changed.next();
  }

  remove = (record: IWordPair) => {
    let arr = this._recrods.filter(r => !(true
      && r.langFrom === record.langFrom
      && r.langTo === record.langTo
      && r.src === record.src
      && r.dst === record.dst
    ));
    localStorage.setItem(DictionaryStorageService.Key, JSON.stringify(arr));
    this._changed.next();
  }

  getAllWords: () => IWordPair[] = () => {
    return this._recrods;
  }

  showAsString = () => {
    let arr = this._recrods;
    return arr
      .map(({ src, dst, langFrom, langTo }) => `${src} (${langFrom}) -> ${dst} (${langTo})`)
      .reduce((a, b) => a + '\n' + b);
  }

  subscribeToChanges = (onChange: () => any) => {
    this._changed.subscribe(onChange);
  }

  private _check = (record: IWordPair) => {
    if (false
      || !record.langFrom
      || !record.langTo
      || !record.src
      || !record.dst
    )
      throw new Error('The given word pair is malformed.');
  }
}
