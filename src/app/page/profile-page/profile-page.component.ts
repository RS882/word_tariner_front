import {Component, inject, signal} from '@angular/core';
import {UserService} from "../../data/services/user/user.service";
import {UserInfoInterface} from "../../data/interfaces/userInfo.interface";
import {FormFieldComponent} from "../../command-ui/input-box/form-field/form-field.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {getErrorsMessagesAfterValidation, passwordsMatchValidator} from "../../utilites/validators";
import {catchError, EMPTY, Subscription, tap} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {UserUpdateInterface} from "../../data/interfaces/userUpdate.interface";
import {ErrorService} from "../../data/services/error/error.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  userService = inject(UserService);
  router = inject(Router);
  errorService = inject(ErrorService);
  auth = inject(AuthService);

  userInfo: UserInfoInterface | null = null;
  private routerSubscription: Subscription;

  form: FormGroup = new FormGroup({
    name: new FormControl({value: '', disabled: true},
      [Validators.maxLength(20),
        Validators.minLength(3)]),
    email: new FormControl({value: '', disabled: true},
      [Validators.email]),
    currentPassword: new FormControl(null,[Validators.required]),
    newPassword: new FormControl(null,
      [Validators.pattern(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=!])(?=\\S+$).{8,20}$`)]),
    repeatNewPassword: new FormControl(null)
  }, {validators: passwordsMatchValidator('newPassword', 'repeatNewPassword')});

  isChangeDisabled = signal<boolean>(true);

  constructor() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.cancelUpdate();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userService.meStatus.subscribe((value) => {
      if (value) {
        this.userInfo = value;
        this.form.patchValue({
          name: this.userInfo.userName,
          email: this.userInfo.email,
        });
      }
    });
  }

  changeInfoClick() {
    this.isChangeDisabled.set(false);
    this.form.get('name')?.enable();
    this.form.get('email')?.enable();
  }

  cancelUpdate() {
    this.isChangeDisabled.set(true);
    this.form.get('name')?.disable();
    this.form.get('email')?.disable();
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;

      const updatedUserInfo: UserUpdateInterface = {
        currentPassword: value.currentPassword,
        ...(value.name !== this.userInfo?.userName && value.name ? {userName: value.name} : {}),
        ...(value.newPassword ? {password: value.newPassword} : {}),
        ...(value.email !== this.userInfo?.email && value.email ? {email: value.email} : {})
      };
      this.userService.updateUserInfo(updatedUserInfo);
      this.form.reset({
        name: this.userInfo?.userName,
        email: this.userInfo?.email,
        currentPassword: null,
        newPassword: null,
        repeatNewPassword: null,
      })

    } else {
      getErrorsMessagesAfterValidation(this.form.errors, this.errorService)
    }
  }
}
