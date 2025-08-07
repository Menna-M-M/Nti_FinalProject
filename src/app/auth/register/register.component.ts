import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from '../Validators/ConfirmPassValidator';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  handleSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { firstName, lastName, email, password } = this.registerForm.value;

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: 'user'
    };

    this.subscription.add(
      this.authService.register(userData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Account created successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Registration failed. Please try again.';
          this.notificationService.showError(errorMessage);
        },
        complete: () => {
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}