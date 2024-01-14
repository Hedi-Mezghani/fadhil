import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const url = 'http://localhost:8089/api/' + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any;
  LoggedIn() {
    throw new Error('Method not implemented.');
  }


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      url + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      url,
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  getCurrentUser(): Observable<any> {
    // Vérifiez si les informations de l'utilisateur sont déjà stockées
    if (this.currentUser) {
      return new Observable((observer) => {
        observer.next(this.currentUser);
        observer.complete();
      });
    } else {
      // Si les informations de l'utilisateur ne sont pas encore disponibles, faites une requête pour les obtenir
      return this.http.get(url + 'user', httpOptions);
    }
  }
}
