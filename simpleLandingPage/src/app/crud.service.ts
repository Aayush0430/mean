import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  expressUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}
  get(): Observable<any> {
    return this.http.get(`${this.expressUrl}/api/users/getUsers`);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.expressUrl}/api/users/login`, data);
  }
  signup(data: any): Observable<any> {
    return this.http.post(`${this.expressUrl}/api/users/signup`, data, {
      observe: 'response',
    });
  }
}
