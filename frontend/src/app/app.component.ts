// Angular
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

// Services
import { AuthService } from './services/auth.service';
import { RouteService } from './services/route.service';

// Primeng
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MenubarModule,
    RouterOutlet,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    protected authService: AuthService,
    protected routeService: RouteService,

    ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const ignoredUrls = ['/login', '/register']; // URL, ktoré nechceme ukladať
        if (!ignoredUrls.includes(event.urlAfterRedirects)) {
          this.routeService.saveLastVisitedPage(event.urlAfterRedirects);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}