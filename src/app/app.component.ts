import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ModalLoaderComponent} from "./command-ui/modal-loader/modal-loader.component";
import {LoadingService} from "./data/services/loading/loading.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'word-trainer';

  loading = inject(LoadingService);

  isLoading = signal<boolean>(false);

  constructor() {
    this.loading.loadStatus.subscribe(isLoad => this.isLoading.set(isLoad));
  }
}
