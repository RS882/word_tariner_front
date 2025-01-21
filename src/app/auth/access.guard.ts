import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router, UrlTree } from "@angular/router";
import {LexemeService} from "../data/services/lexeme/lexeme.service";

export const canActivateAuth=():boolean| UrlTree=>{
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth) {
    return true;
  }
  if ( authService.accessToken || authService.getTokenFromCookies()) {
    authService.setAuthStatus(true);
    return true;
  }
  return router.createUrlTree(['/login']);
}

export const canLexemesLoaded=():boolean| UrlTree=>{
  const isLoaded : boolean= inject(LexemeService).isLexemesLoaded;
  return isLoaded || inject(Router).createUrlTree(['/lexeme-load'])
}
