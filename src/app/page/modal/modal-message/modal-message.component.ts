import {Component, inject, Input} from '@angular/core';
import {MessageService} from "../../../data/services/message/message.service";

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [],
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.scss'
})
export class ModalMessageComponent {
  @Input() message: string ='';

  messageService = inject(MessageService);

  close(): void {
    this.messageService.hide();
  }
}
