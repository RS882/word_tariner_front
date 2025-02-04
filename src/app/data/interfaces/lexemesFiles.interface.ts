import {Language} from "./language.type";
import {LanguageInterface} from "./language.interface";

export interface LexemesFilesInterface extends LanguageInterface{
  files: File[];
}
