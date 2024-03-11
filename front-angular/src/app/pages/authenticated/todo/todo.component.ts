import { Component } from '@angular/core';
import { ListTodoComponent } from '../../../components/list-todo/list-todo.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ListTodoComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {}
