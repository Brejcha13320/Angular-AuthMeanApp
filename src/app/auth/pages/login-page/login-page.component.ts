import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  //*Injects
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form: FormGroup = this.fb.group({
    email: ['jesus@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
