import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { passwordMatchValidator } from '../Validators/ConfirmPassValidator'; // adjust path as needed

@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm! : FormGroup
  submitted = false;

  constructor (private fb : FormBuilder) {
    this.registerForm = this.fb.group ({
      username : ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      email : ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      name: ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    },
     { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }

    
  get formControls (){
    return this.registerForm.controls;
  }

  handleSubmit() {
        this.submitted = true;
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // navigate or send data
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
