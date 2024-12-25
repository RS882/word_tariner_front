import {Language} from "./language.type";
import {LexemeResultInterface} from "./lexemeResult.interface";

export interface ResultInterface{
  "sourceLanguage": Language,
  "targetLanguage": Language,
  "resultDtos": LexemeResultInterface[]
}
