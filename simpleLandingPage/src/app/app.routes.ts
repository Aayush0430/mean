import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/service/services.component';
import { ɵisBoundToModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { log } from 'node:console';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-home',
    pathMatch: 'full', // Ensures an exact match for an empty path
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-contact',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-about',
    component: AboutComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'app-services',
    component: ServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'app-login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-signup',
    component: SignupComponent,
    canActivate: [AuthGuard],
  },
];
