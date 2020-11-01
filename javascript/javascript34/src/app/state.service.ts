import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private _settings = new Subject<{
    langFrom: string,
    langTo: string,
  }>();

  subscribeToSettings = (
    onChange: (_: { langFrom: string, langTo: string }) => any) => 
  {
    this._settings.subscribe(onChange);
  }

  changeSettings = (settings: { langFrom: string, langTo: string }) => {
    this._settings.next(settings);
  }
}
