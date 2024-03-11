import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/global';
import { TypeLoginRequest } from '../../interfaces/login.inteface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(userData: TypeLoginRequest) {
    return this.http
      .post<any>(BASE_URL + '/user/login', userData)
      .pipe((res) => res);
  }
}
