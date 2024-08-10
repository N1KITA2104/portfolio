import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWeatherComponent } from '../base-weather/base-weather.component'; 
import { WeatherForecastService } from '../../services/weather-forecast.service';

@Component({
  selector: 'app-forecast-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'] 
})
export class ForecastWeatherComponent extends BaseWeatherComponent {
  currentTime = new Date();

  constructor(weatherService: WeatherForecastService) {
    super(weatherService);
  }
}
