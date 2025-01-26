import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const languageValidation=
  (sourceLanguageField: string, targetLanguageField: string): ValidatorFn =>{
  return (form: AbstractControl): ValidationErrors | null => {
    const source = form.get(sourceLanguageField)?.value;
    const target = form.get(targetLanguageField)?.value;
    if (source && target && source === target) {
      return {languagesMismatch: true};
    }
    return null;
  };
}
