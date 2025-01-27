import {Component, Input} from '@angular/core';
import {DragDropDirective} from "../../directives/darg-drop/drag-drop.directive";
import {getUUID} from "../../utilites/uuid.utilites";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    DragDropDirective,
    ReactiveFormsModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  files: File[] = [];

  onFileDropped(files: FileList) {
    this.addFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
      input.value = '';
    }
  }

  addFiles(fileList: FileList) {
    const newFiles = Array.from(fileList).filter(
      file => !this.files.some(existingFile => existingFile.name === file.name)
    );
    this.files.push(...newFiles);
    console.log('Current files:', this.files);
    this._setControlValue();
  }

  clearFiles() {
    this.files = [];
    this._setControlValue();
  }

  private _setControlValue() {
    if (this.controlName && this.formGroup.controls[this.controlName]) {
      this.formGroup.controls[this.controlName].setValue(this.files);
      this.formGroup.controls[this.controlName].updateValueAndValidity();
    }
  }

  protected readonly getUUID = getUUID;
}
