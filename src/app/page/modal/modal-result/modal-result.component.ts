import {Component, inject, Input, signal, SimpleChanges} from '@angular/core';
import {ResultService} from "../../../data/services/result/result.service";
import {NgClass} from "@angular/common";
import {CurrentWordInterface} from "../../../data/interfaces/currentWord.interface";

@Component({
  selector: 'app-modal-result',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './modal-result.component.html',
  styleUrl: './modal-result.component.scss'
})
export class ModalResultComponent {
  @Input() currentWord: CurrentWordInterface = {word: '', translation: ''};
  @Input() isSuccessful = false

  result = inject(ResultService);

  isSuccess = signal<boolean>(this.isSuccessful);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSuccessful']) {
      this.isSuccess.set(this.isSuccessful);
      console.log('ModalResultComponent: isSuccessful updated to', this.isSuccessful);
    }
  }

  close(): void {
    this.result.hideModal();
    this.result.setSuccessfulStatus(false);
  }

}
