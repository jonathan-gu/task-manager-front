import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import Task from '../../models/Task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss'
})
export class DeleteTaskComponent {
  @Output() taskDeleted = new EventEmitter<Task>();

  task: Task

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task : Task }, private api: HttpClient, private dialogRef: MatDialogRef<DeleteTaskComponent>) {
    this.task = data.task
  }

  deleteTask(taskId: number) {
    this.api.delete<any>(`http://localhost:8080/tasks/${taskId}`).subscribe(response => {
      this.taskDeleted.emit(response.task)
      this.closeModal()
    })
  }
  
  closeModal() {
    this.dialogRef.close()
  }
}
