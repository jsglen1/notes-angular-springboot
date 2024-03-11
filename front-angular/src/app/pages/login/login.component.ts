import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { TypeLoginRequest } from '../../interfaces/login.inteface';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const data: TypeLoginRequest = {
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value,
      };

      this.loginService.loginUser(data).subscribe({
        next: (res) => {
          if (res != null) {
            Swal.fire({
              title: 'Ingresar',
              text: 'Completado',
              icon: 'success',
            });
            localStorage.setItem('userId', res.id);
            localStorage.setItem('userName', res.name);
            localStorage.setItem('userEmail', res.email);
            this.route.navigate(['/authenticated/todo']);
          } else {
            Swal.fire({
              title: 'Ingresar',
              text: 'Credenciales no validas',
              icon: 'error',
            });
          }
        },
        error: (e) => console.log(e),
      });
    }
  }
}
