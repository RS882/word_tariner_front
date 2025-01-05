import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss'
})
export class ErrorMessagesComponent {
  @Input() hasError?: boolean = false;
  @Input() labelText: string = '';
  @Input() validateResults?: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validateResults']) {
      this.errorMessages = this.getErrorMessages(this.validateResults);
    }
  }

  errorMessages: string[] = this.getErrorMessages(this.validateResults);

  getErrorMessages(results?: { [key: string]: boolean }): string[] {
    return results ?
      Object.entries(results)
        .filter(([key, value]) => value)
        .map(([key]) => this.getErrorMessage(key))
      : [];
  }

  getErrorMessage(key: string): string {

    switch (key) {
      case 'required':
        return `${this.labelText} is required.`;
      case 'email':
        return `${this.labelText} has an invalid format.`;
      case 'pattern':
        return `Invalid  ${this.labelText} format.`;
      case 'minlength':
      case 'maxlength':
        return `Length of ${this.labelText}  is wrong.`;
      case 'passwordsMismatch':
        return `Password mismatch.`;
      default:
        return `${this.labelText} is not a valid format.`;
    }
  }
}
