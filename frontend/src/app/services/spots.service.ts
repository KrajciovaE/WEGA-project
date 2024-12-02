import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {
  private apiUrl = 'http://localhost:5000/api/climbingSpots';

  constructor(private http: HttpClient) {}

  // Metóda na získanie všetkých miest
  public getSpots(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  public addSpot(spot: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, spot, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  

  public addRating(spotId: string, rating: number, headers: any): Observable<any> {
    const url = `${this.apiUrl}/rate/${spotId}`;
    return this.http.put(url, { rating }, { headers }); 
  }
  
  public getAverageRating(spotId: string): Observable<any> {
    const url = `${this.apiUrl}/${spotId}/average-rating`;
    return this.http.get(url);
  }
  
}
