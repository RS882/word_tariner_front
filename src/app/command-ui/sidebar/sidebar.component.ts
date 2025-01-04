import {Component, inject, signal} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  router = inject(Router);
  auth = inject(AuthService);

  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.auth.authStatusChanged.subscribe(isAuth => this.isAuthenticated.set(isAuth));
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

}
