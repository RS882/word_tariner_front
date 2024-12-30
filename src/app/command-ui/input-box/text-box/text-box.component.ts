import {Component, Input, signal, SimpleChanges} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LowerCasePipe, NgClass} from "@angular/common";
import {EyeIconComponent} from "../../svg/eye/eye.component";
import {EyeSlashIconComponent} from "../../svg/eye-slash/eye-slash.component";

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LowerCasePipe,
    NgClass,
    EyeIconComponent,
    EyeSlashIconComponent
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

  isPasswordVisible = signal<boolean>(this.controlName !== 'password');
}
