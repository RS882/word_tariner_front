import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ModalLoaderComponent} from "./page/modal/modal-loader/modal-loader.component";
import {LoadingService} from "./data/services/loading/loading.service";
import {ErrorService} from "./data/services/error/error.service";
import {ModalErrorComponent} from "./page/modal/modal-error/modal-error.component";
import {ResultService} from "./data/services/result/result.service";
import {ModalResultComponent} from "./page/modal/modal-result/modal-result.component";
import {TrainerService} from "./data/services/trainer/trainer.service";
import {CurrentWordInterface} from "./data/interfaces/currentWord.interface";
import {SaveResultService} from "./data/services/save-result/save-result.service";
import {ModalSaveResultComponent} from "./page/modal/modal-save-result/modal-save-result/modal-save-result.component";
import {AuthService} from "./auth/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalLoaderComponent, ModalErrorComponent, ModalResultComponent, ModalSaveResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'word-trainer';

  loading = inject(LoadingService);
  errorService = inject(ErrorService);
  result = inject(ResultService);
  trainer = inject(TrainerService);
  saveResult = inject(SaveResultService);
  auth=inject(AuthService);
  route=inject(Router);

  isLoading = signal<boolean>(false);

  isError = signal<boolean>(false);

  isResult = signal<boolean>(false);

  isUrlChanged = signal<boolean>(false);

  errorMessages: string[] = [];
  currentWord: CurrentWordInterface = {word: '', translation: '', isSuccessful: false};

  constructor() {
    this.loading.loadStatus.subscribe(isLoad => this.isLoading.set(isLoad));
    this.errorService.errorStatus.subscribe(errors => {
      this.isError.set(errors.length > 0)
      this.errorMessages = errors;
    });
    this.result.submitStatus.subscribe(isSubmit => this.isResult.set(isSubmit));
    this.trainer.currentWordStatus.subscribe(word => this.currentWord = word);
    this.saveResult.urlChangedStatus.subscribe(isChange => this.isUrlChanged.set(isChange));
  }

  ngOnInit(): void {
    this.loading.show();
    const token = this.auth.getTokenFromCookies();
    if (token) {
      this.auth.accessToken = token;
      this.auth.validation();
      this.route.navigate(['lexeme-load']);
    }
    this.loading.hide();
  }
}
