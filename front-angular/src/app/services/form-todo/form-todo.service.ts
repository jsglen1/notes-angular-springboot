import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeTaskRequest } from '../../interfaces/task.interface';
import { BASE_URL } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class FormTodoService {
  constructor(private http: HttpClient) {}

  createTask(id: number, userData: TypeTaskRequest) {
    return this.http
      .post<any>(BASE_URL + `/task/${id}/user`, userData)
      .pipe((res) => res);
  }

  updateTask(id: number, userData: TypeTaskRequest) {
    return this.http
      .patch<any>(BASE_URL + `/task/${id}`, userData)
      .pipe((res) => res);
  }
}
