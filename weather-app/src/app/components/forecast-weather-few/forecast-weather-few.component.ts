import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { WeatherService } from '../../services/weather.service';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-forecast-weather-few',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './forecast-weather-few.component.html',
  styleUrls: ['./forecast-weather-few.component.scss'],
})
export class ForecastWeatherFewComponent extends WeatherComponent {
  override forecast: boolean = true;

  constructor(weatherService: WeatherService) {
    super(weatherService);
  }
}
