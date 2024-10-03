// src/app/services/role.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../incident.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8080/api/roles'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le JWT stocké dans localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Ajout du token JWT dans le header Authorization
    });
  }

  // Ajouter un rôle
  ajouter(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/ajout`, role, {
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }

  // Lister tous les rôles
  lister(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/liste`, {
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }

  // Obtenir un rôle par ID
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }

  // Modifier un rôle
  modifier(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/modifier/${id}`, role, {
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }

  // Supprimer un rôle
  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`, {
      headers: this.getAuthHeaders() // Ajout des headers avec JWT
    });
  }
}
