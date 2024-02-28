import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Task from '../../models/Task';

@Component({
  selector: 'app-add-user',
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
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})

export class AddUserComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  taskForm = new FormGroup({
    title: new FormControl(''),
    dueDate: new FormControl('')
  })

  constructor(private api: HttpClient) {}

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
