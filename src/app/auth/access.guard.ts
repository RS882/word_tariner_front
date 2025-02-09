import {inject} from "@angular/core"
import {AuthService} from "./auth.service"
import {Router, UrlTree} from "@angular/router";
import {LexemeService} from "../data/services/lexeme/lexeme.service";
import {UserService} from "../data/services/user/user.service";
import {Role} from "../data/interfaces/role.type";
import {ResultService} from "../data/services/result/result.service";

export const canActivateAuth = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth) {
    return true;
  }
  if (authService.accessToken || authService.getTokenFromCookies()) {
    authService.setAuthStatus(true);
    return true;
  }
  return router.createUrlTree(['/login']);
}

export const canLexemesLoaded = (): boolean | UrlTree => {
  const isLoaded: boolean = inject(LexemeService).isLexemesLoaded;
  const router = inject(Router);
  return isLoaded || router.createUrlTree(['/lexeme-load'])
}

export const canTranslationsResultLoaded = (): boolean | UrlTree => {
  const result = inject(ResultService).translationsResults;
  const router = inject(Router);
  return !!result || router.createUrlTree(['/translations-result'])
}

export const canAdminRole = (): boolean | UrlTree => {
  const userRoles = inject(UserService).me?.roles;
  const router = inject(Router);
  return userRoles && userRoles.includes(Role.ADMIN) ||  router.createUrlTree(['/login'])
}
