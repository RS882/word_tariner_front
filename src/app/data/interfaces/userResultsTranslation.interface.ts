import {TranslationsInterface} from "./translations.interface";

export interface UserResultsTranslationInterface extends TranslationsInterface {
  isActive: boolean;
  attempts: number;
  successfulAttempts: number;
}
