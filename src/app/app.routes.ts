import { Routes } from '@angular/router';
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {RegistrationPageComponent} from "./page/registration-page/registration-page.component";
import {LayoutComponent} from "./command-ui/layout/layout.component";

export const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
      { path: '', component: LoginPageComponent },
      { path: 'registration', component:RegistrationPageComponent }
    ]}
];
