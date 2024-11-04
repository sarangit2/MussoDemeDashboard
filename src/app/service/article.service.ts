// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Article } from '../incident.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/liste`, {
      headers: this.getHeaders(),
    });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/liste/${id}`, {
      headers: this.getHeaders(),
    });
  }
  
  createArticle(article: Article, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('article', JSON.stringify(article));
    formData.append('file', file);
  
    // Enlevez le Content-Type ici pour éviter tout conflit avec FormData
    const headers = this.getHeaders().delete('Content-Type');
  
    return this.http.post<string>(`${this.apiUrl}/ajout`, formData, {
      headers, // Utilisez cet en-tête sans Content-Type pour FormData
    }).pipe(
      tap(response => console.log('Réponse de createArticle :', response)),
      catchError(error => {
        console.error('Erreur survenue lors de la création de l\'article :', error);
        return throwError(error);
      })
    );
  }
  




  uploadAudio(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = this.getHeaders().delete('Content-Type'); // Remove JSON header for multipart data
    return this.http.post(`${this.apiUrl}/ajout/audio/${id}`, formData, { headers });
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/edit/${id}`, article, {
      headers: this.getHeaders(),
    });
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/del/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
