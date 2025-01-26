import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {getUUID} from "../../utilites/uuid.utilites";

@Component({
  selector: 'app-select-label',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './select-label.component.html',
  styleUrl: './select-label.component.scss'
})
export class SelectLabelComponent<T> {
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() elements:   T[] = [];
  @Input() title: string = '';
  protected readonly getUUID = getUUID;
}
