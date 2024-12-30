import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {TextBoxComponent} from "../../command-ui/input-box/text-box/text-box.component";
import {ErrorMessagesComponent} from "../../command-ui/input-box/error-messages/error-messages.component";
import {FormFieldComponent} from "../../command-ui/input-box/form-field/form-field.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TextBoxComponent, ErrorMessagesComponent, FormFieldComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService: AuthService = inject(AuthService);
  router = inject(Router);

  form: FormGroup = new FormGroup({
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null,
      [Validators.required, Validators.pattern(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$`)])
  })

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(() => {
          this.router.navigate([''])
        });
    } else {
      console.error('Incorrect login data');
    }
  }
}
