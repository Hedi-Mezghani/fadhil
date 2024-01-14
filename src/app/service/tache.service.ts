import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Client } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  url = environment.baseUrl + 'clients';
 // authService: any;
  constructor(private http: HttpClient,private authService: StorageService) {}
  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    return headers;
  }


  getTaches = (): Observable<Client[]> => {
    return this.http.get<Client[]>(this.url + '',{ headers: this.getHeaders() });
  };
  AddTache = (cat: Client): Observable<Client> => {
    return this.http.post<Client>(this.url + '', cat,{ headers: this.getHeaders() });
  };
  GetTacheById(id: object): Observable<Client> {
    return this.http.get<Client>(this.url + '/' + id,{ headers: this.getHeaders() });
  }
  UpdateTache(id: object, cat: Client): Observable<Client> {
    return this.http.put<Client>(this.url + '/' + id, cat,{ headers: this.getHeaders() });
  }
  DeleteTache(id: object): Observable<Client> {
    return this.http.delete<Client>(this.url + '/' + id,{ headers: this.getHeaders() });
  }
}
