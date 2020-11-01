import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ILanguage, en, ru } from '../contracts/languages';
import { StateService } from '../state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input() languages: ILanguage[];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _state: StateService) { 
  }

  ngOnInit(): void {
  }

  saveSettings = () => {
    if (!this.settingsForm.valid)
      return;
    console.log(this.settingsForm.value);
    this._state.changeSettings(this.settingsForm.value);
  }

  languagesMustBeDifferent = (c: AbstractControl) => {
    if (c.get('langFrom').value === c.get('langTo').value) {
        return { invalid: true };
    }
  }

  settingsForm = this._fb.group({
    langFrom: [en.value, Validators.required],
    langTo: [ru.value, Validators.required],
  }, {validator: this.languagesMustBeDifferent});
}
