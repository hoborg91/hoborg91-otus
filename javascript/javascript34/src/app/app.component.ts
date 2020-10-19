import { Component } from '@angular/core';
import { DictionaryStorageService } from './dictionary-storage.service';
import { VocabularyService } from './vocabulary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vocabulary training';

  constructor(
    private readonly _vocab: VocabularyService,
    private readonly _storage: DictionaryStorageService
  ) {

  }

  public testServices = () => {
    const text = prompt('Enter short text in english');
    if (text.length > 100) {
      alert('The given text is too long.');
      return;
    }
    this._vocab.analyze(text, 'en', 'ru');
  }

  public showStorage = () => {
    alert(this._storage.showAsString());
  }
}
