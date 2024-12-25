import {LexemeType} from "./lexemeType.type";
import {LanguageMappings} from "./languageMappings.interface";

export interface TranslationsInterface {
  lexemeId: string;
  type: LexemeType;
  translations: LanguageMappings;
}
