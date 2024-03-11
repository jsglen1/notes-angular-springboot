import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeRegisterRequest } from '../../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Método para enviar la solicitud POST al servidor
  registerUser(userData: TypeRegisterRequest) {
    return this.http.post<any>(this.BASE_URL + '/user', userData);
  }
}
