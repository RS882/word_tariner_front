import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Language} from "../../../data/interfaces/language.type";
import {languageValidation} from "../../../utilites/validators";
import {SelectLabelComponent} from "../../../command-ui/select-label/select-label.component";
import {LexemeType} from "../../../data/interfaces/lexemeType.type";
import {FormFieldComponent} from "../../../command-ui/input-box/form-field/form-field.component";
import {LexemeUploadInterface} from "../../../data/interfaces/lexemeUpload.interface";
import {UploadLexemeService} from "../../../data/services/upload-lexeme/upload-lexeme.service";
import {ErrorService} from "../../../data/services/error/error.service";

@Component({
  selector: 'app-upload-new-lexeme-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectLabelComponent,
    FormFieldComponent
  ],
  templateUrl: './upload-new-lexeme-page.component.html',
  styleUrl: './upload-new-lexeme-page.component.scss'
})
export class UploadNewLexemePageComponent {

  upload = inject(UploadLexemeService);
  errorService = inject(ErrorService);

  languages = Object.values(Language);
  types = Object.values(LexemeType);

  form: FormGroup = new FormGroup({
    sourceLexeme: new FormControl('', [Validators.required]),
    targetLexeme: new FormControl('', [Validators.required]),
    typeLexeme: new FormControl(LexemeType.WORD, [Validators.required]),
    sourceLanguage: new FormControl(Language.EN || 'EN', [Validators.required]),
    targetLanguage: new FormControl(Language.DE || 'RU', [Validators.required])
  }, {validators: languageValidation('sourceLanguage', 'targetLanguage')})

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      const payload: LexemeUploadInterface = {
        sourceMeaning: value.sourceLexeme,
        targetLanguage: value.targetLanguage,
        sourceLanguage: value.sourceLanguage,
        targetMeaning: value.targetLexeme,
        type: value.typeLexeme,
      }
      this.upload.uploadLexeme(payload);
      this.form.reset({
        sourceLexeme: '',
        targetLexeme: '',
        typeLexeme: LexemeType.WORD,
        sourceLanguage: Language.EN || 'EN',
        targetLanguage: Language.DE || 'RU'
      });
    } else {
      this.errorService.show(['Selected languages match'])
    }
  }
}
