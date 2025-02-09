import {Component, Input, SimpleChanges} from '@angular/core';
import {UserResultsTranslationInterface} from "../../data/interfaces/userResultsTranslation.interface";
import {Language} from "../../data/interfaces/language.type";

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent {

  @Input() content: UserResultsTranslationInterface | null = null;
  @Input() sourceLanguage: Language | null = null;

  wordMeaning: string = '';

  computeSuccessRate(): string {
    const {attempts, successfulAttempts = 0} = this.content || {};

    return attempts && attempts > 0
      ? `${(successfulAttempts / attempts * 100).toFixed(2)}%`
      : '0%';
  }

  ngOnInit(): void {
    if (this.content && this.sourceLanguage) {
      this.wordMeaning = Object.values(this.content.translations?.[this.sourceLanguage] ?? {})[0] ?? '';
    }
  }
}
