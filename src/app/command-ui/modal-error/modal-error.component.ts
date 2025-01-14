import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ErrorService} from "../../data/services/error/error.service";
import {getUUID} from "../../utilites/uuid.utilites";

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.scss'
})
export class ModalErrorComponent {
  @Input() messages: string[] | undefined;

  errors = inject(ErrorService);

  close(): void {
    this.errors.hide();
  }

  protected readonly getUUID = getUUID;
}
