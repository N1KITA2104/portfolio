import { Component } from '@angular/core';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { BaseWeatherComponent } from '../base-weather/base-weather.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent extends BaseWeatherComponent {
  constructor(weatherService: WeatherForecastService) {
    super(weatherService);
  }
}
