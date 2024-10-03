import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OffreEmploi } from '../incident.model';

@Injectable({
  providedIn: 'root'
})
export class OffreEmploiService {
  private apiUrl = `http://localhost:8080/api/offres`;

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

  

  // Récupérer toutes les offres d'emploi
  getAllOffres(): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.apiUrl}/liste`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Gestion des erreurs
  }

  // Récupérer une offre d'emploi par ID
  getOffreById(id: number): Observable<OffreEmploi> {
    return this.http.get<OffreEmploi>(`${this.apiUrl}/liste/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

 
  createOffre(offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    const headers = this.getHeaders();
    console.log('Headers:', headers); // Ajoutez cette ligne pour le débogage
    return this.http.post<OffreEmploi>(`${this.apiUrl}/ajout`, offreEmploi, { headers })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une offre d'emploi existante
  updateOffre(id: number, offreEmploi: OffreEmploi): Observable<OffreEmploi> {
    return this.http.put<OffreEmploi>(`${this.apiUrl}/modifier/${id}`, offreEmploi, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer une offre d'emploi
  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/del/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
}
