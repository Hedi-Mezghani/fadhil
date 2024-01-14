import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = environment.baseUrl + 'projects';
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

  getProjects = (): Observable<Project[]> => {
    return this.http.get<Project[]>(this.url + '/',{ headers: this.getHeaders() });
  };
  AddProject = (cat: Project): Observable<Project> => {
    return this.http.post<Project>(this.url + '/', cat,{ headers: this.getHeaders() });
  };
  GetProjectById(id: object): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + id,{ headers: this.getHeaders() });
  }
  UpdateProject(id: object, cat: Project): Observable<Project> {
    return this.http.put<Project>(this.url + '/' + id, cat,{ headers: this.getHeaders() });
  }
  DeleteProject(id: object): Observable<Project> {
    return this.http.delete<Project>(this.url + '/' + id,{ headers: this.getHeaders() });
  }
}
