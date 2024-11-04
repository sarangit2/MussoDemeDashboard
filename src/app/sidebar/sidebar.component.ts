import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private userService: UserService, private router: Router) {} // Injecter UserService et Router

  // Méthode pour déconnecter l'utilisateur
  onLogout(): void {
    this.userService.logout();  // Appelle la méthode de déconnexion
  }
}
