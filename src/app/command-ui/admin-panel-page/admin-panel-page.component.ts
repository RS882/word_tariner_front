import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel-page.component.html',
  styleUrl: './admin-panel-page.component.scss'
})
export class AdminPanelPageComponent {
  router=inject(Router);

  loadLexeme(){
    this.router.navigate(['admin/lexemes/upload']);
  }

  loadLexemesFromFile(){
    this.router.navigate(['admin/lexemes/upload-file']);
  }
}
