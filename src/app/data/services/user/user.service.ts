import {inject, Injectable, Injector} from '@angular/core';
import {UserRegistrationInterface} from "../../interfaces/userRegistration.interface";
import {HttpClient} from "@angular/common/http";
import {UserInfoInterface} from "../../interfaces/userInfo.interface";
import {apiConstants} from "../../../api/api.url";
import {ApiService} from "../../../api/api.service";
import {BehaviorSubject} from "rxjs";
import {UserUpdateInterface} from "../../interfaces/userUpdate.interface";
import {MessageService} from "../message/message.service";
import {AuthService} from "../../../auth/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {LoadingService} from "../loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _me = new BehaviorSubject<UserInfoInterface | null>(null);

  meStatus = this._me.asObservable();

  set me(value: UserInfoInterface | null) {
    this._me.next(value);
  }

  get me(): UserInfoInterface | null {
    return this._me ? this._me.value : null;
  }

  http = inject(HttpClient);
  apiService = inject(ApiService);
  messageService = inject(MessageService);
  injector = inject(Injector);
  cookie = inject(CookieService);
  router = inject(Router);
  load = inject(LoadingService);

  registration(payload: UserRegistrationInterface) {
    const request$ = this.http.post<UserInfoInterface>(
      apiConstants.userRegistration,
      payload,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.saveUserInfo(res);
      }
    );
  }

  getMe() {
    const request$ = this.http.get<UserInfoInterface>(
      apiConstants.userMe,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.saveUserInfo(res);
      }
    ).subscribe();
  }

  updateUserInfo(payload: UserUpdateInterface) {
    const request$ = this.http.put(
      apiConstants.userMe,
      payload,
      {withCredentials: true, observe: 'response'});
    return this.apiService.handleRequest(
      request$,
      res => {
        if (res.status === 205 || res.status === 401) {
          const auth = this.injector.get(AuthService);
          auth.accessToken = '';
          auth.userId = null;
          auth.userRole = null;
          auth.setAuthStatus(false);
          this.cookie.deleteAll();
        } else if (res.status === 204) {
          this.getMe();
          this.messageService.show(`User updated successfully`);
        } else {
          console.log('Status : ' + res.status);
        }
      }
    ).subscribe(res => {
      if (res.status === 205) {

        const auth = this.injector.get(AuthService);

        if (this.me !== null) {
          auth.login({
            email: payload.email || this.me.email,
            password: payload.password || payload.currentPassword
          }).subscribe({
            next: () => {
              this.router.navigate(['lexeme-load']);
            }
          })

        } else {
          this.router.navigate(['login'])
        }
      }
    });
  }

  saveUserInfo(userInfo: UserInfoInterface) {
    this.me = userInfo;
  }
}
