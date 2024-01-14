import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CraData } from '../models/craData';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CraService {
  url = environment.baseUrl + 'cra';
  constructor(private http: HttpClient, private authService: StorageService) { }
  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json', // Retirez cette ligne
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      // 'Content-Type': 'multipart/form-data', // Retirez cette ligne
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
      "Authorization": "Bearer " + this.authService.getToken()
    });
  
    headers = headers.append('Accept', 'application/json'); // Ajoutez cette ligne
  
    return headers;
  }

  createCraData(craData: CraData): Observable<any> {
    return this.http.post<CraData>(this.url,craData , { headers: this.getHeaders() });; 
  }

  getAllCraData(): Observable<CraData[]> {
    return this.http.get<CraData[]>(this.url, { headers: this.getHeaders() });
  }

  getCraDataById(id: number): Observable<CraData> {
    return this.http.get<CraData>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
  updateCraData(id: number, updatedCraData: CraData): Observable<CraData> {
    return this.http.put<CraData>(`${this.url}/${id}`, updatedCraData, { headers: this.getHeaders() });
  }

  deleteCraData(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  public imprimerVente(): Observable<Blob> {
    return this.http.get(this.url + "/craDatapdf", { responseType: 'blob', headers: this.getHeaders() });
  }

  getCraDataByMonth(month: number): Observable<CraData[]> {
    return this.http.get<CraData[]>(`${this.url}?month=${month}`, { headers: this.getHeaders() });
  }

  getCraDataByYear(year: number): Observable<CraData[]> {
    return this.http.get<CraData[]>(`${this.url}?year=${year}`, { headers: this.getHeaders() });
  }

  getCraDataByYearAndMonth(year: number, month: number): Observable<CraData[]> {
    return this.http.get<CraData[]>(`${this.url}/byYearAndMonth?year=${year}&month=${month}`, { headers: this.getHeaders() });
  }

  getCraDataByUserId(userId: number): Observable<CraData[]> {
    return this.http.get<CraData[]>(`${this.url}/byUserId?userId=${userId}`, { headers: this.getHeaders() });
  }

  uploadFile(file: File, userId: number): Observable<string[]> {
    const formData: FormData = new FormData();
  
    // Ajouter le fichier avec la clé 'files'
    formData.append('files', file, file.name);
  
    // Ajouter l'ID de l'utilisateur avec la clé 'userId'
    formData.append('userId', userId.toString());
  
    // Utiliser les en-têtes dans la requête HTTP
    return this.http.post<string[]>("http://localhost:8089/api/cra/upload", formData, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors du téléchargement du fichier:', error);
        return throwError('Erreur lors du téléchargement du fichier.');
      })
    );
  }
  
  


  downloadFile(filename: string): Observable<HttpResponse<Blob>> {

    return this.http.get(`${this.url}/download/${filename}`, {
      headers:this.getHeaders(),
      responseType: 'blob',

      observe: 'response'
    });
  }

}
