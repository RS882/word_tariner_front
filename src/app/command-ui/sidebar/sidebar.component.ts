import {Component, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {ResultTableComponent} from "../result-table/result-table/result-table.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ResultTableComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  router = inject(Router);
  auth = inject(AuthService);
  lexeme = inject(LexemeService);

  isAuthenticated = signal<boolean>(false);

  isLexemesLoaded = signal<boolean>(false);

  constructor() {
    this.auth.authStatusChanged.subscribe(isAuth => this.isAuthenticated.set(isAuth));
    this.lexeme.lexemesLoadStatusChanged.subscribe(isLoaded => this.isLexemesLoaded.set(isLoaded));
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  registerClick() {
    this.router.navigate(['/registration']);
  }

  logoutClick() {
    this.auth.logout()
  }

  loadWordsClick() {
    this.router.navigate(['/lexeme-load']);
  }

}
