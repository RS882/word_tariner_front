import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {TranslationsInterface} from "../../data/interfaces/translations.interface";
import {LexemeInterface} from "../../data/interfaces/lexeme.interface";
import {getUUID} from "../../utilites/uuid.utilites";

@Component({
  selector: 'app-trainer-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './trainer-page.component.html',
  styleUrl: './trainer-page.component.scss'
})
export class TrainerPageComponent {

  lexemeService = inject(LexemeService);

  lexemes: LexemeInterface | null = null;
  sourceWord: TranslationsInterface | null = null;
  listOfTranslations: TranslationsInterface[] = [];
  weights: number[] = [];

  form: FormGroup = new FormGroup({
    translation: new FormControl(null, [Validators.required])
  })

  constructor() {
    this.lexemeService.lexemesChanged.subscribe(lexemes => {
      this.lexemes = lexemes;
      if (this.lexemes && this.lexemes.translations) {
        this.weights = this.lexemes.translations.map(() => 1);
        this.sourceWord = this.getRandomTranslationWithWeight();
        this.listOfTranslations = this.lexemes.translations.length <= 5 ?
          this.lexemes.translations : this.getRandomElements();
      }
    });
  }

  get sourceWordMeaning(): string {
    if (!this.sourceWord) return '';
    const enTranslations = this.sourceWord.translations?.EN;
    return enTranslations ? Object.values(enTranslations)[0] : '';
  }

  getRandomTranslationWithWeight(): TranslationsInterface | null {
    if (!this.lexemes?.translations?.length) return null;

    const totalWeight = this.weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < this.lexemes.translations.length; i++) {
      random -= this.weights[i];
      if (random <= 0) {
        return this.lexemes.translations[i];
      }
    }
    return null;
  }

  getRandomElements(count: number = 4): TranslationsInterface[] {
    const lexemes = this.lexemes;

    if (!lexemes?.translations?.length) return [];
    if (!this.sourceWord) return [];

    const indices = new Set<number>();

    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * lexemes.translations.length);
      indices.add(randomIndex);
    }
    const result: TranslationsInterface[] = Array.from(indices).map(i => lexemes.translations[i]);
    const randomIndex = Math.floor(Math.random() * (result.length + 1));
    result.splice(randomIndex, 0, this.sourceWord);
    return result;
  }

  getTargetMeaning(translation: TranslationsInterface): string | null {
    if (!this.lexemes) return '';
    const targetLanguage = this.lexemes.targetLanguage;

    const meaning = translation.translations[targetLanguage];
    return meaning ? Object.values(meaning)[0] : null;
  }

  onSubmit() {
    const value = this.form.value;
    console.log(this.sourceWord);
    console.log(value);

    if (this.lexemes && this.lexemes.translations) {
      this.sourceWord = this.getRandomTranslationWithWeight();
      this.listOfTranslations = this.lexemes?.translations.length <= 5 ?
        this.lexemes.translations :
        this.getRandomElements();
    }
  }

  protected readonly getUUID = getUUID;
}
