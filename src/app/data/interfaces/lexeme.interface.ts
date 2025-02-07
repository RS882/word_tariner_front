import {TranslationsInterface} from "./translations.interface";
import {LanguageInterface} from "./language.interface";

export interface LexemeInterface extends LanguageInterface {

  translations: TranslationsInterface[]
}
