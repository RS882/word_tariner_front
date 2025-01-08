import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ModalLoaderComponent} from "./command-ui/modal-loader/modal-loader.component";
import {LoadingService} from "./data/services/loading/loading.service";
import {ErrorService} from "./data/services/error/error.service";
import {ModalErrorComponent} from "./command-ui/modal-error/modal-error.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalLoaderComponent, ModalErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'word-trainer';

  loading = inject(LoadingService);
  errorService =inject(ErrorService);

  isLoading = signal<boolean>(false);

  isError =  signal<boolean>(false);

  errorMessages: string[] =[] ;

  constructor() {
    this.loading.loadStatus.subscribe(isLoad => this.isLoading.set(isLoad));
    this.errorService.errorStatus.subscribe(errors=> {
      this.isError.set(errors.length > 0)
      this.errorMessages = errors;
    });

  }
}
