import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8089/api/cra';

  constructor(private http: HttpClient,private authService:StorageService) { }
  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer " + this.authService.getToken()
    });
    return headers;}
    
  getPdfData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allpdf`,{headers:this.getHeaders()});
  }
  getPdfDataForUser(user_id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/user/${user_id}/pdfs`,{headers:this.getHeaders()})
  }
  getFiles(user_id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/fileupload/downloadAll/${user_id}`,{headers:this.getHeaders()});
  }
}