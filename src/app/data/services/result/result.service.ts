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
import {ResultsCountInterface} from "../../interfaces/resultsCount.interface";
import {Language} from "../../interfaces/language.type";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  lexemeService = inject(LexemeService);
  errorService = inject(ErrorService);
  api = inject(ApiService);
  http = inject(HttpClient);

  result: ResultInterface = {sourceLanguage: Language.EN, targetLanguage: Language.EN, resultDtos: []};

  constructor() {
    this.lexemeService.lexemesChanged.subscribe(lexemes => {
      if (lexemes) {
        this.result.sourceLanguage = lexemes.sourceLanguage;
        this.result.targetLanguage = lexemes.targetLanguage;
      } else {
        this.result.sourceLanguage = Language.EN;
        this.result.targetLanguage = Language.EN;
      }
    });
  }

  private _ignoreLexemeId: string[] = [];
  get ignoreLexemeId(): string[] {
    return this._ignoreLexemeId;
  };

  set ignoreLexemeId(ignoreLexemeId: string) {
    this._ignoreLexemeId.push(ignoreLexemeId);
  }

  private _isSubmit = new BehaviorSubject<boolean>(false);
  submitStatus = this._isSubmit.asObservable();

  showModal(): void {
    this._isSubmit.next(true);
  }

  hideModal(): void {
    this._isSubmit.next(false);
  }

  private _resultsCount = new BehaviorSubject<ResultsCountInterface>(
    {attemptsCount: 0, successfulAttemptsCount: 0});
  resultCountStatus = this._resultsCount.asObservable();

  set resultsCount(value: ResultsCountInterface) {
    this._resultsCount.next(value);
  }

  get resultsCount(): ResultsCountInterface {
    return this._resultsCount.value;
  }

  addResult(lexemeId: string, isCorrect: boolean, isHide: boolean): void {
    if (this.result.sourceLanguage === Language.EN && this.result.targetLanguage === Language.EN) {
      this.errorService.show(['Selected languages match']);
      console.error(`Error adding ${this.result.sourceLanguage}: ${this.result.targetLanguage}`);
      return;
    }
    this.ignoreLexemeId = lexemeId;
    const results: LexemeResultInterface[] = this.result.resultDtos;
    const existingResult = results.find(r => r.lexemeId === lexemeId);
    if (existingResult) {
      existingResult.attempts++;
      if (isCorrect) existingResult.successfulAttempts++;
      existingResult.isActive = !isHide;
    } else {
      const newResult: LexemeResultInterface = {
        lexemeId,
        attempts: 1,
        successfulAttempts: isCorrect ? 1 : 0,
        isActive: !isHide
      };
      results.push(newResult);
    }
    this.setCountOfResults(isCorrect);
  }

  setCountOfResults(isCorrect: boolean): void {
    const result = this.resultsCount;
    this.resultsCount = {
      attemptsCount: result.attemptsCount + 1,
      successfulAttemptsCount: result.successfulAttemptsCount + (isCorrect ? 1 : 0)
    };
  }

  sendResult() {
    console.log("Sending result");

    if (this.result.resultDtos.length <= 0) return;
    console.log(this.result.resultDtos);
    const request$ = this.http.post<LexemeInterface>(
      apiConstants.userResult,
      this.result,
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
    this.resultsCount = {attemptsCount: 0, successfulAttemptsCount: 0};
    console.log("Clearing result");
  }
}
