import {inject, Injectable} from '@angular/core';
import {UserRegistrationInterface} from "../../interfaces/userRegistration.interface";
import {HttpClient} from "@angular/common/http";
import {UserInfoInterface} from "../../interfaces/userInfo.interface";
import {apiConstants} from "../../../api/api.url";
import {ApiService} from "../../../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userEmail: string = '';
  userId: number | null = null;

  http = inject(HttpClient);
  apiService = inject(ApiService);

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

  saveUserInfo(userInfo: UserInfoInterface) {
    this.userName = userInfo.userName;
    this.userEmail = userInfo.email;
    this.userId = userInfo.userId;

    console.log("userName", this.userName);
    console.log("userEmail", this.userEmail);
    console.log("userId", this.userId);
  }
}
