import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  //*Injects
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.form.invalid) return;

    const { email, password, name } = this.form.value;
    this.authService.register(email, password, name).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
