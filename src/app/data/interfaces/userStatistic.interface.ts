import {LanguageInterface} from "./language.interface";
import {ResultsCountInterface} from "./resultsCount.interface";

export interface UserStatisticInterface extends LanguageInterface, ResultsCountInterface{

  countOfResult: number
}

