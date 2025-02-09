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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {UpdateLexemeResultIsActiveInterface} from "../../data/interfaces/updateLexemeResultIsActive.interface";
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-translations-result',
  standalone: true,
  imports: [
    TranslationComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './translations-result.component.html',
  styleUrl: './translations-result.component.scss'
})
export class TranslationsResultComponent {

  result = inject(ResultService);
  fb =inject(FormBuilder);
  router = inject(Router);

  translationsResults: PageResponseUserResultsTranslationDtoInterface | null = null;
  sourceLanguage: Language | null = null;
  targetLanguage: Language | null = null;

  private routerSubscription: Subscription;

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
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // this.saveResult.showModal();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  form =this.fb.group({
    toUpdateStatus: this.fb.array<UpdateLexemeResultIsActiveInterface>([]),
});

  onSubmit(){
    if (this.form.valid) {
      console.log(this.form.valid);
    }
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

  receiveChangeIsActive(content: UpdateLexemeResultIsActiveInterface): void {
    const toUpdateStatusArray = this.form.get('toUpdateStatus') as FormArray;


    const index = toUpdateStatusArray.controls
      .findIndex(control => control.value.lexemeId === content.lexemeId);

    if (index === -1) {
      toUpdateStatusArray.push(new FormControl(content));
    } else {
      toUpdateStatusArray.at(index).setValue(content);
    }

    console.log("Updated FormArray:", this.form.value);
  }

  protected readonly getUUID = getUUID;
}
