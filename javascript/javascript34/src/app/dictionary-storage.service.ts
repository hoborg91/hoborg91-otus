import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {
  private static Key = 'https://github.com/hoborg91/hoborg91-otus/angular/dictionary';

  private get _recrods() {
    let arrStr = localStorage.getItem(DictionaryStorageService.Key);
    let arr = arrStr === null
      ? []
      : JSON.parse(arrStr);
    return arr;
  }
  
  constructor() { }

  saveOrUpdate = (record: { 
    src: string, 
    dst: string, 
    langFrom: string, 
    langTo: string 
  }) => {
    let arr = this._recrods;
    arr.push(record);
    localStorage.setItem(DictionaryStorageService.Key, JSON.stringify(arr));
  }

  showAsString = () => {
    let arr = this._recrods;
    return arr
      .map(({ src, dst, langFrom, langTo }) => `${src} (${langFrom}) -> ${dst} (${langTo})`)
      .reduce((a, b) => a + '\n' + b);
  }
}
