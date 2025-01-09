import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../data/interfaces/login.interface";
import {apiConstants} from "../api/api.url";
import {AuthInterface} from "../data/interfaces/auth.interface";
import {BehaviorSubject} from "rxjs";
import {ValidationInfoInterface} from "../data/interfaces/validationInfo.interface";
import {Router} from "@angular/router";
import {LoadingService} from "../data/services/loading/loading.service";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);
  apiService = inject(ApiService);

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
    );
  }

  refresh() {
    const request$ = this.http.get<AuthInterface>(
      apiConstants.refresh, {withCredentials: true});
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
        this.accessToken = null;
        this.userId = null;
        this.userRole = null;
        this.setAuthStatus(false);
      },
      undefined,
      () => {
        this.router.navigate(['']);
      }
    );
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
