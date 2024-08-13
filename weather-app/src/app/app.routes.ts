import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { DailyComponent } from './components/daily/daily.component';
import { HourlyComponent } from './components/hourly/hourly.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'weather/:city',
    component: SearchComponent,
  },
  {
    path: 'daily',
    component: DailyComponent
  },
  {
    path: 'hourly',
    component: HourlyComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
