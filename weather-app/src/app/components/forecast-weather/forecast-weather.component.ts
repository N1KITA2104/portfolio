import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { WeatherService } from '../../services/weather.service';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-forecast-weather',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss'] 
})
export class ForecastWeatherComponent extends WeatherComponent {
  currentTime = new Date();
  override forecast: boolean = true;

  constructor(weatherService: WeatherService) {
    super(weatherService);
  }
}
