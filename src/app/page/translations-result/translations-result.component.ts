import {Component, inject} from '@angular/core';
import {ResultService} from "../../data/services/result/result.service";
import {
  PageResponseUserResultsTranslationDtoInterface
} from "../../data/interfaces/pageResponseUserResultsTranslationDto.Interface";
import {getUUID} from "../../utilites/uuid.utilites";
import {Language} from "../../data/interfaces/language.type";
import {TranslationComponent} from "../../command-ui/translation/translation.component";
import {PaginationInterface} from "../../data/interfaces/pagination.interface";
import {PaginationComponent} from "../../command-ui/pagination/pagination.component";

@Component({
  selector: 'app-translations-result',
  standalone: true,
  imports: [
    TranslationComponent,
    PaginationComponent
  ],
  templateUrl: './translations-result.component.html',
  styleUrl: './translations-result.component.scss'
})
export class TranslationsResultComponent {

  result = inject(ResultService);

  translationsResults: PageResponseUserResultsTranslationDtoInterface | null = null;
  sourceLanguage: Language | null = null;
  targetLanguage: Language | null = null;

  constructor() {
    this.result.translationsResultsStatus.subscribe(result => {
      this.translationsResults = result ? {...result} : null;
    })
    this.result.translationsSourceLanguageStatus.subscribe(language => {
      this.sourceLanguage = language;
    })
    this.result.translationsTargetLanguageStatus.subscribe(language => {
      this.targetLanguage = language;
    })
  }


  getPaginationData(): PaginationInterface | null {
    const results = this.translationsResults;
    return results
      ? {
        pageNumber: results.pageNumber,
        pageSize: results.pageSize,
        totalElements: results.totalElements,
        totalPages: results.totalPages,
        last: results.last,
        first: results.first,
      }
      : null;
  }

  receiveNextPage(page: number): void {
    if (!!this.sourceLanguage && !!this.targetLanguage) {
      this.result.loadUserResults(this.sourceLanguage, this.targetLanguage, page).subscribe();
    }
  }

  protected readonly getUUID = getUUID;
}
