import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FormBoxComponent} from "../form-box/form-box.component";

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    FormBoxComponent
  ],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss'
})
export class FormLayoutComponent {

}
