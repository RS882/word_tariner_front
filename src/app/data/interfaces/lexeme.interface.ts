import {Language} from "./language.type";
import {TranslationsInterface} from "./translations.interface";

export interface LexemeInterface{
  "sourceLanguage": Language,
  "targetLanguage": Language,
  "translations": TranslationsInterface[]
}
