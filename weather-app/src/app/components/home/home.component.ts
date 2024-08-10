import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { ForecastWeatherComponent } from '../forecast-weather/forecast-weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrentWeatherComponent, ForecastWeatherComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
}
