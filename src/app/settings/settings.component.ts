import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { User } from '../incident.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userDetails: User | undefined;
  errorMessage: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserDetails().subscribe(
      data => {
        this.userDetails = data; // Stocker les détails de l'utilisateur
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
        this.errorMessage = 'Erreur lors du chargement des détails de l\'utilisateur.';
      }
    );
  }
}
