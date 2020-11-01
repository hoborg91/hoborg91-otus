import { Component, Input, OnInit } from '@angular/core';
import { IWordPair } from '../contracts/word';
import { DictionaryStorageService } from '../dictionary-storage.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { ILanguage, en, ru, defaultLanguages } from '../contracts/languages';
import { VocabularyService } from '../vocabulary.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  words: IWordPair[];

  languages: ILanguage[] = defaultLanguages;

  addWordForm = this._fb.group({
    langFrom: ['', Validators.required],
    langTo: ['', Validators.required],
    src: ['', Validators.required],
    dst: ['', Validators.required],
  });

  get langFrom() {
    return this._state.langFrom;
  }
  get langTo() {
    return this._state.langTo;
  }

  textToBeAnalyzed = new FormControl('');

  get langFromText() {
    const lang = this.languages.filter(l => l.value === this.langFrom);
    return lang.length > 0
      ? ` in ${lang[0].viewValue}`
      : null;
  }

  get langToText() {
    const lang = this.languages.filter(l => l.value === this.langTo);
    return lang.length > 0
      ? ` to ${lang[0].viewValue}`
      : null;
  }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _state: StateService,
    private readonly _vocab: VocabularyService,
    private readonly _dict: DictionaryStorageService
  ) {
    // this._state.subscribeToSettings(settings => {
    //   this.langFrom = settings.langFrom;
    //   this.langTo = settings.langTo;
    // });
    this._dict.subscribeToChanges(() => {
      this.words = _dict.getAllWords();
    })
    this.words = _dict.getAllWords();
  }

  ngOnInit = () => {
  }

  addWord = () => {
    if (!this.addWordForm.valid)
      return;
    this._dict.saveOrUpdate(this.addWordForm.value);
  }

  removeWord = (record: IWordPair) => {
    this._dict.remove(record);
  }

  analyzeText = () => {
    this._vocab.analyze(this.textToBeAnalyzed.value, this.langFrom, this.langTo);
    this.textToBeAnalyzed.setValue('');
  }
}
