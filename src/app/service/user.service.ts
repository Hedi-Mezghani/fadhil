import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authService: StorageService ) {}
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



  getAllUsers():Observable<Array<User>>{
    return this.http.get<Array<User>>("http://localhost:8089/api/allUsers",{ headers: this.getHeaders() });
  }
  addUsers(user: User): Observable<User>{
    return this.http.post<User>("http://localhost:8089/api/auth/signup",user,{ headers: this.getHeaders() })

  }
  saveUser(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8089/api/save",user,{ headers: this.getHeaders() })
  }
  getUserById(id:Object): Observable<User>{
    return this.http.get<User>("http://localhost:8089/api/getuserbyid/" + id,{ headers: this.getHeaders() });
  }
  getUserDetails(userId: number): Observable<User> {
    const url = `http://localhost:8089/api/getuserbyid/${userId}`;
    return this.http.get<User>(url,{ headers: this.getHeaders() });
  }


  public deleteUser(id: Object) {
    return this.http.delete(
      "http://localhost:8089/api/user/"+ id,{ headers: this.getHeaders() }
    );
  }
  refresh(): void {
    window.location.reload();
}


  // public saveCustomer(customer: Customer): Observable<Customer> {
  //   return this.http.post<Customer>(
  //     environment.backendHost + '/api/cust/customers',
  //     customer
  //   );
  // }
}
