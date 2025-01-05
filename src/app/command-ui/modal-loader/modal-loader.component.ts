import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal-loader',
  standalone: true,
  imports: [],
  templateUrl: './modal-loader.component.html',
  styleUrl: './modal-loader.component.scss'
})
export class ModalLoaderComponent {
  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
