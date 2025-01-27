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

import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {ErrorService} from "../../data/services/error/error.service";
import {getUUID} from "../../utilites/uuid.utilites";
import {Language} from "../../data/interfaces/language.type";
import {getErrorsMessagesAfterValidation, languageValidation} from "../../utilites/validators";
import {SelectLabelComponent} from "../../command-ui/select-label/select-label.component";

@Component({
  selector: 'app-lemexe-load-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectLabelComponent
  ],
  templateUrl: './lemexe-load-page.component.html',
  styleUrl: './lemexe-load-page.component.scss'
})
export class LemexeLoadPageComponent {

  lexemeService = inject(LexemeService);
  errorService=inject(ErrorService);

  languages = Object.values(Language);

  counts: number[] = [10, 20, 30, 40, 50];

  form: FormGroup = new FormGroup({
    sourceLanguage: new FormControl(Language.EN || 'EN', [Validators.required]),
    targetLanguage: new FormControl(Language.DE || 'RU', [Validators.required]),
    countOfWords: new FormControl(this.counts[0] || 10, [Validators.required]),
  }, {validators: languageValidation('sourceLanguage', 'targetLanguage')})


  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.lexemeService.loadLexemes(value.sourceLanguage, value.targetLanguage, value.countOfWords)
    }else{
      getErrorsMessagesAfterValidation(this.form.errors, this.errorService);
    }
  }
}
