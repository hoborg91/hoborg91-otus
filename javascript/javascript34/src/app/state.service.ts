import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { en, ru } from './contracts/languages';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _settings = new Subject<{
    langFrom: string,
    langTo: string,
  }>();

  private _currentSettings: { langFrom: string, langTo: string } = { langFrom: en.value, langTo: ru.value };

  get langFrom() {
    return this._currentSettings.langFrom;
  }

  get langTo() {
    return this._currentSettings.langTo;
  }

  constructor() {
    this._settings.subscribe((settings: { langFrom: string, langTo: string }) => {
      this._currentSettings = settings;
    });
  }  

  subscribeToSettings = (
    onChange: (_: { langFrom: string, langTo: string }) => any) => 
  {
    this._settings.subscribe(onChange);
  }

  changeSettings = (settings: { langFrom: string, langTo: string }) => {
    this._settings.next(settings);
  }
}
