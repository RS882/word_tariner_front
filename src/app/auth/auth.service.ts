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
import {UserService} from "../data/services/user/user.service";
import {Role} from "../data/interfaces/role.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);
  apiService = inject(ApiService);
  cookie = inject(CookieService);
  user = inject(UserService);

  private _accessToken: string = '';
  userId: number | null = null;
  userRole: Role[] | null = null;
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
        this.user.me=null;
      },
      undefined,
      () => {
        this.router.navigate(['login']);
      }
    ).subscribe();
  }

  saveLoginInfo(res: AuthInterface) {
    console.log('User authorized with ID : ',  res.userId)
    this.accessToken = res.accessToken;
    this.saveAccessToken(res.accessToken);
    this.user.getMe();
    this.userId = res.userId;
  }

  saveValidateInfo(res: ValidationInfoInterface) {
    if (res.isAuthorized) {
      console.log('User validation with ID : ',  res.userId,' and Role : ', res.roles)
      this.userRole = res.roles;
      this.userId = res.userId;
      this.user.getMe();
    } else this.logout();
  }

  saveAccessToken(token: string) {
    this.cookie.set(this.ACCESS_TOKEN, token);
  }

  getTokenFromCookies() {
    return this.cookie.get(this.ACCESS_TOKEN);
  }
}
