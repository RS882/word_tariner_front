import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router, UrlTree } from "@angular/router";
import {LexemeService} from "../data/services/lexeme/lexeme.service";

export const canActivateAuth=():boolean| UrlTree=>{
    const isLoggendIn : boolean= inject(AuthService).isAuth;
    return isLoggendIn || inject(Router).createUrlTree(['/login'])
}

export const canLexemesLoaded=():boolean| UrlTree=>{
  const isLoaded : boolean= inject(LexemeService).isLexemesLoaded;
  return isLoaded || inject(Router).createUrlTree(['/lexeme-load'])
}
