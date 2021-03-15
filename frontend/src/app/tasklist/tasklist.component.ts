import { Component, EventEmitter, OnInit } from '@angular/core';
import { TaskService } from '../_services/task/task.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = [];

    this.taskService.getUserLoggedTasks()
    .subscribe(
      tasks => {
        this.tasks = tasks;
      }
    );

   }

  ngOnInit(): void {
  }

  deleteOne( toRemove: string ): void {
      this.tasks = this.tasks.filter( task => {
        return task._id !== toRemove;
      } );

      this.taskService.removeOneById( toRemove );
  }
}
