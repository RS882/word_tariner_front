import {Component, inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectLabelComponent} from "../../../command-ui/select-label/select-label.component";
import {UploadLexemeService} from "../../../data/services/upload-lexeme/upload-lexeme.service";
import {ErrorService} from "../../../data/services/error/error.service";
import {Language} from "../../../data/interfaces/language.type";
import {fileValidation, getErrorsMessagesAfterValidation, languageValidation} from "../../../utilites/validators";
import {UploadFileComponent} from "../../../command-ui/upload-file/upload-file.component";
import {LexemesFileUploadInterface} from "../../../data/interfaces/lexemesFileUpload.interface";

@Component({
  selector: 'app-upload-lexemes-file-page',
  standalone: true,
  imports: [
    FormsModule,
    SelectLabelComponent,
    ReactiveFormsModule,
    UploadFileComponent
  ],
  templateUrl: './upload-lexemes-file-page.component.html',
  styleUrl: './upload-lexemes-file-page.component.scss'
})
export class UploadLexemesFilePageComponent {

  @ViewChild(UploadFileComponent) uploadFileComponent!: UploadFileComponent;

  upload = inject(UploadLexemeService);
  errorService = inject(ErrorService);

  languages = Object.values(Language);

  form: FormGroup = new FormGroup({
    files: new FormControl<File[]>([], [Validators.required]),
    sourceLanguage: new FormControl(Language.EN || 'EN', [Validators.required]),
    targetLanguage: new FormControl(Language.DE || 'RU', [Validators.required])
  }, {
    validators: [
      languageValidation('sourceLanguage', 'targetLanguage'),
      fileValidation('files')]
  })

  onSubmit() {
    if (this.form.valid) {
      const payload: LexemesFileUploadInterface = this.form.value;
      console.log(payload);
      this.form.reset({
        files: [],
        sourceLanguage: Language.EN || 'EN',
        targetLanguage: Language.DE || 'RU'
      });
      this.uploadFileComponent.clearFiles();
    } else {
      const fieldsErrors = this.form.get('files')?.hasError('required') ?
        ['Files are required'] : undefined;
      if (this.form.errors) {
        getErrorsMessagesAfterValidation(this.form.errors, this.errorService, fieldsErrors);
      } else if (!!fieldsErrors) {
        this.errorService.show(fieldsErrors);
      }
    }
  }
}
