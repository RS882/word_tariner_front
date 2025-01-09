import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Language, LANGUAGES} from "../../data/interfaces/language.type";
import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {ErrorService} from "../../data/services/error/error.service";

@Component({
  selector: 'app-lemexe-load-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lemexe-load-page.component.html',
  styleUrl: './lemexe-load-page.component.scss'
})
export class LemexeLoadPageComponent {

  lexemeService = inject(LexemeService);
  errorService=inject(ErrorService);

  languages: readonly  Language[] = LANGUAGES;

  counts: number[] = [10, 20, 30, 40, 50];

  form: FormGroup = new FormGroup({
    sourceLanguage: new FormControl(this.languages[0] || 'EN', [Validators.required]),
    targetLanguage: new FormControl(this.languages[1] || 'RU', [Validators.required]),
    countOfWords: new FormControl(this.counts[0] || 10, [Validators.required]),
  }, {validators: this.languageValidation('sourceLanguage', 'targetLanguage')})

  languageValidation(sourceLanguageField: string, targetLanguageField: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const source = form.get(sourceLanguageField)?.value;
      const target = form.get(targetLanguageField)?.value;
      if (source && target && source === target) {
        return {languagesMismatch: true};
      }
      return null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.lexemeService.loadLexemes(value.sourceLanguage, value.targetLanguage, value.countOfWords)
    }else{
      this.errorService.show(['Selected languages match'])
    }
  }

}
