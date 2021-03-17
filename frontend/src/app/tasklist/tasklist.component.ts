import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../_services/task/task.service';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  @Output()
    onPurcentageUpdate: EventEmitter<any> = new EventEmitter();

  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = [];

    this.taskService.getUserLoggedTasks()
    .subscribe(
      tasks => {
        this.tasks = tasks;
        this.calculatePurcentageAchieved();
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

      this.calculatePurcentageAchieved();
  }

  updateOneTask( toUpdate: string ): void {
    this.tasks.forEach( task => {
      if ( task._id == toUpdate ) {
        task.expired = !task.expired;
      }
    })

    this.calculatePurcentageAchieved();
  }

  calculatePurcentageAchieved(): void {
    let nbAchieved = 0;

    this.tasks.forEach( task => {
      if ( task.expired ) {
        nbAchieved++;
      }
    })

    let purcentageAchieved = ( nbAchieved * 100 ) / this.tasks.length;

    this.onPurcentageUpdate.emit( purcentageAchieved );
  }
}
