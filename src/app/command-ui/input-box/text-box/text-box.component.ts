import {Component, Input, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LowerCasePipe, NgClass} from "@angular/common";
import {SvgIconComponent} from "../../svg-icon/svg-icon.component";

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LowerCasePipe,
    NgClass,
    SvgIconComponent
  ],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() labelText: string = '';
  @Input() controlName: string = '';
  @Input() formGroup!: FormGroup;
  @Input() hasError?: boolean = false;
  @Input() isValid?: boolean = false;

  get isPasswordFields() {
    return this.controlName.toLowerCase().includes('password')
  }

  isPasswordVisible = signal<boolean>(false);
}
