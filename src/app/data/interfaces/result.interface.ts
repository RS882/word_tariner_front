import {Language} from "./language.type";
import {LexemeResultInterface} from "./lexemeResult.interface";
import {LanguageInterface} from "./language.interface";

export interface ResultInterface extends LanguageInterface {

  resultDtos: LexemeResultInterface[]
}
