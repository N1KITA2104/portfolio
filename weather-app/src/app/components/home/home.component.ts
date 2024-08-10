import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { ForecastWeatherComponent } from '../forecast-weather/forecast-weather.component';
import { ForecastWeatherFewComponent } from '../forecast-weather-few/forecast-weather-few.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrentWeatherComponent, ForecastWeatherComponent, ForecastWeatherFewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
}
