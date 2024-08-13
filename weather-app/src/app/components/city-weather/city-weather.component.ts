import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { PopularCities } from '../../enum/popular-cities.enum';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../layout/loading/loading.component";
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  standalone: true,
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  imports: [CommonModule, LoadingComponent]
})
export class CityWeatherComponent implements OnInit {

  weather$: Observable<any> = of(null);
  fallbackCity = PopularCities.SanDiego;
  @Input() forecast: boolean = false;
  city: string | null = null;
  currentTime: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.city = params.get('city');
        if (this.city) {
          return this.forecast
            ? this.weatherService.getForecastByCity(this.city).pipe(
                catchError(error => {
                  console.error('Error fetching forecast data', error);
                  return this.weatherService.getForecastByCity(this.fallbackCity);
                })
              )
            : this.weatherService.getCurrentWeatherByCity(this.city).pipe(
                catchError(error => {
                  console.error('Error fetching current weather data', error);
                  return this.weatherService.getCurrentWeatherByCity(this.fallbackCity);
                })
              );
        } else {
          return this.forecast
            ? this.weatherService.getForecastByCity(this.fallbackCity)
            : this.weatherService.getCurrentWeatherByCity(this.fallbackCity);
        }
      })
    ).subscribe(data => {
      this.weather$ = of(data);
    });
  }
}
