import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import Task from '../../models/Task';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  public tasks: Task[] = []

  constructor(private api: HttpClient) {}

  ngOnInit(): void {
    this.api.get<any>("http://localhost:8080/tasks").subscribe(response => {
      this.tasks = response.tasks
    })
  }
}
