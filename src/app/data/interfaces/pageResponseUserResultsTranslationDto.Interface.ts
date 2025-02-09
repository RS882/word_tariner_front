import {UserResultsTranslationInterface} from "./userResultsTranslation.interface";
import {PaginationInterface} from "./pagination.interface";

export interface PageResponseUserResultsTranslationDtoInterface extends PaginationInterface{
  content: UserResultsTranslationInterface[];
}
