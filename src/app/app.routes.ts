import {Routes} from '@angular/router';
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {RegistrationPageComponent} from "./page/registration-page/registration-page.component";
import {LayoutComponent} from "./command-ui/layout/layout.component";
import {canActivateAuth, canAdminRole, canLexemesLoaded, canTranslationsResultLoaded} from "./auth/access.guard";
import {FormLayoutComponent} from "./command-ui/form-layout/form-layout.component";
import {LemexeLoadPageComponent} from "./page/lemexe-load-page/lemexe-load-page.component";
import {TrainerPageComponent} from "./page/trainer-page/trainer-page.component";
import {UploadNewLexemePageComponent} from "./page/admin-page/upload-new-lexeme-page/upload-new-lexeme-page.component";
import {
  UploadLexemesFilePageComponent
} from "./page/admin-page/upload-lexemes-file-page/upload-lexemes-file-page.component";
import {ProfilePageComponent} from "./page/profile-page/profile-page.component";
import {FormBoxComponent} from "./command-ui/form-box/form-box.component";
import {ResultPageComponent} from "./page/result-page/result-page.component";
import {TranslationsResultComponent} from "./page/translations-result/translations-result.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: FormLayoutComponent,
        children: [
          {path: '', component:FormBoxComponent},
          {path: 'login', component: LoginPageComponent},
          {path: 'registration', component: RegistrationPageComponent},
        ]
      },
      {
        path: 'lexeme-load',
        component: LemexeLoadPageComponent,
        canActivate: [canActivateAuth]
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivate: [canActivateAuth]
      },
      {
        path: 'result',
        component: ResultPageComponent,
        canActivate: [canActivateAuth]
      },
      {
        path: 'translations-result',
        component: TranslationsResultComponent,
        canActivate: [canActivateAuth, canTranslationsResultLoaded]
      },
      {
        path: 'trainer',
        component: TrainerPageComponent,
        canActivate: [canActivateAuth, canLexemesLoaded]
      },
      {
        path: 'admin',
        canActivate: [canActivateAuth, canAdminRole],
        children: [
          {path: 'lexemes/upload', component: UploadNewLexemePageComponent},
          {path: 'lexemes/upload-file', component: UploadLexemesFilePageComponent},
        ]
      },
    ],

  },
  {
    path: '**',
    redirectTo: '',
  },
];
