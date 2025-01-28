import {Component, inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectLabelComponent} from "../../../command-ui/select-label/select-label.component";
import {UploadLexemeService} from "../../../data/services/upload-lexeme/upload-lexeme.service";
import {ErrorService} from "../../../data/services/error/error.service";
import {Language} from "../../../data/interfaces/language.type";
import {fileValidation, getErrorsMessagesAfterValidation, languageValidation} from "../../../utilites/validators";
import {UploadFileComponent} from "../../../command-ui/upload-file/upload-file.component";
import {LexemesFilesInterface} from "../../../data/interfaces/lexemesFiles.interface";
import {lastValueFrom, throwError} from "rxjs";

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

  async onSubmit() {
    if (this.form.valid) {
      const value: LexemesFilesInterface = this.form.value;
      const fd = new FormData();
      fd.append('sourceLanguage', value.sourceLanguage);
      fd.append('targetLanguage', value.targetLanguage);
      try {
        for (const file of value.files) {
          fd.append('file', file);
          await lastValueFrom(this.upload.waitForModalClose());
          await lastValueFrom(this.upload.uploadFile(fd))
          fd.delete('file');
        }
      } catch (error) {
        throwError(error)
      }

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
