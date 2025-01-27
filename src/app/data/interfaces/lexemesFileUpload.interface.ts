import {Language} from "./language.type";

export interface LexemesFileUploadInterface{
  files: File[];
  sourceLanguage: Language,
  targetLanguage: Language,
}
