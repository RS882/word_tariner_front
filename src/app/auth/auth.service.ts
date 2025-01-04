import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../data/interfaces/login.interface";
import {apiConstants} from "../constants/api.url";
import {AuthInterface} from "../data/interfaces/auth.interface";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {ValidationInfoInterface} from "../data/interfaces/validationInfo.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);

  accessToken: string | null = null;
  userId: number | null = null;
  userRole: string[] | null = null;

  private _isAuth = new BehaviorSubject<boolean>(false);

  authStatusChanged = this._isAuth.asObservable();

  get isAuth(): boolean {
    return this._isAuth.value;
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._isAuth.next(isAuthenticated);
  }

  login(payload: LoginInterface) {
    return this.http.post<AuthInterface>(apiConstants.login, payload,
      {withCredentials: true})
      .pipe(
        tap(res => {
          this.saveLoginInfo(res);
          this.setAuthStatus(true);
        }),
        catchError(err => {
          console.error('Login error:', err);
          this.logout();
          return throwError(() => err);
        })
      );
  }

  validation() {
    return this.http.get<ValidationInfoInterface>(apiConstants.validation,
      {withCredentials: true})
      .pipe(
        tap(res => {
          this.saveValidateInfo(res);
          this.setAuthStatus(true);
        }),
        catchError(err => {
          console.error('Validation error:', err);
          this.logout();
          return throwError(() => err);
        })
      );
  }

  refresh() {
    return this.http.get<AuthInterface>(apiConstants.refresh,
      {withCredentials: true})
      .pipe(
        tap(res => {
          this.saveLoginInfo(res);
          this.setAuthStatus(true);
        }),
        catchError(err => {
          console.error('Refresh error:', err);
          this.logout();
          return throwError(() => err);
        })
      );
  }

  logout() {
    this.http.get(apiConstants.logout,
      {withCredentials: true})
      .pipe(
        tap(res => {
          this.accessToken = null;
          this.userId = null;
          this.userRole = null;
          this.setAuthStatus(false);
        }),
        catchError((err) => {
          console.error('Logout error:', err);
          return throwError(() => err);
        })
      ).subscribe({
      complete: () => {
        this.router.navigate(['']);
      },
    });
  }

  saveLoginInfo(res: AuthInterface) {
    console.log(res);
    this.accessToken = res.accessToken;
    this.userId = res.userId;
  }

  saveValidateInfo(res: ValidationInfoInterface) {
    console.log(res)
    this.userRole = res.roles;
  }
}
