import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TextBoxComponent} from "../text-box/text-box.component";
import {ErrorMessagesComponent} from "../error-messages/error-messages.component";

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    TextBoxComponent,
    ErrorMessagesComponent
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() form!: FormGroup;
  @Input() controlName: string = '';
  @Input() labelText: string = '';
  @Input() infoText?: string = '';

  get control() {
    return this.form.get(this.controlName);
  }

  get hasError(): boolean | undefined {
    if (this.control?.invalid && this.control?.touched) {
      return true;
    }
    return this.passwordsMismatchError;
  }

  get isValid(): boolean | undefined {
    return (this.control?.valid && this.control?.touched)
      && !this.passwordsMismatchError;
  }

  get errors() {
    return this.control?.errors;
  }

  get passwordsMismatchError() {
    if (this.controlName === 'repeatPassword') {
      return !!(this.form.errors && this.form.errors['passwordsMismatch']);
    }
    return false;
  }
}
