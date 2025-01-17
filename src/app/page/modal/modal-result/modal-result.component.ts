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
  @Input() currentWord: CurrentWordInterface = {word: '', translation: '', isSuccessful: false};

  result = inject(ResultService);

  close(): void {
    this.result.hideModal();
    this.currentWord = {word: '', translation: '', isSuccessful: false};
  }
}
