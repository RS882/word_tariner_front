import {Routes} from '@angular/router';
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {RegistrationPageComponent} from "./page/registration-page/registration-page.component";
import {LayoutComponent} from "./command-ui/layout/layout.component";
import {canActivateAuth} from "./auth/access.guard";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent},
      {
        path: 'some',
        component: LayoutComponent,
        canActivate: [canActivateAuth]
      }
    ]
  }
];
