import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../layout/loading/loading.component';
import { WeatherService } from '../../services/weather.service';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent extends WeatherComponent {
  currentTime = new Date();

  constructor(weatherService: WeatherService) {
    super(weatherService);
  }

}
