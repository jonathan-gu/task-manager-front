import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from "@angular/material/dialog";
import Task from '../../models/Task';
import { AddUserComponent } from '../../modals/add-user/add-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
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
    const dialogRef = this.dialog.open(AddUserComponent)
    dialogRef.componentInstance.taskCreated.subscribe((task: Task) => {
      this.tasks.push(task)
    })
  }
}
