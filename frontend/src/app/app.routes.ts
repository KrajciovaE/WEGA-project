// Angular
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { GearComponent } from './gear/gear.component';
import { SpotsComponent } from './spots/spots.component';
import { AddSpotComponent } from './add-spot/add-spot.component';

// Services
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'gear', component: GearComponent },
  { path: 'spots', component: SpotsComponent },
  { path: 'add-spot', component: AddSpotComponent, canActivate: [AuthGuard]}
];
