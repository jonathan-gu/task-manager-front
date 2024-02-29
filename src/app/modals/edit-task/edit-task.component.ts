import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Task from '../../models/Task';

@Component({
  selector: 'app-edit-task',
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
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  @Output() taskUpdated = new EventEmitter<Task>();

  task: Task
  dateNotIsPast = false

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task : Task }, private api: HttpClient) {
    this.taskForm.get("dueDate")?.valueChanges.subscribe((dueDate: string | null) => {
      if (dueDate) {
        this.dateNotIsPast = new Date(dueDate) <= new Date();
      }
    })
    this.task = data.task
    this.taskForm.value.title = this.task.name
    this.taskForm.value.dueDate = this.task.dueDate.toString()
  }

  onSubmit() {
    const title: string = this.taskForm.value.title as string
    const dueDate: Date = new Date(this.taskForm.value.dueDate as string)

    if (title.trim() !== '' && dueDate > new Date) {
      const task = { name: title, dueDate: dueDate }
      this.api.put<any>(`http://localhost:8080/tasks/${this.task.id}`, task).subscribe(response => {
        this.taskUpdated.emit(response.task)
      })
    }
  }
}
