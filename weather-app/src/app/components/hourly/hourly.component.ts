import { Component } from '@angular/core';
import { BaseWeatherComponent } from '../base-weather/base-weather.component';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.scss'
})
export class HourlyComponent extends BaseWeatherComponent {
  constructor(weatherService: WeatherForecastService) {
    super(weatherService);
  }
}
