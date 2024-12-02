// Angular
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-spot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.scss']
})
export class AddSpotComponent {

  spotForm: FormGroup;
  selectedFile: File | null = null; // Track the selected file

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService) {
    this.spotForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]], // Ensure a valid URL
      image: [null, Validators.required]
    });
    
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.spotForm.patchValue({
        image: file
      });
      this.spotForm.get('image')?.updateValueAndValidity(); // Validate the field
    }
  }
  

  onSubmit(): void {

  //this.submitted = true;

  if (this.spotForm.invalid || !this.spotForm.get('image')?.value) {
    alert('Please fill in all required fields and upload an image.');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.spotForm.get('name')?.value);
  formData.append('location', this.spotForm.get('location')?.value);
  formData.append('description', this.spotForm.get('description')?.value);
  formData.append('link', this.spotForm.get('link')?.value);
  formData.append('image', this.spotForm.get('image')?.value);

  const token = this.authService.getToken(); // Fetch the token from AuthService
  const headers = {
    Authorization: `Bearer ${token}`, // Include the token
  };

  this.http.post('http://localhost:5000/api/climbingSpots/add', formData, { headers }).subscribe({
    next: () => {
      alert('Spot added successfully!');
      this.router.navigate(['/spots']);
    },
    error: (error) => {
      console.error('Error adding spot:', error);
      alert('Failed to add spot. Please try again.');
    },
  });
}

  
}
