import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  private getWeather(url: string): Observable<any> {
    const headers = { 'X-Requested-With': 'XMLHttpRequest' };
    return this.http.get(url, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching weather data', error);
        return throwError(() => new Error(`Error fetching weather data: ${error.message}`));
      })
    );
  }

  getCurrentWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${lat},${lon}`;
    return this.getWeather(url);
  }

  getCurrentWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`;
    return this.getWeather(url);
  }

  getForecastByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=10`;
    return this.getWeather(url);
  }

  getForecastByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=10`;
    return this.getWeather(url);
  }
}
