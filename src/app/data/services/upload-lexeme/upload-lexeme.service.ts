import {inject, Injectable} from '@angular/core';
import {LexemeUploadInterface} from "../../interfaces/lexemeUpload.interface";
import {apiConstants} from "../../../api/api.url";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../api/api.service";
import {ResponseMessageInterface} from "../../interfaces/responseMessage.interface";
import {MessageService} from "../message/message.service";

@Injectable({
  providedIn: 'root'
})
export class UploadLexemeService {

  http = inject(HttpClient);
  apiService = inject(ApiService);
  messageService = inject(MessageService);

  uploadLexeme(payload: LexemeUploadInterface) {
    const request$ = this.http.post<ResponseMessageInterface>(
      apiConstants.lexeme, payload,
      {withCredentials: true});
    return this.apiService.handleRequest(
      request$,
      res => {
        this.messageService.show(res.message)

      }
    ).subscribe();
  }
}
