import {Component, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LexemeService} from "../../data/services/lexeme/lexeme.service";
import {ResultTableComponent} from "../result-table/result-table/result-table.component";
import {ResultService} from "../../data/services/result/result.service";
import {ResultsCountInterface} from "../../data/interfaces/resultsCount.interface";

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
  result = inject(ResultService);

  count: ResultsCountInterface = {attemptsCount: 0, successfulAttemptsCount: 0};

  isAuthenticated = signal<boolean>(false);

  isLexemesLoaded = signal<boolean>(false);

  constructor() {
    this.auth.authStatusChanged.subscribe(isAuth => this.isAuthenticated.set(isAuth));
    this.lexeme.lexemesLoadStatusChanged.subscribe(isLoaded => this.isLexemesLoaded.set(isLoaded));
    this.result.resultCountStatus.subscribe(value => {
      console.log('resultCountStatus:', value);
      this.count = value
    })
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
