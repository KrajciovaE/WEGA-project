import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

// Primeng
import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

// Services
import { SpotsService } from '../services/spots.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-spots',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterModule, HttpClientModule, FormsModule, RatingModule],
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.scss']
})
export class SpotsComponent implements OnInit {

  spots: any[] = [];

  constructor(
    private spotsService: SpotsService,
    protected authService: AuthService) {}

  ngOnInit(): void {
    this.loadSpots(); // Načítanie miest pri inicializácii komponentu
  }

  protected loadSpots(): void {
    this.spotsService.getSpots().subscribe({
      next: (data) => {
        this.spots = data.map(spot => ({
          ...spot,
          averageRating: this.calculateAverageRating(spot.ratings), // Calculate average rating
          newRating: 0 // Placeholder for adding a new rating
        }));
      },
      error: (error) => {
        console.error('Chyba pri načítaní miest:', error);
      }
    });
  }

  protected calculateAverageRating(ratings: any[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return total / ratings.length;
  }

  protected addRating(spotId: string, rating: number) {

    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (!token) {
      console.error('No token available!');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
    this.spotsService.addRating(spotId, rating, headers).subscribe({
      next: (response) => {
        console.log('Rating added successfully:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adding rating:', error);
      },
    });
  }
  
}
