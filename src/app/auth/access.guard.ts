import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router, UrlTree } from "@angular/router";

export const canActivateAuth=():boolean| UrlTree=>{

    const isLoggendIn : boolean= inject(AuthService).isAuth;

    console.log(isLoggendIn);
    return isLoggendIn || inject(Router).createUrlTree(['/login'])
}
