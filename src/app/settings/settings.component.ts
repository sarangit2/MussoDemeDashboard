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
  isEditing: boolean = false; // Pour gérer l'état d'édition

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

  editUser() {
    this.isEditing = !this.isEditing; // Toggle l'état d'édition

    if (!this.isEditing) {
      // Si l'utilisateur termine l'édition
      if (this.userDetails && this.userDetails.id) { // Assurez-vous que userDetails et son id sont définis
        this.userService.updateUser(this.userDetails.id, this.userDetails).subscribe(
          (response) => {
            console.log('Détails de l\'utilisateur mis à jour avec succès', response);
            // Vous pouvez aussi recharger les détails de l'utilisateur pour obtenir les dernières valeurs
            this.loadUserDetails();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour des détails de l\'utilisateur', error);
          }
        );
      } else {
        console.error('Aucun ID utilisateur disponible pour la mise à jour');
      }
    }
  }
}
