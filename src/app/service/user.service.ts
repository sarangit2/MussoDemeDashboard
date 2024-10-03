import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../incident.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/superadmin';
  

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le JWT stocké dans localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

    // Récupérer les détails de l'utilisateur connecté
    getUserDetails(): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() });
    }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Ajout du token JWT dans le header Authorization
    });
  }

  // Ajouter un utilisateur
  // Ajouter un utilisateur avec un roleId
  addUser(user: User, roleId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/ajout/${roleId}`, user, { 
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }

  // Lister les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/listeSuperAdmin`, { headers: this.getAuthHeaders() });
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/listesuperadmin/${id}`, { headers: this.getAuthHeaders() });
  }

  // Modifier un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/modifier/${id}`, user, { headers: this.getAuthHeaders() });
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}
