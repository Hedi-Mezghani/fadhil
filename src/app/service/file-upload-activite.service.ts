import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadActiviteService {

  private apiUrl = 'http://localhost:8089/api/activiterupload';
  private userId: number;

  constructor(private http:HttpClient,private authService: StorageService ) {
    this.userId=0;


  }
    public getHeaders(): HttpHeaders {
      let headers = new HttpHeaders({
        //'Content-Type': 'application/json' ||  'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        "Authorization": "Bearer " + this.authService.getToken()

      });
     // headers = headers.append('Accept', 'application/octet-stream');
      return headers;
    }

    uploadFiles(files: File[],userId: number): Observable<string[]> {
      const formData: FormData = new FormData();
      const headers: HttpHeaders = this.getHeaders(); 
      for (const file of files) {
        formData.append('files', file, file.name);
      }
      formData.append('user_id', userId.toString());
      return this.http.post<string[]>(`${this.apiUrl}/upload`, formData, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors du téléchargement des fichiers:', error);
          return throwError('Erreur lors du téléchargement des fichiers.');
        })
      );
    }

    downloadFile(filename: string): Observable<HttpResponse<Blob>> {

      return this.http.get(`${this.apiUrl}/download/${filename}`, {
        headers:this.getHeaders(),
        responseType: 'blob',

        observe: 'response'
      });
    }


}