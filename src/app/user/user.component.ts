import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RoleService } from '../service/role.service'; // Importez le service de rôle
import { Role } from '../incident.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  roles: Role[] = []; // Liste des rôles
  selectedUser: any = null; // Variable pour stocker l'utilisateur à modifier
  Isvisible = false;
  searchText: string = ''; // Variable pour le texte de recherche
 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles(); // Charger les rôles au démarrage
  }

  Ouvrir() {
    this.Isvisible = true;
    this.selectedUser = null; // Réinitialiser l'utilisateur sélectionné pour ajouter
    this.userForm.reset(); // Réinitialiser le formulaire pour l'ajout
  }

  onSearchTextChange(event: Event) {
    const input = event.target as HTMLInputElement; // Spécifiez que l'élément cible est un HTMLInputElement
    this.searchText = input.value; // Mettez à jour searchText avec la valeur d'entrée
  }

  Ferme() {
    this.Isvisible = false;
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  loadRoles() {
    this.roleService.lister().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        console.error('Erreur lors du chargement des rôles:', error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    const roleId = userData.role;

    if (userData.id) {
      // Mise à jour de l'utilisateur
      this.userService.updateUser(userData.id, userData).subscribe(
        () => {
          this.loadUsers();
          this.Ferme(); // Fermer la modal après l'opération
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      // Ajout d'un nouvel utilisateur
      this.userService.addUser(userData, roleId).subscribe(
        () => {
          this.loadUsers();
          this.Ferme(); // Fermer la modal après l'opération
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    }
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue(user); // Pré-remplir le formulaire avec les données de l'utilisateur
    this.Isvisible = true; // Ouvrir la modal
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.loadUsers();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    );
  }
}
