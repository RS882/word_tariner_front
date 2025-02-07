import {UserResultsTranslationInterface} from "./userResultsTranslation.interface";

export interface PageResponseUserResultsTranslationDtoInterface {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last:boolean;
  first: boolean;
  content: UserResultsTranslationInterface[];
}
