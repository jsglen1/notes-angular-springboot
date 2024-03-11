import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class ListTodoService {
  constructor(private http: HttpClient) {}

  getTasks() {
    const userId = localStorage.getItem('userId');
    console.log('buscara por' + userId);
    return this.http
      .get<any>(BASE_URL + `/task/${userId}/user`)
      .pipe((res) => res);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(BASE_URL + `/task/${id}`).pipe((res) => res);
  }
}
