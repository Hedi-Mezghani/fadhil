import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8089/api/image'; // L'URL locale (non utilisée)
  url = environment.baseUrl + 'image';

  constructor(private http: HttpClient, private authService: StorageService) { }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    return headers;
  }

  uploadDocument(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);

    return this.http.post(this.url, formData, { headers: this.getHeaders() });
  }

  downloadDocument(fileName: string): Observable<Blob> {
    return this.http.get(this.url + `/${fileName}`, { responseType: 'blob', headers: this.getHeaders() });
  }
}
