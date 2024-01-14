import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Works } from '../models/works';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

   url = environment.baseUrl + 'works';
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

   getWorks = (): Observable<Works[]> => {

     return this.http.get<Works[]>(this.url + '/',{ headers: this.getHeaders() });
   };

   Addworks = (cat: Works): Observable<Works> => this.http.post<Works>(this.url + '/', cat , { headers: this.getHeaders() });


   GetWorksById(id: object): Observable<Works> {
     return this.http.get<Works>(this.url + '/' + id,{ headers: this.getHeaders() });
   }
   UpdateWorks(id: object, cat: Works): Observable<Works> {
     return this.http.put<Works>(this.url + '/' + id, cat,{ headers: this.getHeaders() });
   }
   DeleteWorks(id: object): Observable<Works> {
     return this.http.delete<Works>(this.url + '/' + id,{ headers: this.getHeaders() });
   }
   getpage(page:number,size:number): Observable<Works[]>{
    return this.http.get<Works[]>(this.url+'/list?page='+page+'&size='+size,{ headers: this.getHeaders() });
   }
   getworksbyuser(id:object): Observable<Works[]>{
    return this.http.get<Works[]>(this.url + '/listbyuser/' + id,{ headers: this.getHeaders() });
   }
   
}
