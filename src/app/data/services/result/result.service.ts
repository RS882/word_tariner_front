import {Injectable} from '@angular/core';
import {LexemeInterface} from "../../interfaces/lexeme.interface";
import {Language} from "../../interfaces/language.type";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  result: LexemeInterface[] = [];

  addResult(sourceLanguage: Language, targetLanguage: Language, lexemeId: string, isCorrect: boolean): void {

  }
}
