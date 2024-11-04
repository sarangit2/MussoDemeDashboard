import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Formation } from '../incident.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = `http://localhost:8080/api/formations`;

  constructor(private http: HttpClient) { }

  // Ajouter un token JWT dans les headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Récupérer le jeton JWT depuis le localStorage
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
    return new HttpHeaders(headers);
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

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/categories/liste`, { headers: this.getHeaders() })
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
  createFormation(formationForm: FormGroup): Observable<Formation> {
    const formData = new FormData();
    const token = localStorage.getItem('jwt');
    console.log(formationForm);
    
     // Ajoutez les données JSON de formation sans les fichiers
     const formationData = {
      categorie: formationForm.get('categorie')?.value,
      dateDebut: formationForm.get('dateDebut')?.value,
      dateFin: formationForm.get('dateFin')?.value,
      description: formationForm.get('description')?.value,
      organisateur: formationForm.get('organisateur')?.value,
      titre: formationForm.get('titre')?.value,
  };
  formData.append('formation', JSON.stringify(formationData));

    if (formationForm.get('videoPath')?.value) {
      formData.append('videoFile', formationForm.get('videoPath')?.value);
    }
    
    if (formationForm.get('imageUrl')?.value) {
      formData.append('imageFile', formationForm.get('imageUrl')?.value);
    }
    
    if (formationForm.get('pdfPath')?.value) {
      formData.append('pdfFile', formationForm.get('pdfPath')?.value);
    }

    return this.http.post<Formation>(`${this.apiUrl}/ajout`, formData, {
      headers: {  'Authorization': token ? `Bearer ${token}` : '' }
    }).pipe(catchError(this.handleError));
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
