import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../data/interfaces/login.interface";
import {apiConstants} from "../constants/api.url";
import {AuthInterface} from "../data/interfaces/auth.interface";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  accessToken: string | null = null;
  userId: number | null = null;

  get isAuth() {
    return !!this.accessToken;
  }

  login(payload: LoginInterface) {
    return this.http.post<AuthInterface>(apiConstants.login, payload)
      .pipe(
        tap(res => this.savePayload(res))
      );
  }

  savePayload(res: AuthInterface) {
    console.log(res);
    this.accessToken = res.accessToken;
    this.userId = res.userId;
  }
}
