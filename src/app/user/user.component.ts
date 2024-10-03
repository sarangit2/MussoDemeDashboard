import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RoleService } from '../service/role.service'; // Importez le service de rôle
import { Role } from '../incident.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  roles: Role[] = []; // Liste des rôles
  selectedUser: any;

  searchText: string = ''; // Texte de recherche

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService, // Injection du service de rôle
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required] // Ajouter un champ pour le rôle (le roleId)
      
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles(); // Charger les rôles au démarrage
  }

  

  loadUsers() {
    console.log('Chargement des utilisateurs...');
    this.userService.getUsers().subscribe(
      users => {
        console.log('Utilisateurs récupérés:', users);
        this.users = users;
      },
      error => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  loadRoles() {
    console.log('Chargement des rôles...');
    this.roleService.lister().subscribe(
      roles => {
        console.log('Rôles récupérés:', roles);
        this.roles = roles;
      },
      error => {
        console.error('Erreur lors du chargement des rôles:', error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.warn('Formulaire invalide:', this.userForm.errors);
      return;
    }

    const userData = this.userForm.value;
    const roleId = userData.role; // Extraire le roleId depuis le champ role
    console.log('Données de l\'utilisateur à soumettre:', userData);

    if (userData.id) {
      // Mise à jour d'un utilisateur existant
      console.log('Mise à jour de l\'utilisateur avec ID:', userData.id);
      this.userService.updateUser(userData.id, userData).subscribe(
        () => {
          console.log('Utilisateur mis à jour avec succès');
          this.loadUsers();
          this.userForm.reset();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      // Ajouter un nouvel utilisateur en passant le roleId
      console.log('Ajout d\'un nouvel utilisateur avec roleId:', roleId);
      this.userService.addUser(userData, roleId).subscribe(
        () => {
          console.log('Nouvel utilisateur ajouté avec succès');
          this.loadUsers();
          this.userForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    }
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }

  deleteUser(id: number) {
    console.log('Suppression de l\'utilisateur avec ID:', id);
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Utilisateur supprimé avec succès');
        this.loadUsers();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    );
  }
}
