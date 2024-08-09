import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WeatherInfoService } from '../../services/weather-info.service';
import { Observable } from 'rxjs/internal/Observable';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  providers: [WeatherInfoService],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  weather$: Observable<any> | undefined;

  constructor(private weatherService: WeatherInfoService) {}

  ngOnInit(): void {
    this.getCurrentLocationAndWeather();
  }

  getCurrentLocationAndWeather(): void {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.weather$ = this.weatherService.getWeatherByCoordinates(lat, lon);
        },
        (error) => {
          this.weather$ = this.weatherService.getWeatherByCoordinates(40.7128, -74.0060); // New York weather;
          console.error('Error getting location', error); 
        }
      );
    }
  }
}
