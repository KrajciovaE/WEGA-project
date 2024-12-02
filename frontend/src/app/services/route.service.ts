import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  saveLastVisitedPage(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lastVisitedPage', url);
    }
  }

  getLastVisitedPage(): string {

    if (isPlatformBrowser(this.platformId)) {
      const lastPage = localStorage.getItem('lastVisitedPage'); 
      console.log(lastPage)
      return lastPage ? lastPage : '/'; 
    }
    return '/'; 
  }

  clearLastVisitedPage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('lastVisitedPage');
    }
  }

}

  
  
  