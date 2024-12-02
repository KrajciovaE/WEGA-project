// Angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Primeng
import { ButtonModule } from 'primeng/button';

// Services
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private routeService: RouteService,
    private formBuilder: FormBuilder,
    protected authService: AuthService,
  ) 
    {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // Getter pre jednoduchší prístup k formulárovým poliam
  get f() {
    return this.registerForm.controls;
  }

  // Vlastná validácia na overenie zhody hesiel
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
  
    const { name, email, password } = this.registerForm.value;
  
    // Register the user
    this.authService.register({ username: name, email, password }).subscribe({
      next: (response) => {
        console.log('Registrácia úspešná:', response.message);
  
        // Automatically log in the user after successful registration
        this.authService.login(email, password).subscribe({
          next: (loginResponse) => {
            console.log('Prihlásenie úspešné:', loginResponse);
            this.authService.saveToken(loginResponse.token); // Save the token to localStorage
            this.router.navigate([this.routeService.getLastVisitedPage() || '/']);
            alert('Registrácia a prihlásenie boli úspešné!');
            this.registerForm.reset();
            this.submitted = false;
  
            // Redirect to the desired page (e.g., homepage)
            window.location.href = '/'; // Or use Router's `navigate` method if preferred
          },
          error: (loginError) => {
            console.error('Chyba pri prihlasovaní:', loginError);
            alert(loginError.error?.message || 'Registrácia bola úspešná, ale nastala chyba pri prihlasovaní.');
          }
        });
      },
      error: (error) => {
        console.error('Chyba pri registrácii:', error);
        alert(error.error?.message || 'Vyskytla sa chyba pri registrácii.');
        this.submitted = false; 
      }
    });
  }
  
}  
