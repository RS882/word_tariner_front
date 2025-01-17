import {inject, Injectable} from '@angular/core';
import {LexemeService} from "../lexeme/lexeme.service";
import {ErrorService} from "../error/error.service";
import {ResultInterface} from "../../interfaces/result.interface";
import {LexemeResultInterface} from "../../interfaces/lexemeResult.interface";
import {ApiService} from "../../../api/api.service";
import {apiConstants} from "../../../api/api.url";
import {LexemeInterface} from "../../interfaces/lexeme.interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  lexemeService = inject(LexemeService);
  errorService = inject(ErrorService);
  api = inject(ApiService);
  http = inject(HttpClient);

  result: ResultInterface = {sourceLanguage: 'EN', targetLanguage: 'EN', resultDtos: []};

  constructor() {
    this.lexemeService.lexemesChanged.subscribe(lexemes => {
      if (this.result.resultDtos.length > 0) {
        this.sendResult(this.result);
      }
      if (lexemes) {
        this.result.sourceLanguage = lexemes.sourceLanguage;
        this.result.targetLanguage = lexemes.targetLanguage;
      } else {
        this.result.sourceLanguage = 'EN';
        this.result.targetLanguage = 'EN';
      }
    });
  }

  private _isSubmit = new BehaviorSubject<boolean>(false);
  submitStatus = this._isSubmit.asObservable();

  showModal(): void {
    this._isSubmit.next(true);
  }

  hideModal(): void {
    this._isSubmit.next(false);
  }

  addResult(lexemeId: string, isCorrect: boolean): void {

    if (this.result.sourceLanguage === 'EN' && this.result.targetLanguage === 'EN') {
      this.errorService.show(['Selected languages match']);
      console.error(`Error adding ${this.result.sourceLanguage}: ${this.result.targetLanguage}`);
      return;
    }
    const results: LexemeResultInterface[] = this.result.resultDtos;
    const existingResult = results.find(r => r.lexemeId === lexemeId);
    if (existingResult) {
      existingResult.attempts++;
      if (isCorrect) existingResult.successfulAttempts++;
    } else {
      const newResult: LexemeResultInterface = {
        lexemeId,
        attempts: 1,
        successfulAttempts: isCorrect ? 1 : 0
      };
      results.push(newResult);
    }
  }

  sendResult(payload: ResultInterface) {
    console.log("Sending result");
    const request$ = this.http.post<LexemeInterface>(
      apiConstants.userResult,
      payload,
      {withCredentials: true}
    );
    this.api.handleRequest(
      request$,
      res => {
        this.clearResult()
      }).subscribe()
  }

  clearResult() {
    this.result.resultDtos = [];
    console.log("Clearing result");
  }
}
