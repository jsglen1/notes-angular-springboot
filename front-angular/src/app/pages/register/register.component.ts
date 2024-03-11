import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegisterService } from '../../services/register/register.service';
import { TypeRegisterRequest } from '../../interfaces/register.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private route: Router
  ) {}

  passwordsEquals(): ValidatorFn {
    return (): Observable<ValidationErrors | null> => {
      return of(
        this.password?.value === this.password_2?.value
          ? null
          : { passwordsEquals: true }
      );
    };
  }

  initForm() {
    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_2: [
        null,
        [Validators.required, Validators.minLength(8)],
        this.passwordsEquals(),
      ],
    });
  }

  get name() {
    return this.formRegister.get('name');
  }

  get email() {
    return this.formRegister.get('email');
  }

  get password() {
    return this.formRegister.get('password');
  }

  get password_2() {
    return this.formRegister.get('password_2');
  }

  onSubmit() {
    if (this.formRegister.valid) {
      // alert('formulario valido ' + JSON.stringify(this.formRegister.value));

      const data: TypeRegisterRequest = {
        name: this.formRegister.get('name')?.value,
        email: this.formRegister.get('email')?.value,
        password: this.formRegister.get('password')?.value,
      };

      this.registerService.registerUser(data).subscribe({
        next: (res) => {
          // this.route.navigate(['/login']);
          if (res != null) {
            Swal.fire({
              title: 'Registrado',
              text: 'Completado',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Registro',
              text: 'Ocurrio un error',
              icon: 'error',
            });
          }
        },
        error: (e) => console.log(e),
      });
    }
  }
}
