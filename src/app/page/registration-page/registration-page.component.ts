import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextBoxComponent} from "../../command-ui/input-box/text-box/text-box.component";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {ErrorMessagesComponent} from "../../command-ui/input-box/error-messages/error-messages.component";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    FormsModule,

    TextBoxComponent,
    ReactiveFormsModule,
    ErrorMessagesComponent
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
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
