import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../_interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API = "http://127.0.0.1:3000/api/task";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const route = this.API + "/" + userId;

    return this.http.get(route);

  }
}
