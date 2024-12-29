import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  router = inject(Router);

  loginClick(){
    this.router.navigate(['/login']);
  }

  registerClick(){
    this.router.navigate(['/registration']);
  }

}
