import { Component, OnInit } from '@angular/core';
import { ListTodoService } from '../../services/list-todo/list-todo.service';
import { TypeTaskResponse } from '../../interfaces/task.interface';
import Swal from 'sweetalert2';
import { FormTodoComponent } from '../form-todo/form-todo.component';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [FormTodoComponent],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css',
})
export class ListTodoComponent implements OnInit {
  listTask: TypeTaskResponse[] = [];
  stateFormCreate: boolean = false;
  stateFormUpdate: boolean = false;
  taskEditable!: TypeTaskResponse;

  handleStateFormCreate(state: boolean): void {
    this.stateFormCreate = state;
    this.getTasks();
  }

  handleStateFormUpdate(state: boolean): void {
    this.stateFormUpdate = state;
    this.getTasks();
  }

  handleEditForm(task: TypeTaskResponse) {
    this.taskEditable = task;
    this.handleStateFormUpdate(true);
  }

  constructor(private listTodoService: ListTodoService) {}
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.listTodoService.getTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.listTask = res;
      },
      error: (e) => console.log(e),
    });
  }

  deleteTask(id: number) {
    this.listTodoService.deleteTask(id).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire({
            title: 'Nota',
            text: 'Eliminada',
            icon: 'success',
          });
          this.getTasks();
        }
      },
      error: (e) => console.log(e),
    });
  }
}
