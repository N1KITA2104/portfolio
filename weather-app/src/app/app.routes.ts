import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'weather',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/weather',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
