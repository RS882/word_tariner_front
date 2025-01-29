import {inject, Injectable} from '@angular/core';
import {UserRegistrationInterface} from "../../interfaces/userRegistration.interface";
import {HttpClient} from "@angular/common/http";
import {UserInfoInterface} from "../../interfaces/userInfo.interface";
import {apiConstants} from "../../../api/api.url";
import {ApiService} from "../../../api/api.service";
import {BehaviorSubject} from "rxjs";
import {UserUpdateInterface} from "../../interfaces/userUpdate.interface";
import {MessageService} from "../message/message.service";

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
    const request$ = this.http.put<UserInfoInterface>(
      apiConstants.userMe,
      payload,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.messageService.show(`User ${res.userName} updated successfully. You need to log in again`);

      }
    ).subscribe();
  }

  saveUserInfo(userInfo: UserInfoInterface) {
    this.me = userInfo;
  }
}
