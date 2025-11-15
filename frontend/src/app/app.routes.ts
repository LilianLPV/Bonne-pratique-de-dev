import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // 👈 au lieu de redirectTo
  { path: 'dashboard', component: DashboardComponent },
];
