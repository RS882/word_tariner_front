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

  get control() {
    return this.form.get(this.controlName);
  }

  get hasError(): boolean | undefined {
    return this.control?.invalid && this.control?.touched;
  }

  get isValid(): boolean | undefined {
    return this.control?.valid && this.control?.touched;
  }

  get errors() {
    return this.control?.errors;
  }
}
