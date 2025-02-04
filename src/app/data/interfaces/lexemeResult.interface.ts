import {ResultsCountInterface} from "./resultsCount.interface";

export interface LexemeResultInterface extends ResultsCountInterface  {
  lexemeId: string,
  isActive?: boolean
}
