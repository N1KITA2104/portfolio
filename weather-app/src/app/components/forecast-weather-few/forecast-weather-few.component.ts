import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWeatherComponent } from '../base-weather/base-weather.component'; // Импортируйте базовый компонент
import { WeatherForecastService } from '../../services/weather-forecast.service';

@Component({
  selector: 'app-forecast-weather-few',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-weather-few.component.html',
  styleUrls: ['./forecast-weather-few.component.scss']
})
export class ForecastWeatherFewComponent extends BaseWeatherComponent {
  constructor(weatherService: WeatherForecastService) {
    super(weatherService);
  }
}
