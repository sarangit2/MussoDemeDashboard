import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeIncident} from '../incident.model';

@Injectable({
  providedIn: 'root'
})
export class TypeIncidentService {

  private apiUrl = 'http://localhost:8080/api/type-incidents'; // Modifie cette URL en fonction de ton endpoint

  constructor(private http: HttpClient) {}

  getTypeIncidents(): Observable<TypeIncident[]> {
    return this.http.get<TypeIncident[]>(this.apiUrl);
  }
}
