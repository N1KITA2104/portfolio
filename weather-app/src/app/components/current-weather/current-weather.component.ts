import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WeatherInfoService } from '../../services/weather-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnInit {
  currentTime = new Date();
  weather$: Observable<any> | undefined;

  constructor(private weatherService: WeatherInfoService) {}

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
