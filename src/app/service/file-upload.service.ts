import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:8089/api/fileupload';
  private userId: number;

  constructor(private http:HttpClient,private authService: StorageService ) {
    this.userId=0;


  }
    // Update the getHeaders method
public getHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  console.log('Authorization Token:', token);

  if (!token) {
    console.error('Authorization Token is missing or invalid.');
  }

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authService.getToken(),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
    'Content-Type': 'multipart/form-data'  // Make sure this header is set
  });
  

  return headers;
}

uploadFiles(files: any[], userId: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authService.getToken(),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
  });

  const formData: FormData = new FormData();
  for (const file of files) {
    formData.append('files', file, file.name);
  }
  formData.append('user_id', userId.toString());

  return this.http.post<any>('http://localhost:8089/api/fileupload/upload', formData, { headers })
    .pipe(
      catchError((error) => {
        console.error('Error Response Body:', error.error);
        throw error;
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