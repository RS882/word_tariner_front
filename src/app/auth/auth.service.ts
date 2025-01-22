import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../data/interfaces/login.interface";
import {apiConstants} from "../api/api.url";
import {AuthInterface} from "../data/interfaces/auth.interface";
import {BehaviorSubject} from "rxjs";
import {ValidationInfoInterface} from "../data/interfaces/validationInfo.interface";
import {Router} from "@angular/router";
import {ApiService} from "../api/api.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);
  apiService = inject(ApiService);
  cookie = inject(CookieService);

  private _accessToken: string = '';
  userId: number | null = null;
  userRole: string[] | null = null;
  ACCESS_TOKEN: string = 'accessToken';

  private _isAuth = new BehaviorSubject<boolean>(false);

  authStatusChanged = this._isAuth.asObservable();

  get isAuth(): boolean {
    return this._isAuth.value;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._isAuth.next(isAuthenticated);
  }

  login(payload: LoginInterface) {
    const request$ = this.http.post<AuthInterface>(
      apiConstants.login, payload,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.saveLoginInfo(res);
        this.setAuthStatus(true);
      }
    );
  }

  validation() {
    const request$ = this.http.get<ValidationInfoInterface>(
      apiConstants.validation, {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.saveValidateInfo(res);
        this.setAuthStatus(true);
      }
    ).subscribe();
  }

  refresh() {
    const request$ = this.http.get<AuthInterface>(
      apiConstants.refresh, {withCredentials: true});
    console.log('Refresh request');
    return this.apiService.handleRequest(
      request$,
      res => {
        this.saveLoginInfo(res);
        this.setAuthStatus(true);
      }
    );
  }

  logout(): void {
    const request$ = this.http.get(apiConstants.logout, {withCredentials: true});
    this.apiService.handleRequest(
      request$,
      () => {
        this.accessToken = '';
        this.userId = null;
        this.userRole = null;
        this.setAuthStatus(false);
        this.cookie.deleteAll();
      },
      undefined,
      () => {
        this.router.navigate(['login']);
      }
    ).subscribe();
  }

  saveLoginInfo(res: AuthInterface) {
    console.log(res);
    this.accessToken = res.accessToken;
    this.saveAccessToken(res.accessToken);
    this.userId = res.userId;
  }

  saveValidateInfo(res: ValidationInfoInterface) {
    if (res.isAuthorized) {
      console.log(res)
      this.userRole = res.roles;
      this.userId = res.userId;
    } else this.logout();
  }

  saveAccessToken(token: string) {
    this.cookie.set(this.ACCESS_TOKEN, token);
  }

  getTokenFromCookies() {
    return this.cookie.get(this.ACCESS_TOKEN);
  }
}
