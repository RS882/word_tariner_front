import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LexemeInterface} from "../../interfaces/lexeme.interface";
import {apiConstants} from "../../../api/api.url";
import {ApiService} from "../../../api/api.service";
import {BehaviorSubject, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LexemeService {

  http = inject(HttpClient);
  apiService = inject(ApiService);
  router = inject(Router);


  private _isLexemesLoaded = new BehaviorSubject<boolean>(false);

  private _lexemes = new BehaviorSubject<LexemeInterface | null>(null);

  lexemesLoadStatusChanged = this._isLexemesLoaded.asObservable();

  lexemesChanged = this._lexemes.asObservable();

  show(): void {
    this._isLexemesLoaded.next(true);
  }

  hide(): void {
    this._isLexemesLoaded.next(false);
  }

  get isLexemesLoaded(): boolean {
    return this._isLexemesLoaded.value;
  }

  get lexemes(): LexemeInterface | null {
    return this._lexemes.value;
  }

  loadLexemes(sourceLanguage: string, targetLanguage: string, count?: number) {
    const url = `${apiConstants.lexeme}?count=${count || 10}&sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}`;
    const request$ = this.http.get<LexemeInterface>(url, {withCredentials: true});
    this.apiService.handleRequest(
      request$,
      res => {
        this.saveLexemes(res);
      },
      undefined,
      () => {
        this.router.navigate(['trainer']);
      }
    ).subscribe({
      error: (err) =>    throwError(err)
    });
  }

  saveLexemes(lexemes: LexemeInterface) {
    this._lexemes.next(lexemes);
    if (this.lexemes !== null && this.lexemes.translations.length > 0) {
      this.show();
    }
    console.log('Loaded lexemes : ');
    console.log(lexemes);
  }
}
