import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from '../../modals/add-task/add-task.component';
import Task from '../../models/Task';
import { DeleteTaskComponent } from '../../modals/delete-task/delete-task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  public tasks: Task[] = []

  constructor(private api: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.get<any>("http://localhost:8080/tasks").subscribe(response => {
      this.tasks = response.tasks
    })
  }

  openModalAddTask() {
    const dialogRef = this.dialog.open(AddTaskComponent)
    dialogRef.componentInstance.taskCreated.subscribe((task: Task) => {
      this.tasks.push(task)
    })
  }

  openModalDeleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: {
        task: task
      }
    })
    dialogRef.componentInstance.taskDeleted.subscribe((taskDeleted: Task) => {
      this.tasks = this.tasks.filter(task => task.id !== taskDeleted.id)
    })
  }

  completeTask(taskId: number) {
    this.api.put(`http://localhost:8080/tasks/completed/${taskId}`, {}).subscribe(response => {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    })
  }
}
