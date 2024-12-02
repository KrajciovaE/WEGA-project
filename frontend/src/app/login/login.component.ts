// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Primeng
import { ButtonModule } from 'primeng/button';

// Services
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private routeService: RouteService) {}

    onSubmit() {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
    
          // Získame poslednú navštívenú stránku a presmerujeme
          const lastPage = this.routeService.getLastVisitedPage();
          this.routeService.clearLastVisitedPage(); // Vymažeme poslednú navštívenú stránku
          this.router.navigate([lastPage]);
        },
        error: () => {
          this.errorMessage = 'Nesprávny email alebo heslo.';
        }
      });
    }
    
}
