import {Role} from "./role.type";
import {LexemeType} from "./lexemeType.type";

export interface LexemeUploadInterface {
  sourceMeaning: string,
  targetMeaning: string,
  sourceLanguage: Role,
  targetLanguage: Role,
  type?: LexemeType,
}
