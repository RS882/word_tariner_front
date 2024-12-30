import {inject, Injectable} from '@angular/core';
import {UserRegistrationInterface} from "../../interfaces/userRegistration.interface";
import {HttpClient} from "@angular/common/http";
import {UserInfoInterface} from "../../interfaces/userInfo.interface";
import {apiConstants} from "../../../constants/api.url";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userEmail: string = '';
  userId: number | null = null;

  http = inject(HttpClient);

  registration(payload: UserRegistrationInterface) {
    return this.http.post<UserInfoInterface>(apiConstants.userRegistration, payload)
      .pipe(
        tap(res => this.saveUserInfo(res))
      );
  }

  saveUserInfo(userInfo: UserInfoInterface) {
    this.userName = userInfo.userName;
    this.userEmail = userInfo.email;
    this.userId =userInfo.userId;

    console.log("userName", this.userName);
    console.log("userEmail", this.userEmail);
    console.log("userId", this.userId);
  }
}
