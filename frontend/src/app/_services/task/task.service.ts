import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private API = "http://127.0.0.1:3000/api/task";

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUserLoggedTasks(): Observable<Task[]> {
    const user = this.authService.getUser();

    if ( user == null ) {
      return EMPTY;
    }

    return this.http.get<Task[]>( `${this.API}/${user._id}` );
  }

  create( task: Task ): Observable<Task> {
    // TODO: Add user id
    const owner = this.authService.getUser()?._id;
    const name = task.name;

    return this.http.post<Task>( this.API, { name,  owner } );
  }

  removeOneById( toRemove: string ): void {
    this.http.delete( `${this.API}/${toRemove}` )
    .subscribe(
      res => {
        return true;
      },
      err => {
        console.error( err );
        return false;
      }
    );
    
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
