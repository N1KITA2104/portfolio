import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { PopularCities } from '../../enum/popular-cities.enum';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-weather',
  template: '',
})
export class WeatherComponent implements OnInit {
  forecast: boolean = false;
  weather$: Observable<any> | undefined;

  constructor(protected weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  protected loadWeather(): void {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          if (this.forecast) {
            this.weather$ = this.weatherService.getForecastByCoordinates(
              lat,
              lon
            );
          } else {
            this.weather$ = this.weatherService.getCurrentWeatherByCoordinates(
              lat,
              lon
            );
          }
        },
        (error) => {
          const fallbackCity = PopularCities.NewYork;
          if (this.forecast) {
            this.weather$ = this.weatherService.getForecastByCity(fallbackCity);
          } else {
            this.weather$ =
              this.weatherService.getCurrentWeatherByCity(fallbackCity);
          }
        }
      );
    }
  }
}
