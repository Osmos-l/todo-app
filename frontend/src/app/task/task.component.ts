import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../_services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Output()
    onDelete: EventEmitter<any> = new EventEmitter();

  @Input()
    task: Task = {
      "_id": "-1",
      "name": "Default task",
      "owner": "-1",
      "created_at": new Date,
      "updated_at": new Date,
      "expired": false
    };
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  updateExpired(): void {
    this.taskService.editExpirationToOne( this.task );
  }

  delete(): void {
    this.onDelete.emit( this.task._id );
  }
}
