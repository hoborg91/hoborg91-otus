import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ILanguage, en, ru, defaultLanguages } from '../contracts/languages';
import { StateService } from '../state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  languages: ILanguage[] = defaultLanguages;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _state: StateService) { 
  }

  ngOnInit(): void {
  }

  saveSettings = () => {
    if (!this.settingsForm.valid)
      return;
    this._state.changeSettings(this.settingsForm.value);
  }

  languagesMustBeDifferent = (c: AbstractControl) => {
    if (c.get('langFrom').value === c.get('langTo').value) {
        return { invalid: true };
    }
  }

  settingsForm = this._fb.group({
    langFrom: [this._state.langFrom, Validators.required],
    langTo: [this._state.langTo, Validators.required],
  }, {validator: this.languagesMustBeDifferent});
}
