import { Component, OnInit } from '@angular/core';
import { WeatherInfoService } from '../../services/weather-info.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [WeatherInfoService],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
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
