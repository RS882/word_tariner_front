import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered');
  const authService = inject(AuthService);
  const token = authService.accessToken;
  console.log(token);
  if (!token) return next(req);

  if (isRefreshing) {
    return refreshTokens(authService, req, next)
  }
  return next(addToken(req, token))
    .pipe(
      catchError(er => {
        if (er.status === 403) {
          return refreshTokens(authService, req, next)
        }
        return throwError(er)
      })
    );
}

const refreshTokens = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {

  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refresh()
      .pipe(
        switchMap(res => {
          isRefreshing = false;
          return next(addToken(req, res.accessToken))
        }))
  }
  return next(addToken(req, authService.accessToken!))
}

const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
  console.log('Adding token to request');
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
