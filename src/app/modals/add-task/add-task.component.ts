import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Task from '../../models/Task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})

export class AddTaskComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  dateNotIsPast = false

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required)
  })

  constructor(private api: HttpClient) {
    this.taskForm.get("dueDate")?.valueChanges.subscribe((dueDate: string | null) => {
      if (dueDate) {
        this.dateNotIsPast = new Date(dueDate) <= new Date();
      }
    })
  }

  onSubmit() {
    const title: string = this.taskForm.value.title as string
    const dueDate: Date = new Date(this.taskForm.value.dueDate as string)

    if (title.trim() !== '' && dueDate > new Date) {
      const task = { name: title, dueDate: dueDate }
      this.api.post<any>("http://localhost:8080/tasks", task).subscribe(response => {
        this.taskCreated.emit(response.task)
      })
    }
  }
}
