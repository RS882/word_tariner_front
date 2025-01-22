import {Component, EventEmitter, Output} from '@angular/core';
import {SvgIconComponent} from "../../../command-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-modal-loader',
  standalone: true,
  imports: [
    SvgIconComponent
  ],
  templateUrl: './modal-loader.component.html',
  styleUrl: './modal-loader.component.scss'
})
export class ModalLoaderComponent {

}
