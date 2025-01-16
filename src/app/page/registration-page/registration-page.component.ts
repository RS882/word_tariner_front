import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {FormFieldComponent} from "../../command-ui/input-box/form-field/form-field.component";
import {UserService} from "../../data/services/user/user.service";
import {UserRegistrationInterface} from "../../data/interfaces/userRegistration.interface";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  userService: UserService = inject(UserService);
  auth: AuthService = inject(AuthService);

  router = inject(Router);

  form: FormGroup = new FormGroup({
    name: new FormControl(null,
      [Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)]),
    email: new FormControl(null,
      [Validators.required,
        Validators.email]),
    password: new FormControl(null,
      [Validators.required,
        Validators.pattern(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$`)]),
    repeatPassword: new FormControl(null,
      [Validators.required])
  }, {validators: this.passwordsMatchValidator('password', 'repeatPassword')});

  passwordsMatchValidator(passwordField: string, repeatPasswordField: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get(passwordField)?.value;
      const repeatPassword = form.get(repeatPasswordField)?.value;
      if (password && repeatPassword && password !== repeatPassword) {
        return {passwordsMismatch: true};
      }
      return null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;

      const registration : UserRegistrationInterface={
        userName: value.name,
        password: value.password,
        email: value.email,
      }

      this.userService.registration(registration)
        .subscribe({
          next: () => {
            this.auth.login({ email: registration.email, password: registration.password })
              .subscribe({
                next: () => {
                  this.router.navigate(['lexeme-load']);
                },
                error: (err) => {
                  console.error('Login failed:', err);
                }
              });
          },
          error: (err) => {
            console.error('Registration failed:', err);
          }
        });
    } else {
      console.error('Incorrect registration data');
    }
  }
}
