import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment.development';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: `Inicio - ${environment.appName}`,
  },
];
