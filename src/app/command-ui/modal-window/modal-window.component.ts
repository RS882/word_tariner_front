import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {

  @Output() closeEvent = new EventEmitter<void>();

  close(): void {
    this.closeEvent.emit();
  }
}
