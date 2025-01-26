import {inject, Injectable} from '@angular/core';
import {LexemeUploadInterface} from "../../interfaces/lexemeUpload.interface";
import {AuthInterface} from "../../interfaces/auth.interface";
import {apiConstants} from "../../../api/api.url";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../api/api.service";
import {ResponseMessageInterface} from "../../interfaces/responseMessage.interface";

@Injectable({
  providedIn: 'root'
})
export class UploadLexemeService {

  http=inject(HttpClient);
apiService=inject(ApiService);

  uploadLexeme(payload: LexemeUploadInterface){
    const request$ = this.http.post<ResponseMessageInterface>(
      apiConstants.lexeme, payload,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        console.log(res.message);
      }
    ).subscribe();
  }
}
