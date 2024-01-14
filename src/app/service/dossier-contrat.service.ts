import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { DossierContrat } from '../models/dossier-contrat';
@Injectable({
  providedIn: 'root'
})
export class DossierContratService {
  private apiUrl = 'http://localhost:8089/api/dossier/contrat';
  constructor(private http:HttpClient,private authService: StorageService ) {}
  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer " + this.authService.getToken()
    });
    return headers;
  }
  getDossiersByUserId(userId: number): Observable<DossierContrat[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<DossierContrat[]>(url,{ headers: this.getHeaders() });
  }
  ajouterDossier(dossier: DossierContrat): Observable<DossierContrat> {
    console.log(dossier)
    return this.http.post<any>(`${this.apiUrl}`, dossier,{ headers: this.getHeaders() });
  }
  getDossiers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl,{ headers: this.getHeaders() });
  }
  listerDossiers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getDossierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  editerDossier(id: number, dossier: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dossier);
  }
  supprimerDossier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
   }
}