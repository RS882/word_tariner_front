import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";
import {ErrorService} from "../data/services/error/error.service";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const errors = inject(ErrorService);
  const token = authService.accessToken;
  if (!token) return next(req);

  if (isRefreshing) {
    return refreshTokens(authService, req, next)
  }
  return next(addToken(req, token))
    .pipe(
      catchError(er => er.status === 401 ?
        refreshTokens(authService, req, next) :
        throwError(er))
    );
}

const refreshTokens = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {

  if (!isRefreshing) {
    isRefreshing = true;
    console.log("Refreshing...");
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
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
