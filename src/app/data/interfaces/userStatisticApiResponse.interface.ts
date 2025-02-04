import {LanguageInterface} from "./language.interface";

export interface UserStatisticApiResponse  extends LanguageInterface{
  countOfResult: number;
  countOfAttempts: number;
  countOfSuccessfulAttempts: number;
}
