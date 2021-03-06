import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

const API = "http://127.0.0.1:3000/api/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const route = API + "/" + userId;

    return this.http.get(route);

  }
}
