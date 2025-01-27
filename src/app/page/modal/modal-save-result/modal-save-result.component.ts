import {Component, inject} from '@angular/core';
import {SaveResultService} from "../../../data/services/save-result/save-result.service";
import {ResultService} from "../../../data/services/result/result.service";
import {LexemeService} from "../../../data/services/lexeme/lexeme.service";

@Component({
  selector: 'app-modal-save-result',
  standalone: true,
  imports: [],
  templateUrl: './modal-save-result.component.html',
  styleUrl: './modal-save-result.component.scss'
})
export class ModalSaveResultComponent {

  saveResult = inject(SaveResultService);
  result = inject(ResultService);
  lexeme = inject(LexemeService);

  close(): void {
    this.result.clearResult();
    this.lexeme.hide();
    this.saveResult.hideModal();
  }

  save(): void {
    this.result.sendResult();
    this.lexeme.hide();
    this.saveResult.hideModal();
  }
}
