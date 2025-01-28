import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ErrorService} from "../data/services/error/error.service";

export const languageValidation =
  (sourceLanguageField: string, targetLanguageField: string): ValidatorFn => {
    return (form: AbstractControl): ValidationErrors | null => {
      const source = form.get(sourceLanguageField)?.value;
      const target = form.get(targetLanguageField)?.value;
      if (source && target && source === target) {
        return {languagesMismatch: 'Selected languages match'};
      }
      return null;
    };
  }

export const fileValidation = (filesField: string): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const files: File[] = form.get(filesField)?.value;
    const allowedExtensions = ['.xls', '.xlsx'];
    const hasInvalidFile = files.some(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return fileExtension && !allowedExtensions.includes(`.${fileExtension}`);
    });
    if (hasInvalidFile) {
      return {invalidFileType: 'Only Excel files (.xls, .xlsx) are allowed'};
    }
    return null;
  };
}

export const passwordsMatchValidator = (passwordField: string, repeatPasswordField: string): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordField)?.value;
    const repeatPassword = form.get(repeatPasswordField)?.value;

    if ( password !== repeatPassword) {
      return {passwordsMismatch: 'Passwords do not match'};
    }
    return null;
  };
}

export const getErrorsMessagesAfterValidation =
  (errors: ValidationErrors | null, errorService: ErrorService, otherErrorsMessages?: string[]) => {
    if (errors) {
      const errorMessage: string[] = Object.values(errors);
      if (otherErrorsMessages && otherErrorsMessages.length > 0) {
        errorMessage.push(...otherErrorsMessages);
      }
      errorService.show(errorMessage);
    }
  }
