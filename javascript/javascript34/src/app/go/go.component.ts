import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ILanguage, en, ru, defaultLanguages } from '../contracts/languages';
import { IWordPair } from '../contracts/word';
import { DictionaryStorageService } from '../dictionary-storage.service';
import { getRandomInt } from '../infrastructure/utilities';
import { StateService } from '../state.service';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {
  languages: ILanguage[] = defaultLanguages;
  
  get langFrom() {
    return this._state.langFrom;
  }
  get langTo() {
    return this._state.langTo;
  }

  src: string = null;
  expectedDst: string = null;

  answer = new FormControl('');

  private _wordsBank: IWordPair[];

  get langFromText() {
    const lang = this.languages.filter(l => l.value === this.langFrom);
    return lang.length > 0
      ? ` from ${lang[0].viewValue}`
      : null;
  }

  get langToText() {
    const lang = this.languages.filter(l => l.value === this.langTo);
    return lang.length > 0
      ? ` to ${lang[0].viewValue}`
      : null;
  }

  constructor(
    private readonly _state: StateService,
    private readonly _dict: DictionaryStorageService
  ) {
    this._state.subscribeToSettings(settings => {
      this._reloadBank();
    });
    this._dict.subscribeToChanges(() => {
      this._reloadBank();
    });
    this._reloadBank();
  }

  ngOnInit(): void {
  }

  private _reloadBank = () => {
    this._wordsBank = this._dict.getAllWords()
      .filter(pair => pair.langFrom === this.langFrom && pair.langTo === this.langTo);
    this._nextPair();
  }

  private _nextPair = () => {
    this.answer.setValue('');
    if (this._wordsBank.length === 0) {
      this.src = null;
      this.expectedDst = null;
      return;
    }
    const index = getRandomInt(0, this._wordsBank.length - 1);
    this.src = this._wordsBank[index].src;
    this.expectedDst = this._wordsBank[index].dst;
  }

  giveAnswer = () => {
    if ((this.answer.value as string).toLowerCase() === this.expectedDst.toLowerCase()) {
      alert(`Correct!`);
    } else {
      alert(`Wrong :-(\nExpected answer was: "${this.expectedDst}".`);
    }
    this._nextPair();
  }
}
