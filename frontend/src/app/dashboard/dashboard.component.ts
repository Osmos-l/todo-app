import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { TaskService } from '../_services/task/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: any;

  constructor(private authService: AuthService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
    .subscribe( tasks => {
      this.tasks = tasks;
      console.log( this.tasks );
    } );
  }

  logout(): void {
    this.authService.logout();
  }

}
