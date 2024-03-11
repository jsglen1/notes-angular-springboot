import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import {
  TypeTaskRequest,
  TypeTaskResponse,
} from '../../interfaces/task.interface';
import { FormTodoService } from '../../services/form-todo/form-todo.service';

@Component({
  selector: 'app-form-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.css',
})
export class FormTodoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private formTodoService: FormTodoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  formTask!: FormGroup;

  initForm() {
    if (this.update && this.task != null) {
      this.formTask = this.formBuilder.group({
        name: [this.task.name, [Validators.required, Validators.minLength(4)]],
        description: [
          this.task.description,
          [Validators.required, Validators.minLength(8)],
        ],
      });
    }
    if (this.create) {
      this.formTask = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(4)]],
        description: [null, [Validators.required, Validators.minLength(8)]],
      });
    }
  }

  get name() {
    return this.formTask.get('name');
  }

  get description() {
    return this.formTask.get('description');
  }

  onSubmit() {
    if (this.formTask.valid) {
      const data: TypeTaskRequest = {
        name: this.formTask.get('name')?.value,
        description: this.formTask.get('description')?.value,
      };

      if (this.create) {
        this.postCreate(data);
      }

      if (this.update) {
        this.patchUpdate(this.task.id, data);
      }
    }
  }

  patchUpdate(id: number, data: TypeTaskRequest): void {
    this.formTodoService.updateTask(id, data).subscribe({
      next: (res) => {
        if (res != null) {
          this.closeForm.emit(false);
        } else {
          Swal.fire({
            title: 'nota',
            text: 'Ocurrio un error!',
            icon: 'error',
          });
        }
      },
      error: (e) => console.log(e),
    });
    this.update = false;
  }

  postCreate(data: TypeTaskRequest): void {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.formTodoService.createTask(parseInt(id), data).subscribe({
        next: (res) => {
          if (res != null) {
            console.log(JSON.stringify(res));
            this.closeForm.emit(false);
          } else {
            Swal.fire({
              title: 'nota',
              text: 'Ocurrio un error!',
              icon: 'error',
            });
          }
        },
        error: (e) => console.log(e),
      });
    }
    this.create = false;
  }

  @Input() create: boolean = false;
  @Input() update: boolean = false;
  @Input() task!: TypeTaskResponse;
  @Output() closeForm = new EventEmitter<boolean>();

  handleChange(flag: boolean): void {
    this.closeForm.emit(flag);
  }
}
