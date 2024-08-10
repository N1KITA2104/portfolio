import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-weather-few',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-weather-few.component.html',
  styleUrl: './forecast-weather-few.component.scss'
})
export class ForecastWeatherFewComponent implements OnInit {
  weather$: Observable<any> | undefined;

  constructor(private weatherService: WeatherForecastService) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  private loadWeather(): void {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weather$ = this.weatherService.getWeatherByCoordinates(lat, lon);
        },
        (error) => {
          console.error('Error getting location', error); 
          this.weather$ = this.weatherService.getWeatherByCity('New York');
        }
      );
    }
  }
}
