import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../models/files';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = environment.baseUrl + 'files';
  // authService: any;
   constructor(private http: HttpClient,private authService: StorageService) {}
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

  createFile(files: File): Observable<File> {
    return this.http.post<File>(this.url, files, { headers: this.getHeaders() });
  }

  getFileById(id: number): Observable<File> {
    return this.http.get<File>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.url, { headers: this.getHeaders() });
  }

  updateFile(id: number, files: File): Observable<File> {
    return this.http.put<File>(`${this.url}/${id}`, files, { headers: this.getHeaders() });
  }


  deleteFile(id: number): Observable<File> {
    return this.http.delete<File>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
