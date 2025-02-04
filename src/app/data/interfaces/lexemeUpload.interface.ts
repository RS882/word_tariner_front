import {Role} from "./role.type";
import {LexemeType} from "./lexemeType.type";
import {LanguageInterface} from "./language.interface";

export interface LexemeUploadInterface extends LanguageInterface{
  sourceMeaning: string,
  targetMeaning: string,
  type?: LexemeType,
}
