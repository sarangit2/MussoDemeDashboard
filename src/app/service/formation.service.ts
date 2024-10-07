import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from '../incident.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = `http://localhost:8080/api/formations`;

  constructor(private http: HttpClient) { }

   // Ajouter un token JWT dans les headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Récupérer le jeton JWT depuis le localStorage
    if (!token || (token.split('.').length !== 3)) {
      console.error('Jeton JWT invalide ou manquant');
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer toutes les formations
  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/liste`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

   // Récupérer les trois dernières formations à venir
   getUpcomingFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/recent`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }


    // Récupérer les formations groupées par mois
    getFormationsByMonth(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/by-month`, { headers: this.getHeaders() })
        .pipe(catchError(this.handleError));
    }

  // Récupérer une formation par ID
  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/liste/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer une nouvelle formation
  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/ajout`, formation, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une formation existante
  updateFormation(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/modifier/${id}`, formation, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer une formation
  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/del/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
}
