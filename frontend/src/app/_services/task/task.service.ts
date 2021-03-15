import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private API = "http://127.0.0.1:3000/api/task";

  constructor(private http: HttpClient) { }

  getUserLoggedTasks(): Observable<Task[]> {
    const user = localStorage.getItem( 'user' );

    let _id;
    if ( user == null ) {
      _id = "";
    } else {
      _id = JSON.parse( user )._id;
    }

    const route = this.API + "/" + _id;

    return this.http.get<Task[]>(route);
  }

  removeOneById( toRemove: string ): void {
    const userId = localStorage.getItem('userId');

    this.http.delete( `${this.API}/${toRemove}` );
  }

  editExpirationToOne( toRemove: Task ): void {
    let { _id, expired } = toRemove;

    expired = !expired;

    this.http.put( `${this.API}/${_id}`, {
      expired
    } ).subscribe(
      res => {
        return true;
      },
      err => {
        return false;
      }
    );

  }
}
