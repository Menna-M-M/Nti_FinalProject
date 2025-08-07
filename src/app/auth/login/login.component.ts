import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted: boolean = false;
  message: string = '';
  loading: boolean = false;
  showWelcome: boolean = false;
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const payload = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.userName = res.user?.name || 'User';
          this.showWelcome = true;

          setTimeout(() => {
            this.showWelcome = false;
            this.router.navigate(['/']);
          }, 2000);
        } else {
          this.message = res.message || '❌ Login failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.message || '🚨 Something went wrong.';
      }
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}