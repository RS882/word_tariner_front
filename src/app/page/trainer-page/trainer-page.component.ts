import {Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {TranslationsInterface} from "../../data/interfaces/translations.interface";
import {LexemeInterface} from "../../data/interfaces/lexeme.interface";
import {getUUID} from "../../utilites/uuid.utilites";
import {ResultService} from "../../data/services/result/result.service";
import {TrainerService} from "../../data/services/trainer/trainer.service";
import {ErrorService} from "../../data/services/error/error.service";
import {Subscription} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {SaveResultService} from "../../data/services/save-result/save-result.service";
import {SvgIconComponent} from "../../command-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-trainer-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent
  ],
  templateUrl: './trainer-page.component.html',
  styleUrl: './trainer-page.component.scss'
})
export class TrainerPageComponent implements OnDestroy{

  lexemeService = inject(LexemeService);
  resultService = inject(ResultService);
  trainerService = inject(TrainerService);
  errorService = inject(ErrorService);
  router = inject(Router);
  saveResult=inject(SaveResultService);

  lexemes: LexemeInterface | null = null;
  sourceWord: TranslationsInterface | null = null;
  listOfTranslations: TranslationsInterface[] = [];
  weights: number[] = [];

  private routerSubscription: Subscription;

  form: FormGroup = new FormGroup({
    translation: new FormControl(null, [Validators.required])
  })

  constructor() {
    this.lexemeService.lexemesChanged.subscribe(lexemes => {
      this.lexemes = lexemes;
      if (this.lexemes && this.lexemes.translations) {
        this.weights = this.lexemes.translations.map(() => 1);
      }
      this.getNewRandomWord();
    });
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.saveResult.showModal();
        console.log('Data sent before navigating to:', event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  getSourceWordMeaning(): string {
    if (!this.sourceWord || !this.lexemes) return '';
    let translations = this.sourceWord.translations[this.lexemes.sourceLanguage];
    return translations ? this.rearrangeString(Object.values(translations)[0]) : '';
  }

  rearrangeString(text: string): string {
    if(this.lexemes && this.lexemes.sourceLanguage==='DE') {
      const parts = text.trim().split(/\s+/);
      if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        if (['der', 'die', 'das'].includes(lastPart)) {
          parts.pop();
          parts.unshift(lastPart);
        }
      }
      return parts.join(" ");
    }else return text;
  }

  getTargetMeaning(translation: TranslationsInterface): string {
    if (!this.lexemes) return '';
    const targetLanguage = this.lexemes.targetLanguage;
    const meaning = translation.translations[targetLanguage];
    return meaning ? Object.values(meaning)[0] : '';
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

    const sourceIndex = this.lexemes?.translations
      .findIndex(e => e === this.sourceWord);

    const indices = new Set<number>();

    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * lexemes.translations.length);
      if (randomIndex !== sourceIndex) indices.add(randomIndex);
    }
    const result: TranslationsInterface[] = Array.from(indices).map(i => lexemes.translations[i]);
    const randomIndex = Math.floor(Math.random() * (result.length + 1));
    result.splice(randomIndex, 0, this.sourceWord);
    return result;
  }

  getNewRandomWord() {
    if (this.lexemes && this.lexemes.translations) {
      this.sourceWord = this.getRandomTranslationWithWeight();
      this.listOfTranslations = this.lexemes?.translations.length <= 5 ?
        this.lexemes.translations :
        this.getRandomElements();
    }
  }

  onSubmit() {
    if(this.form.valid){
    const value = this.form.value;
    if (this.sourceWord) {
      const isSuccessful = this.getTargetMeaning(this.sourceWord) === value.translation;

      this.resultService.addResult(
        this.sourceWord.lexemeId,
        isSuccessful);

      this.trainerService.setCurrentWordStatus({
        word: this.getSourceWordMeaning(),
        translation: this.sourceWord ? this.getTargetMeaning(this.sourceWord) : '',
        isSuccessful: isSuccessful
      });
    }
    this.getNewRandomWord();

    this.resultService.showModal();
    this.form.reset();
    }else{
      this.errorService.show(['Сhoose your answer']);
    }
  }

  protected readonly getUUID = getUUID;
}
