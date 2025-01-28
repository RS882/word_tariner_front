import {Language} from "./language.type";

export interface LexemesFilesInterface {
  files: File[];
  sourceLanguage: Language,
  targetLanguage: Language,
}
