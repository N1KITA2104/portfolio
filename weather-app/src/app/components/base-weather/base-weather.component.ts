import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherForecastService } from '../../services/weather-forecast.service';

@Component({
  template: ''
})
export class BaseWeatherComponent implements OnInit {
  weather$: Observable<any> | undefined;

  constructor(protected weatherService: WeatherForecastService) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  protected loadWeather(): void {
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
