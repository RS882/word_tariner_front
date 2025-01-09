import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LexemeInterface} from "../../interfaces/lexeme.interface";
import {apiConstants} from "../../../api/api.url";
import {ApiService} from "../../../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class LexemeService {

  http = inject(HttpClient);
  apiService = inject(ApiService);

  lexemes: LexemeInterface | null = null;

  loadLexemes(sourceLanguage: string, targetLanguage: string, count?: number) {
    const url = `${apiConstants.lexeme}?count=${count || 10}&sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}`;
    const request$ = this.http.get<LexemeInterface>(url, {withCredentials: true});
    this.apiService.handleRequest(
      request$,
      res => {
        this.saveLexemes(res);
      }
    ).subscribe();
  }

  saveLexemes(lexems: LexemeInterface) {
    this.lexemes = lexems;
    console.log('Loaded lexemes : ');
    console.log(lexems);
  }
}
