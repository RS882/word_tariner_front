import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserResultsTranslationInterface} from "../../data/interfaces/userResultsTranslation.interface";
import {Language} from "../../data/interfaces/language.type";
import {FormsModule} from "@angular/forms";
import {UpdateLexemeResultIsActiveInterface} from "../../data/interfaces/updateLexemeResultIsActive.interface";

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent {

  @Input() content: UserResultsTranslationInterface | null = null;
  @Input() sourceLanguage: Language | null = null;

  @Output() checkboxChange = new EventEmitter<UpdateLexemeResultIsActiveInterface>();

  wordMeaning: string = '';

  computeSuccessRate(): string {
    const {attempts, successfulAttempts = 0} = this.content || {};
    return attempts && attempts > 0
      ? `${(successfulAttempts / attempts * 100).toFixed(2)}%`
      : '0%';
  }

  checkboxValue: UpdateLexemeResultIsActiveInterface | null = null;

  onCheckboxChange(event: Event): void {
    if (this.checkboxValue) {
      const target = event.target as HTMLInputElement;
      this.checkboxValue = {
        ...this.checkboxValue,
        isActive: target.checked
      };
      this.checkboxChange.emit(this.checkboxValue);
      console.log("checkboxValue", this.checkboxValue);
    }
  }

  ngOnInit(): void {
    if (this.content && this.sourceLanguage) {
      this.checkboxValue = {
        isActive: this.content.isActive,
        lexemeId: this.content.lexemeId
      };
      if (this.sourceLanguage) {
        this.wordMeaning = Object.values(this.content.translations?.[this.sourceLanguage] ?? {})[0] ?? '';
      }
    }
  }
}
