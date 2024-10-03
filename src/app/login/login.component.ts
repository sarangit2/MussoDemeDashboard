import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Initialisation du formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // Vérification de la validité du formulaire
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest = this.loginForm.value;

    // Requête HTTP POST pour l'authentification
    this.http.post<{ token: string, role: string[] }>('http://localhost:8080/api/auth/login', loginRequest)
      .subscribe(response => {
        // Stockage du jeton JWT et du rôle dans le local storage
        localStorage.setItem('jwt', response.token); // Assurez-vous que le nom de la propriété correspond
        console.log('Token JWT:', response.token);
        localStorage.setItem('userRole', response.role[0]);
        console.log('Rôle utilisateur:', response.role);

        // Redirection vers le tableau de bord
        this.router.navigate(['/dashboard']);
      }, error => {
        // Gestion des erreurs de connexion
        console.error('Erreur de connexion:', error); // Pour débogage
        this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos informations.';
      });
  }

  // Méthodes pour gérer le token JWT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt'); // Corrigez le nom de la clé
  }

  logout(): void {
    localStorage.removeItem('jwt'); // Corrigez le nom de la clé
  }
}
