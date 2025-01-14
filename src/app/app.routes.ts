import {Routes} from '@angular/router';
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {RegistrationPageComponent} from "./page/registration-page/registration-page.component";
import {LayoutComponent} from "./command-ui/layout/layout.component";
import {canActivateAuth, canLexemesLoaded} from "./auth/access.guard";
import {FormLayoutComponent} from "./command-ui/form-layout/form-layout.component";
import {LemexeLoadPageComponent} from "./page/lemexe-load-page/lemexe-load-page.component";
import {TrainerPageComponent} from "./page/trainer-page/trainer-page.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: FormLayoutComponent, children: [
          {path: 'login', component: LoginPageComponent},
          {path: 'registration', component: RegistrationPageComponent},
        ]},
      {
        path: 'lexeme-load',
        component: LemexeLoadPageComponent,
        canActivate: [canActivateAuth]
      },
      {
        path: 'trainer',
        component: TrainerPageComponent,
        canActivate: [canLexemesLoaded]
      }
    ]
  }
];
